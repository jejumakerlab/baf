import ImageUploader from "./ImageUploader";

export default function ViewerSection() {
  return (
    <section
      id="viewer"
      className="px-5 py-28 sm:px-8 sm:py-36"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      aria-labelledby="viewer-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              backgroundColor: "var(--accent-subtle)",
              color: "var(--accent)",
            }}
          >
            3D Transform
          </span>

          <h2
            id="viewer-heading"
            className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            3D 촉각 교구 변환
          </h2>
          <p
            className="mx-auto mt-5 max-w-lg text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            이미지를 업로드하면 AI가 사물을 인식하고
            <br className="hidden sm:block" />
            3D 촉각 데이터와 점자로 변환합니다.
          </p>
        </div>

        <div className="mt-14">
          <ImageUploader />
        </div>
      </div>
    </section>
  );
}
