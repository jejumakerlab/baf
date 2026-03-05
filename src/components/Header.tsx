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
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border)",
      }}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="text-xl font-extrabold tracking-tight sm:text-2xl"
          style={{ color: "var(--accent)" }}
          aria-label="BAF 홈으로 이동"
        >
          BAF
          <span
            className="ml-2 hidden text-xs font-normal sm:inline"
            style={{ color: "var(--text-muted)" }}
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
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--text-primary)" }}
            >
              {item.label}
            </a>
          ))}

          <button
            onClick={onToggleContrast}
            className="ml-4 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-primary)",
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
          className="rounded-lg p-2 md:hidden"
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
          className="border-t px-4 pb-4 pt-2 md:hidden"
          style={{ borderColor: "var(--border)" }}
          aria-label="모바일 내비게이션"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
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
                className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
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
      width="20"
      height="20"
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
