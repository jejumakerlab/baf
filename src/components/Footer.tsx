export default function Footer() {
  return (
    <footer
      className="border-t px-4 py-12 sm:px-6"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border)",
      }}
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <p
              className="text-lg font-extrabold"
              style={{ color: "var(--accent)" }}
            >
              BAF
            </p>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Barrier-free AI Factory
            </p>
          </div>

          <nav aria-label="푸터 내비게이션">
            <ul className="flex gap-6" role="list">
              <li>
                <a
                  href="#process"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  서비스 소개
                </a>
              </li>
              <li>
                <a
                  href="#viewer"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  3D 변환
                </a>
              </li>
              <li>
                <a
                  href="#partnership"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  제휴 안내
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="mt-8 border-t pt-8 text-center text-sm"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p>&copy; 2026 BAF. 모든 사람을 위한 교육을 만듭니다.</p>
        </div>
      </div>
    </footer>
  );
}
