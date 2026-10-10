import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

const variants = {
  primary: "bg-accent text-white",
  secondary: "bg-paper text-ink",
  ghost: "bg-paper text-muted hover:text-ink",
};

export function Button({ variant = "primary", type = "button", className, ...props }) {
  return (
    <button
      type={type}
      className={cn(
        "neu-btn inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

const fieldClass =
  "neu-inset w-full rounded-xl border-0 bg-paper px-3.5 py-2.5 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50";

export function Input({ className, ...props }) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Select({ className, wrapperClassName, children, ...props }) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <select className={cn(fieldClass, "cursor-pointer appearance-none pr-9", className)} {...props}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

export function Textarea({ className, ...props }) {
  return <textarea className={cn(fieldClass, "resize-none", className)} {...props} />;
}

export function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-semibold text-rose-fg">{error}</span>}
    </label>
  );
}
