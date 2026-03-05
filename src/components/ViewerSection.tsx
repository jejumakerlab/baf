import ImageUploader from "./ImageUploader";

export default function ViewerSection() {
  return (
    <section
      id="viewer"
      className="px-4 py-20 sm:px-6 sm:py-28"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      aria-labelledby="viewer-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2
            id="viewer-heading"
            className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            3D 촉각 교구 변환
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            이미지를 업로드하면 AI가 사물을 인식하고
            <br className="hidden sm:block" />
            3D 촉각 데이터와 점자로 변환합니다.
          </p>
        </div>

        <div className="mt-12">
          <ImageUploader />
        </div>

        <div
          className="mx-auto mt-12 overflow-hidden rounded-2xl border-2 border-dashed"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="flex min-h-[280px] flex-col items-center justify-center p-8 sm:min-h-[360px] sm:p-12"
            role="img"
            aria-label="WebGL 기반 3D 뷰어가 이 위치에 표시됩니다. 현재 개발 중인 기능입니다."
          >
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "var(--accent)", opacity: 0.15 }}
              aria-hidden="true"
            >
              <CubeIcon />
            </div>

            <p
              className="text-center text-lg font-semibold sm:text-xl"
              style={{ color: "var(--text-primary)" }}
            >
              3D 뷰어 미리보기
            </p>
            <p
              className="mt-2 text-center text-sm sm:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              변환된 3D 촉각 교구를 미리 시뮬레이션 해보세요.
            </p>

            <span
              className="mt-6 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--accent)",
                color: "white",
                opacity: 0.7,
              }}
              aria-label="WebGL 3D 뷰어 기능은 현재 준비 중입니다"
            >
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CubeIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
