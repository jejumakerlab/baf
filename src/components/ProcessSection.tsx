const steps = [
  {
    number: 1,
    title: "수요자 이미지 업로드",
    description:
      "변환하고 싶은 사물의 이미지를 업로드하세요. 사진 한 장이면 충분합니다.",
    icon: CameraIcon,
  },
  {
    number: 2,
    title: "AI 사물인식 및 3D 입체 변환",
    description:
      "인공지능이 사물을 인식하고, 점자를 자동 매핑하여 3D 입체 모델로 변환합니다.",
    icon: AiIcon,
  },
  {
    number: 3,
    title: "클라우드 분산 제조",
    description:
      "지역 메이커와 자동으로 매칭하여 가까운 곳에서 3D 프린팅으로 제작합니다.",
    icon: CloudIcon,
  },
  {
    number: 4,
    title: "맞춤형 교구 배송",
    description:
      "제작이 완료된 3D 촉각 교구를 안전하게 포장하여 수요자에게 배송합니다.",
    icon: DeliveryIcon,
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="px-4 py-20 sm:px-6 sm:py-28"
      style={{ backgroundColor: "var(--bg-primary)" }}
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="process-heading"
            className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            어떻게 작동하나요?
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            이미지 한 장으로 촉각 교구가 완성되기까지, 단 4단계면 됩니다.
          </p>
        </div>

        <ol
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="3D 촉각 교구 변환 과정 4단계"
        >
          {steps.map((step) => (
            <li key={step.number} className="group relative">
              <div
                className="flex h-full flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg sm:p-8"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "var(--accent)",
                  }}
                  aria-hidden="true"
                >
                  <step.icon />
                </div>

                <span
                  className="mb-2 text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                  aria-hidden="true"
                >
                  Step {step.number}
                </span>

                <h3
                  className="mb-3 text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span className="sr-only">
                    {step.number}단계:{" "}
                  </span>
                  {step.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CameraIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
