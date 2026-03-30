export default function GradientEdges() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] max-w-[120px] bg-linear-to-r from-neutral-950/60 to-neutral-950/0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] max-w-[120px] bg-linear-to-l from-neutral-950/60 to-neutral-950/0"
      />
    </>
  );
}
