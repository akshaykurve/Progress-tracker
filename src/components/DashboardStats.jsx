import { MACHINE_CODING_STATUSES } from "../data/initialData";
import { cn } from "../lib/cn";
import { Select } from "./ui";

const machineTone = {
  "Not Started": "bg-rose-bg text-rose-fg",
  "In Progress": "bg-yellow-bg text-yellow-fg",
  Completed: "bg-green-bg text-green-fg",
};

function Tile({ label, sub, tone, className, children }) {
  return (
    <div className={cn("neu flex min-w-0 flex-col justify-between gap-3 rounded-2xl p-4", tone, className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold leading-tight">{label}</p>
          {sub && <p className="mt-0.5 text-xs font-semibold opacity-75">{sub}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

const Big = ({ children }) => <p className="text-3xl font-extrabold leading-none">{children}</p>;

export default function DashboardStats({ questions, machineStatus, onMachineStatusChange }) {
  const total = questions.length;
  const completed = questions.filter((x) => x.status === "Completed");
  const dsaTotal = questions.filter((x) => x.category === "DSA").length;
  const dsaDone = completed.filter((x) => x.category === "DSA").length;
  const intTotal = total - dsaTotal;
  const intDone = completed.length - dsaDone;
  const rate = total ? Math.round((completed.length / total) * 100) : 0;

  return (
    <section aria-label="Progress summary" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      <Tile label="Total" sub="questions" tone="bg-blue-bg text-blue-fg">
        <Big>{total}</Big>
      </Tile>
      <Tile label="DSA" sub={`${dsaDone} of ${dsaTotal} solved`} tone="bg-green-bg text-green-fg">
        <Big>{dsaDone}</Big>
      </Tile>
      <Tile label="Interview Qs" sub={`${intDone} of ${intTotal} answered`} tone="bg-yellow-bg text-yellow-fg">
        <Big>{intDone}</Big>
      </Tile>
      <Tile label="Completion" sub="overall" tone="bg-paper text-ink">
        <div className="w-full max-w-28">
          <Big>{rate}%</Big>
          <div
            role="progressbar"
            aria-label="Completion rate"
            aria-valuenow={rate}
            aria-valuemin={0}
            aria-valuemax={100}
            className="neu-inset mt-3 h-3 overflow-hidden rounded-full"
          >
            <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${rate}%` }} />
          </div>
        </div>
      </Tile>
      <Tile label="Machine coding" tone={machineTone[machineStatus]} className="sm:col-span-2 lg:col-span-1">
        <Select
          aria-label="Machine coding status"
          wrapperClassName="w-full max-w-40"
          value={machineStatus}
          onChange={(e) => onMachineStatusChange(e.target.value)}
          className="py-1.5 text-xs"
        >
          {MACHINE_CODING_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </Tile>
    </section>
  );
}
