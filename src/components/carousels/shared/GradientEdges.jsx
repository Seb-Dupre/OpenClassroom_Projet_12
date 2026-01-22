export default function GradientEdges() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[12vw] max-w-[120px] bg-linear-to-r from-neutral-950/60 to-neutral-950/0" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[12vw] max-w-[120px] bg-linear-to-l from-neutral-950/60 to-neutral-950/0" />
    </>
  );
}
