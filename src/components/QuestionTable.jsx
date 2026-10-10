import { useState } from "react";
import { ChevronDown, Edit3, Trash2 } from "lucide-react";
import { STATUSES } from "../data/initialData";
import { cn } from "../lib/cn";

const difficultyTone = {
  Easy: "bg-green-bg text-green-fg",
  Medium: "bg-yellow-bg text-yellow-fg",
  Hard: "bg-rose-bg text-rose-fg",
};
const statusTone = {
  Pending: "bg-rose-bg text-rose-fg",
  "In Progress": "bg-yellow-bg text-yellow-fg",
  Completed: "bg-green-bg text-green-fg",
};
const statusPct = { Pending: 0, "In Progress": 50, Completed: 100 };

const isUrl = (s) => /^https?:\/\/\S+$/.test(s);

function Pill({ tone, className, children }) {
  return (
    <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-bold", tone, className)}>{children}</span>
  );
}

function Notes({ text }) {
  if (!text) return <span className="text-muted">—</span>;
  if (isUrl(text))
    return (
      <a href={text} target="_blank" rel="noreferrer" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
        Open on LeetCode
      </a>
    );
  return <span title={text} className="line-clamp-3 text-muted">{text}</span>;
}

function Progress({ status }) {
  return (
    <div className="neu-inset h-3 w-full min-w-24 overflow-hidden rounded-full" aria-hidden="true">
      <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${statusPct[status]}%` }} />
    </div>
  );
}

function Actions({ q, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  if (confirming)
    return (
      <div className="flex items-center gap-2 text-sm font-bold">
        <span className="text-muted">Delete?</span>
        <button type="button" onClick={() => onDelete(q.id)} className="text-rose-fg hover:underline">Yes</button>
        <button type="button" onClick={() => setConfirming(false)} className="text-muted hover:text-ink">No</button>
      </div>
    );
  const btn = "neu-btn rounded-full bg-paper p-2 text-muted";
  return (
    <div className="flex items-center gap-2">
      <button type="button" aria-label={`Edit ${q.title}`} onClick={() => onEdit(q)} className={cn(btn, "hover:text-accent")}>
        <Edit3 className="h-3.5 w-3.5" />
      </button>
      <button type="button" aria-label={`Delete ${q.title}`} onClick={() => setConfirming(true)} className={cn(btn, "hover:text-rose-fg")}>
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function StatusSelect({ q, onStatus }) {
  return (
    <div className="relative inline-block">
      <select
        aria-label={`Status of ${q.title}`}
        value={q.status}
        onChange={(e) => onStatus(q.id, e.target.value)}
        className={cn(
          "cursor-pointer appearance-none rounded-full border-0 py-1 pl-3 pr-7 text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          statusTone[q.status],
        )}
      >
        {STATUSES.map((s) => <option key={s} className="bg-paper text-ink">{s}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-70" />
    </div>
  );
}

export default function QuestionTable({ questions, onEdit, onDelete, onStatus }) {
  return (
    <>
      <ul className="space-y-5 md:hidden">
        {questions.map((q) => (
          <li key={q.id} className="neu rounded-2xl bg-paper p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-extrabold text-ink">{q.title}</h3>
              <Actions q={q} onEdit={onEdit} onDelete={onDelete} />
            </div>
            <p className="mt-1 text-xs font-semibold text-muted">{[q.category, q.tag].filter(Boolean).join(" · ")}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Pill tone={difficultyTone[q.difficulty]}>{q.difficulty}</Pill>
              <StatusSelect q={q} onStatus={onStatus} />
            </div>
            <div className="mt-3"><Progress status={q.status} /></div>
            <div className="mt-3 text-sm"><Notes text={q.notes} /></div>
          </li>
        ))}
      </ul>

      <div className="neu hidden overflow-x-auto rounded-3xl bg-paper px-5 py-2 md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sh-d/60 text-xs font-extrabold text-ink">
              <th className="py-3 pr-4">Question</th>
              <th className="py-3 pr-4">Category</th>
              <th className="py-3 pr-4">Difficulty</th>
              <th className="py-3 pr-4">Progress</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Link / notes</th>
              <th className="py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-b border-sh-d/40 align-middle last:border-b-0">
                <td className="max-w-64 py-4 pr-4 font-bold text-ink">{q.title}</td>
                <td className="py-4 pr-4">
                  <p className="font-semibold text-ink">{q.category}</p>
                  {q.tag && <p className="text-xs text-muted">{q.tag}</p>}
                </td>
                <td className="py-4 pr-4"><Pill tone={difficultyTone[q.difficulty]}>{q.difficulty}</Pill></td>
                <td className="w-36 py-4 pr-4"><Progress status={q.status} /></td>
                <td className="py-4 pr-4"><StatusSelect q={q} onStatus={onStatus} /></td>
                <td className="max-w-60 py-4 pr-4"><Notes text={q.notes} /></td>
                <td className="py-4"><div className="flex justify-end"><Actions q={q} onEdit={onEdit} onDelete={onDelete} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
