export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:py-36"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h1
          id="hero-heading"
          className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ color: "var(--text-primary)" }}
        >
          시각장애인의 베스트 프렌드,{" "}
          <span style={{ color: "var(--accent)" }}>배프(BAF)</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          단 한 장의 이미지로 세상의 모든 사물을
          <br className="hidden sm:block" />
          만져볼 수 있는 3D 촉각 교구로 변환합니다.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#viewer"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl sm:text-lg"
            style={{
              backgroundColor: "var(--accent)",
            }}
            role="button"
            aria-label="이미지를 업로드하여 3D 촉각 교구로 변환하기"
          >
            <UploadIcon />
            지금 이미지 업로드하기
          </a>
        </div>

        <p
          className="mt-4 text-sm"
          style={{ color: "var(--text-muted)" }}
          aria-live="polite"
        >
          별도의 회원가입 없이 바로 체험하실 수 있습니다.
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

function UploadIcon() {
  return (
    <svg
      width="22"
      height="22"
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
