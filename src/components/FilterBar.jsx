import { Search } from "lucide-react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../data/initialData";
import { Field, Input, Select } from "./ui";

export default function FilterBar({ filters, onChange, onReset, active }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
  const options = (items, all) => (
    <>
      <option value="All">{all}</option>
      {items.map((i) => (
        <option key={i}>{i}</option>
      ))}
    </>
  );

  return (
    <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">
      <Field label="Search">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input className="pl-9" placeholder="Title, tag or notes" value={filters.search} onChange={set("search")} />
        </div>
      </Field>
      <Field label="Category">
        <Select value={filters.category} onChange={set("category")}>
          {options(CATEGORIES, "All categories")}
        </Select>
      </Field>
      <Field label="Status">
        <Select value={filters.status} onChange={set("status")}>
          {options(STATUSES, "All statuses")}
        </Select>
      </Field>
      <Field label="Difficulty">
        <Select value={filters.difficulty} onChange={set("difficulty")}>
          {options(DIFFICULTIES, "All difficulties")}
        </Select>
      </Field>
      <button
        type="button"
        onClick={onReset}
        disabled={!active}
        className="pb-2.5 text-sm font-bold text-accent underline underline-offset-2 hover:opacity-80 disabled:cursor-default disabled:opacity-40 disabled:no-underline sm:col-span-2 lg:col-span-1"
      >
        Clear
      </button>
    </div>
  );
}
