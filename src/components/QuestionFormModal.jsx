import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../data/initialData";
import { Button, Field, Input, Select, Textarea } from "./ui";

const blank = { title: "", category: CATEGORIES[0], tag: "", difficulty: "Easy", status: "Pending", notes: "" };

export default function QuestionFormModal({ question, onSave, onClose }) {
  const [form, setForm] = useState(question ?? blank);
  const [errors, setErrors] = useState({});
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Give the question a title.";
    if (form.notes.length > 500) errs.notes = "Keep notes under 500 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave({ ...form, title: form.title.trim(), tag: form.tag.trim(), notes: form.notes.trim() });
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/35 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-label={question ? "Edit question" : "Add question"}
        className="neu max-h-[92vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-t-3xl bg-paper p-6 sm:rounded-3xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-ink">{question ? "Edit question" : "Add a question"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="neu-btn rounded-full bg-paper p-2 text-muted hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        </div>

        <Field label="Title" error={errors.title}>
          <Input autoFocus value={form.title} onChange={set("title")} placeholder="e.g. Two Sum (LC 1)" />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Category">
            <Select value={form.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Tag (optional)">
            <Input value={form.tag} onChange={set("tag")} placeholder="React, LeetCode Easy…" />
          </Field>
          <Field label="Difficulty">
            <Select value={form.difficulty} onChange={set("difficulty")}>
              {DIFFICULTIES.map((c) => <option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={set("status")}>
              {STATUSES.map((c) => <option key={c}>{c}</option>)}
            </Select>
          </Field>
        </div>

        <Field label="Link or notes (optional)" error={errors.notes}>
          <Textarea rows={3} value={form.notes} onChange={set("notes")} placeholder="A solution link, or a line to remember" />
        </Field>

        <div className="flex justify-end gap-3 pt-1">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{question ? "Save changes" : "Add question"}</Button>
        </div>
      </form>
    </div>
  );
}
