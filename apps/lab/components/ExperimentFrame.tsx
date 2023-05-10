export function ExperimentFrame({ src }: { src: string }) {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <iframe src={src} style={{ width: "100%", height: "100%", border: "none" }} />
    </div>
  );
}
