export default function Footer() {
  return (
    <footer
      className="border-t px-5 py-16 sm:px-8"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-light)",
      }}
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p
              className="text-xl font-extrabold tracking-tight"
              style={{ color: "var(--accent)" }}
            >
              BAF
            </p>
            <p
              className="mt-1.5 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Barrier-free AI Factory
            </p>
          </div>

          <nav aria-label="푸터 내비게이션">
            <ul className="flex gap-8" role="list">
              <li>
                <a
                  href="#process"
                  className="text-sm font-medium transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  서비스 소개
                </a>
              </li>
              <li>
                <a
                  href="#viewer"
                  className="text-sm font-medium transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  3D 변환
                </a>
              </li>
              <li>
                <a
                  href="#partnership"
                  className="text-sm font-medium transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  제휴 안내
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="mt-10 border-t pt-8 text-center text-sm"
          style={{
            borderColor: "var(--border-light)",
            color: "var(--text-muted)",
          }}
        >
          <p>&copy; 2026 BAF. 모든 사람을 위한 교육을 만듭니다.</p>
        </div>
      </div>
    </footer>
  );
}
