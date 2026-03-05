import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
          message:
            "지원하지 않는 파일 형식입니다. JPEG, PNG, WebP, GIF만 가능합니다.",
        },
        { status: 400 }
      );
    }

    // Vision AI + 점자 변환 mock (3초 대기)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return NextResponse.json({
      status: "success",
      detectedObject: "사과",
      brailleText: "⠟⠧",
      modelUrl: "/mock-models/apple_3d_tactile.obj",
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "서버 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
