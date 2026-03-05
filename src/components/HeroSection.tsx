export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:py-44"
      aria-labelledby="hero-heading"
    >
      {/* 배경 이미지 — 블러 없이 선명하게 */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/main.png')" }}
        role="presentation"
        aria-hidden="true"
      />

      {/* 어두운 그라데이션 오버레이 — 모드별 CSS 변수로 제어 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* 상단 배지 */}
        <div
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            borderColor: "var(--hero-badge-border)",
            backgroundColor: "var(--hero-badge-bg)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--success)" }}
            aria-hidden="true"
          />
          <span
            className="text-xs font-semibold tracking-wide"
            style={{ color: "var(--hero-text-sub)" }}
          >
            AI 기반 3D 촉각 교구 변환 플랫폼
          </span>
        </div>

        {/* 메인 카피 */}
        <h1
          id="hero-heading"
          className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ color: "var(--hero-text)" }}
        >
          시각장애인의
          <br />
          베스트 프렌드,{" "}
          <span style={{ color: "var(--accent)" }}>배프</span>
        </h1>

        {/* 서브 카피 */}
        <p
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed sm:text-lg md:text-xl"
          style={{ color: "var(--hero-text-sub)" }}
        >
          단 한 장의 이미지로 세상의 모든 사물을
          <br className="hidden sm:block" />
          만져볼 수 있는 3D 촉각 교구로 변환합니다.
        </p>

        {/* CTA 버튼 */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#viewer"
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/35 sm:text-base"
            style={{ backgroundColor: "var(--accent)" }}
            role="button"
            aria-label="이미지를 업로드하여 3D 촉각 교구로 변환하기"
          >
            <UploadIcon />
            지금 이미지 업로드하기
          </a>
          <a
            href="#process"
            className="inline-flex items-center gap-2 rounded-full border px-7 py-4 text-[15px] font-semibold transition-all sm:text-base"
            style={{
              borderColor: "var(--hero-btn-secondary-border)",
              color: "var(--hero-btn-secondary-text)",
              backgroundColor: "var(--hero-btn-secondary-bg)",
            }}
            aria-label="서비스 작동 방식 알아보기"
          >
            작동 방식 보기
            <ArrowDownIcon />
          </a>
        </div>

        <p
          className="mt-6 text-sm"
          style={{ color: "var(--hero-text-muted)" }}
          aria-live="polite"
        >
          별도의 회원가입 없이 바로 체험하실 수 있습니다.
        </p>
      </div>
    </section>
  );
}

function UploadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
