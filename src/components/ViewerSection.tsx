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
            3D 촉각 교구 미리보기
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            변환된 3D 촉각 교구를 미리 시뮬레이션 해보세요.
          </p>
        </div>

        <div
          className="mx-auto mt-12 overflow-hidden rounded-2xl border-2 border-dashed"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="flex min-h-[320px] flex-col items-center justify-center p-8 sm:min-h-[420px] sm:p-12"
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
              WebGL 3D 뷰어 영역
            </p>
            <p
              className="mt-2 text-center text-sm sm:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              이미지를 업로드하면 변환된 3D 촉각 교구 모델이
              <br className="hidden sm:block" />이 영역에서
              인터랙티브하게 표시됩니다.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <button
                className="inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-colors hover:opacity-80"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                }}
                aria-label="샘플 3D 모델 불러오기 (준비 중)"
                disabled
              >
                <SampleIcon />
                샘플 모델 보기
              </button>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "white",
                  opacity: 0.7,
                }}
                aria-label="이 기능은 현재 준비 중입니다"
              >
                Coming Soon
              </span>
            </div>
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

function SampleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
