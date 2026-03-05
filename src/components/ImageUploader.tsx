"use client";

import { useState, useRef, useCallback, lazy, Suspense, type DragEvent, type ChangeEvent } from "react";

const ThreeViewer = lazy(() => import("./ThreeViewer"));

export interface TransformResult {
  detectedObject: string;
  brailleText: string;
  modelUrl: string;
}

type UploaderStatus = "idle" | "loading" | "success" | "error";

export default function ImageUploader() {
  const [status, setStatus] = useState<UploaderStatus>("idle");
  const [result, setResult] = useState<TransformResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const announceRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = "";
      requestAnimationFrame(() => {
        if (announceRef.current) {
          announceRef.current.textContent = message;
        }
      });
    }
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setStatus("error");
        setErrorMessage("지원하지 않는 파일 형식입니다. JPEG, PNG, WebP, GIF만 가능합니다.");
        announce("오류: 지원하지 않는 파일 형식입니다.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setStatus("error");
        setErrorMessage("파일 크기가 10MB를 초과합니다.");
        announce("오류: 파일 크기가 10MB를 초과합니다.");
        return;
      }

      setFileName(file.name);
      setResult(null);
      setErrorMessage("");

      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      setStatus("loading");
      announce("AI가 이미지를 분석하고 있습니다. 잠시만 기다려주세요.");

      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/transform", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || data.status === "error") {
          throw new Error(data.message || "변환 중 오류가 발생했습니다.");
        }

        setResult({
          detectedObject: data.detectedObject,
          brailleText: data.brailleText,
          modelUrl: data.modelUrl,
        });
        setStatus("success");
        announce(
          `변환 완료. 인식된 사물: ${data.detectedObject}. 점자 텍스트: ${data.brailleText}.`
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
        setStatus("error");
        setErrorMessage(message);
        announce(`오류 발생: ${message}`);
      }
    },
    [announce]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      e.target.value = "";
    },
    [processFile]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setErrorMessage("");
    setPreview(null);
    setFileName("");
    announce("업로드 영역이 초기화되었습니다. 새 이미지를 선택해주세요.");
  }, [announce]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      />

      {/* ── Idle: 업로드 영역 ── */}
      {status === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="rounded-2xl border-2 border-dashed p-10 text-center shadow-sm transition-all sm:p-14"
          style={{
            borderColor: dragOver ? "var(--accent)" : "var(--border)",
            backgroundColor: dragOver ? "var(--accent-subtle)" : "var(--bg-card)",
          }}
          role="region"
          aria-label="이미지 업로드 영역. 파일을 드래그하여 놓거나 아래 버튼을 사용하세요."
        >
          <div
            className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "var(--accent-subtle)" }}
            aria-hidden="true"
          >
            <UploadCloudIcon />
          </div>

          <p
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            이미지를 드래그하여 놓으세요
          </p>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            JPEG, PNG, WebP, GIF 지원 (최대 10MB)
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[14px] font-bold text-white shadow-md shadow-blue-500/15 transition-all hover:shadow-lg hover:shadow-blue-500/20 sm:w-auto"
              style={{ backgroundColor: "var(--accent)" }}
              aria-label="기기에서 이미지 파일을 선택하여 업로드"
            >
              <FolderIcon />
              파일 선택
            </button>

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 px-7 py-3.5 text-[14px] font-bold transition-all sm:w-auto"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-card)",
              }}
              aria-label="카메라로 사물을 촬영하여 업로드"
            >
              <CameraIcon />
              카메라 촬영
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      )}

      {/* ── Loading: AI 분석 중 ── */}
      {status === "loading" && (
        <div
          className="flex flex-col items-center rounded-2xl border p-10 shadow-sm sm:p-14"
          style={{
            borderColor: "var(--border-light)",
            backgroundColor: "var(--bg-card)",
          }}
          role="alert"
          aria-busy="true"
        >
          {preview && (
            <div className="mb-8 overflow-hidden rounded-2xl shadow-md">
              <img
                src={preview}
                alt={`업로드된 이미지: ${fileName}`}
                className="h-44 w-44 object-cover sm:h-52 sm:w-52"
              />
            </div>
          )}

          <div className="mb-5" aria-hidden="true">
            <Spinner />
          </div>

          <p
            className="text-center text-base font-bold sm:text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            AI가 이미지를 분석 중입니다
          </p>
          <p
            className="mt-2 text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            3D 촉각 데이터와 점자로 변환하고 있습니다...
          </p>

          <div
            className="mt-8 h-1.5 w-52 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--border-light)" }}
            role="progressbar"
            aria-label="AI 변환 진행 중"
            aria-valuetext="변환 진행 중"
          >
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: "var(--accent)",
                animation: "loading-bar 2s ease-in-out infinite",
              }}
            />
          </div>

          <style>{`
            @keyframes loading-bar {
              0% { width: 10%; margin-left: 0; }
              50% { width: 60%; margin-left: 20%; }
              100% { width: 10%; margin-left: 90%; }
            }
          `}</style>
        </div>
      )}

      {/* ── Success: 변환 결과 ── */}
      {status === "success" && result && (
        <div
          className="overflow-hidden rounded-2xl border shadow-sm"
          style={{
            borderColor: "var(--border-light)",
            backgroundColor: "var(--bg-card)",
          }}
          role="region"
          aria-label="AI 변환 결과"
        >
          <div className="flex flex-col items-center gap-8 p-8 sm:flex-row sm:items-start sm:p-10">
            {preview && (
              <div className="shrink-0 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={preview}
                  alt={`업로드된 원본 이미지: ${fileName}`}
                  className="h-40 w-40 object-cover sm:h-48 sm:w-48"
                />
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
                style={{ backgroundColor: "var(--success-bg)" }}
              >
                <CheckCircleIcon />
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--success)" }}
                >
                  변환 완료
                </span>
              </div>

              <dl className="space-y-5">
                <div>
                  <dt
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    인식된 사물
                  </dt>
                  <dd
                    className="mt-1.5 text-3xl font-extrabold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {result.detectedObject}
                  </dd>
                </div>

                <div>
                  <dt
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    점자 텍스트
                  </dt>
                  <dd
                    className="mt-1.5 text-4xl tracking-widest"
                    style={{ color: "var(--accent)" }}
                    aria-label={`점자 텍스트: ${result.brailleText}`}
                  >
                    {result.brailleText}
                  </dd>
                </div>

                <div>
                  <dt
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    3D 모델 경로
                  </dt>
                  <dd
                    className="mt-1.5 rounded-xl p-3 font-mono text-sm"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {result.modelUrl}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div
            className="border-t px-8 py-5 sm:px-10"
            style={{ borderColor: "var(--border-light)" }}
          >
            <button
              type="button"
              onClick={reset}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-[14px] font-bold text-white shadow-md shadow-blue-500/15 transition-all hover:shadow-lg sm:w-auto"
              style={{ backgroundColor: "var(--accent)" }}
              aria-label="다른 이미지를 업로드하기 위해 초기화"
            >
              <RefreshIcon />
              다른 이미지 변환하기
            </button>
          </div>
        </div>
      )}

      {/* ── Success: 3D 뷰어 ── */}
      {status === "success" && result && (
        <div className="mt-10">
          <h3
            className="mb-5 text-center text-lg font-bold sm:text-xl"
            style={{ color: "var(--text-primary)" }}
          >
            3D 촉각 교구 미리보기
          </h3>
          <Suspense
            fallback={
              <div
                className="flex h-[340px] items-center justify-center rounded-2xl border shadow-sm sm:h-[440px]"
                style={{ borderColor: "var(--border-light)", backgroundColor: "var(--bg-card)" }}
                role="status"
              >
                <div className="text-center">
                  <div className="mb-3 flex justify-center" aria-hidden="true">
                    <Spinner />
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    3D 뷰어를 불러오는 중...
                  </p>
                </div>
              </div>
            }
          >
            <ThreeViewer
              detectedObject={result.detectedObject}
              brailleText={result.brailleText}
            />
          </Suspense>
        </div>
      )}

      {/* ── Error: 오류 ── */}
      {status === "error" && (
        <div
          className="rounded-2xl border-2 p-10 text-center shadow-sm sm:p-14"
          style={{
            borderColor: "var(--error)",
            backgroundColor: "var(--bg-card)",
          }}
          role="alert"
        >
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--error-bg)" }}
            aria-hidden="true"
          >
            <ErrorIcon />
          </div>

          <p
            className="text-lg font-bold"
            style={{ color: "var(--error)" }}
          >
            변환에 실패했습니다
          </p>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-bold text-white shadow-md transition-all hover:shadow-lg"
            style={{ backgroundColor: "var(--accent)" }}
            aria-label="오류를 닫고 이미지 업로드를 다시 시도"
          >
            <RefreshIcon />
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}

/* ── 아이콘 컴포넌트 ── */

function UploadCloudIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="var(--border)" strokeWidth="2.5" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}
