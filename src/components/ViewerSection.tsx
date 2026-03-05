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
      </div>
    </section>
  );
}
