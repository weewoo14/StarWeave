export default function Stat({label, value} : {label: string, value: string | number | undefined | null}){
  return (
    <div className="rounded-xl border border-nebulaObjectCardAccent bg-[#2D2868] p-4">
      <p className="text-sm uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold">
        {value ?? "Unknown"}
      </p>
    </div>
  );
}