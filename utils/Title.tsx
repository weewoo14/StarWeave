export default function StarWeaveTitle({ size }: { size: number }) {
  const style = {
    fontSize: `${size}vw`,
    WebkitTextStroke: `${size}px currentColor`,
  };
  return (
    <div className="flex flex-row">
      <h1 className="font-syne text-white" style={style}> Star </h1>
      <h1 className="font-syne text-nebulaHighlight" style={style}> Weave </h1>
    </div>
  );
}