"use client";

import { useState, useCallback } from "react";

interface HeaderProps {
  highContrast: boolean;
  onToggleContrast: () => void;
}

export default function Header({
  highContrast,
  onToggleContrast,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const navItems = [
    { label: "서비스 소개", href: "#process" },
    { label: "3D 변환하기", href: "#viewer" },
    { label: "제휴 안내", href: "#partnership" },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
        borderColor: "var(--border-light)",
      }}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a
          href="#"
          className="flex items-center gap-2.5"
          aria-label="BAF 홈으로 이동"
        >
          <span
            className="text-xl font-extrabold tracking-tight sm:text-2xl"
            style={{ color: "var(--accent)" }}
          >
            BAF
          </span>
          <span
            className="hidden rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide sm:inline"
            style={{
              backgroundColor: "var(--accent-subtle)",
              color: "var(--accent)",
            }}
          >
            Barrier-free AI Factory
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="메인 내비게이션"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-5 py-2 text-[14px] font-medium transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              {item.label}
            </a>
          ))}

          <div
            className="mx-3 h-5 w-px"
            style={{ backgroundColor: "var(--border)" }}
            aria-hidden="true"
          />

          <button
            onClick={onToggleContrast}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
            aria-label={
              highContrast
                ? "고대비 모드 비활성화"
                : "고대비 모드 활성화"
            }
            aria-pressed={highContrast}
          >
            <ContrastIcon />
            <span className="hidden lg:inline">
              {highContrast ? "기본 모드" : "고대비 모드"}
            </span>
          </button>
        </nav>

        <button
          className="rounded-xl p-2 transition-colors md:hidden"
          style={{ color: "var(--text-primary)" }}
          onClick={toggleMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="border-t px-5 pb-5 pt-3 md:hidden"
          style={{ borderColor: "var(--border-light)" }}
          aria-label="모바일 내비게이션"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors"
                  style={{ color: "var(--text-primary)" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  onToggleContrast();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors"
                style={{ color: "var(--text-primary)" }}
                aria-label={
                  highContrast
                    ? "고대비 모드 비활성화"
                    : "고대비 모드 활성화"
                }
                aria-pressed={highContrast}
              >
                <ContrastIcon />
                {highContrast ? "기본 모드" : "고대비 모드"}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function ContrastIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
