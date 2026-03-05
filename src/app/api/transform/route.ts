import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

interface DetectedObject {
  label: string;
  braille: string;
  boundingBox: BoundingBox;
}

const BRAILLE_MAP: Record<string, string> = {
  ㄱ: "⠈", ㄴ: "⠉", ㄷ: "⠊", ㄹ: "⠐", ㅁ: "⠑",
  ㅂ: "⠘", ㅅ: "⠠", ㅇ: "⠛", ㅈ: "⠨", ㅊ: "⠰",
  ㅋ: "⠋", ㅌ: "⠓", ㅍ: "⠙", ㅎ: "⠚",
  ㄲ: "⠠⠈", ㄸ: "⠠⠊", ㅃ: "⠠⠘", ㅆ: "⠠⠠", ㅉ: "⠠⠨",
  ㅏ: "⠣", ㅑ: "⠜", ㅓ: "⠎", ㅕ: "⠱", ㅗ: "⠥",
  ㅛ: "⠬", ㅜ: "⠍", ㅠ: "⠩", ㅡ: "⠪", ㅣ: "⠕",
  ㅐ: "⠗", ㅔ: "⠝", ㅚ: "⠧", ㅟ: "⠏", ㅢ: "⠺",
  ㅘ: "⠧", ㅙ: "⠧⠗", ㅝ: "⠏", ㅞ: "⠏⠝",
};

const INITIALS = [
  "ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ",
  "ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ",
];
const MEDIALS = [
  "ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ",
  "ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ",
];
const FINALS = [
  "","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ",
  "ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ",
  "ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ",
];

function koreanToBraille(text: string): string {
  let result = "";
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const offset = code - 0xac00;
      const iIdx = Math.floor(offset / (21 * 28));
      const mIdx = Math.floor((offset % (21 * 28)) / 28);
      const fIdx = offset % 28;

      result += BRAILLE_MAP[INITIALS[iIdx]] ?? "⠿";
      result += BRAILLE_MAP[MEDIALS[mIdx]] ?? "⠿";
      if (fIdx > 0) {
        result += BRAILLE_MAP[FINALS[fIdx]] ?? "⠿";
      }
    } else {
      result += ch;
    }
  }
  return result;
}

const GEMINI_PROMPT = `주어진 이미지를 분석하여 사진 속 주요 인물이나 사물(최대 5개)을 찾아내세요. 각 객체를 설명하는 짧은 한국어 단어(예: 엄마, 아빠, 아기, 의자, 사과 등)와, 해당 객체가 이미지 내에서 차지하는 위치 좌표(Bounding Box: ymin, xmin, ymax, xmax의 0~1 사이 비율 값)를 정확히 추출하세요. 응답은 반드시 다른 설명 없이 아래 JSON 배열 형태로만 반환하세요.
예시: [{ "label": "엄마", "boundingBox": { "ymin": 0.2, "xmin": 0.1, "ymax": 0.5, "xmax": 0.4 } }]`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return NextResponse.json(
      { status: "error", message: "GEMINI_API_KEY가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { status: "error", message: "이미지 파일이 전송되지 않았습니다." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          status: "error",
          message: "지원하지 않는 파일 형식입니다. JPEG, PNG, WebP, GIF만 가능합니다.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      { text: GEMINI_PROMPT },
      {
        inlineData: {
          mimeType: file.type,
          data: base64,
        },
      },
    ]);

    const responseText = result.response.text().trim();

    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json(
        { status: "error", message: "AI 응답을 파싱할 수 없습니다." },
        { status: 500 }
      );
    }

    const rawObjects: Array<{
      label: string;
      boundingBox: BoundingBox;
    }> = JSON.parse(jsonMatch[0]);

    const objects: DetectedObject[] = rawObjects.slice(0, 5).map((obj) => ({
      label: obj.label,
      braille: koreanToBraille(obj.label),
      boundingBox: {
        ymin: Math.max(0, Math.min(1, obj.boundingBox.ymin)),
        xmin: Math.max(0, Math.min(1, obj.boundingBox.xmin)),
        ymax: Math.max(0, Math.min(1, obj.boundingBox.ymax)),
        xmax: Math.max(0, Math.min(1, obj.boundingBox.xmax)),
      },
    }));

    return NextResponse.json({ status: "success", objects });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "서버 처리 중 오류가 발생했습니다.";
    console.error("[BAF transform API error]", message);
    return NextResponse.json(
      { status: "error", message: `AI 분석 중 오류가 발생했습니다: ${message}` },
      { status: 500 }
    );
  }
}
