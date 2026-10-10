import { useEffect, useMemo, useRef, useState } from "react";
import { Moon, Plus, Sun } from "lucide-react";
import DashboardStats from "./components/DashboardStats";
import EmptyState from "./components/EmptyState";
import FilterBar from "./components/FilterBar";
import QuestionFormModal from "./components/QuestionFormModal";
import QuestionTable from "./components/QuestionTable";
import Toast from "./components/Toast";
import { Button } from "./components/ui";
import { initialQuestions } from "./data/initialData";
import useLocalStorage from "./hooks/useLocalStorage";
import useTheme from "./hooks/useTheme";

const defaultFilters = { search: "", category: "All", status: "All", difficulty: "All" };

const App = () => {
  const [questions, setQuestions, resetQuestions] = useLocalStorage("ipt:questions:v2", initialQuestions);
  const [machineStatus, setMachineStatus, resetMachine] = useLocalStorage("ipt:machine", "Not Started");
  const [theme, toggleTheme] = useTheme();
  const [filters, setFilters] = useState(defaultFilters);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef();

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  const filtersActive = Object.keys(defaultFilters).some((k) => filters[k] !== defaultFilters[k]);

  const visible = useMemo(() => {
    const s = filters.search.trim().toLowerCase();
    return questions.filter(
      (q) =>
        (filters.category === "All" || q.category === filters.category) &&
        (filters.status === "All" || q.status === filters.status) &&
        (filters.difficulty === "All" || q.difficulty === filters.difficulty) &&
        (!s || [q.title, q.tag, q.notes].some((f) => f?.toLowerCase().includes(s))),
    );
  }, [questions, filters]);

  const save = (data) => {
    if (modal.question) {
      setQuestions((qs) => qs.map((q) => (q.id === modal.question.id ? { ...q, ...data } : q)));
      notify("Question updated");
    } else {
      setQuestions((qs) => [{ ...data, id: crypto.randomUUID() }, ...qs]);
      notify("Question added");
    }
    setModal(null);
  };

  const remove = (id) => {
    setQuestions((qs) => qs.filter((q) => q.id !== id));
    notify("Question deleted");
  };

  const setStatus = (id, status) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, status } : q)));
    notify(`Marked as ${status}`);
  };

  const resetAll = () => {
    if (!window.confirm("Reset all data to the default sample questions?")) return;
    resetQuestions();
    resetMachine();
    setFilters(defaultFilters);
    notify("Data reset to defaults");
  };

  const openModal = (question) => setModal({ question, key: Date.now() });
  const clearFilters = () => setFilters(defaultFilters);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:py-12">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Practice Tracker</h1>
            <p className="mt-1 text-sm font-semibold text-muted">Sheet 01 · DSA, Git &amp; GitHub, Full-Stack</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={resetAll}>Reset data</Button>
            <Button
              variant="secondary"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="rounded-full px-2.5"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button onClick={() => openModal(null)}><Plus className="h-4 w-4" /> Add question</Button>
          </div>
        </header>

        <DashboardStats questions={questions} machineStatus={machineStatus} onMachineStatusChange={setMachineStatus} />

        {questions.length > 0 && (
          <FilterBar filters={filters} onChange={setFilters} onReset={clearFilters} active={filtersActive} />
        )}

        {questions.length === 0 ? (
          <EmptyState onAdd={() => openModal(null)} />
        ) : visible.length === 0 ? (
          <EmptyState filtered onClear={clearFilters} />
        ) : (
          <>
            <p className="text-xs font-semibold text-muted">Showing {visible.length} of {questions.length}</p>
            <QuestionTable questions={visible} onEdit={openModal} onDelete={remove} onStatus={setStatus} />
          </>
        )}
      </div>

      {modal && <QuestionFormModal key={modal.key} question={modal.question} onSave={save} onClose={() => setModal(null)} />}
      <Toast message={toast} />
    </div>
  );
};

export default App;
