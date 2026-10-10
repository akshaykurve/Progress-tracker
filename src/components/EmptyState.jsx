import { ClipboardList, SearchX } from "lucide-react";
import { Button } from "./ui";

export default function EmptyState({ filtered, onAdd, onClear }) {
  const Icon = filtered ? SearchX : ClipboardList;
  return (
    <div className="neu flex flex-col items-center rounded-3xl bg-paper px-6 py-14 text-center">
      <div className="neu-inset mb-5 flex h-16 w-16 items-center justify-center rounded-full text-accent">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-extrabold text-ink">
        {filtered ? "No questions match your search/filter criteria" : "Nothing here yet"}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted">
        {filtered
          ? "Try a different keyword, or clear the filters to see everything again."
          : "Add the first question you want to practise this week."}
      </p>
      <Button className="mt-5" onClick={filtered ? onClear : onAdd}>
        {filtered ? "Clear filters" : "Add a question"}
      </Button>
    </div>
  );
}
