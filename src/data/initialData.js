export const CATEGORIES = ["DSA", "Git & GitHub", "Full-Stack Technical"];
export const STATUSES = ["Pending", "In Progress", "Completed"];
export const DIFFICULTIES = ["Easy", "Medium", "Hard"];
export const MACHINE_CODING_STATUSES = ["Not Started", "In Progress", "Completed"];

const q = (id, title, category, tag, difficulty, notes) => ({
  id: `seed-${id}`,
  title,
  category,
  tag,
  difficulty,
  status: "Pending",
  notes,
});

const lc = (slug) => `https://leetcode.com/problems/${slug}/`;

export const initialQuestions = () => [
  q(1, "Two Sum (LC 1)", "DSA", "LeetCode Easy", "Easy", lc("two-sum")),
  q(2, "Remove Duplicates from Sorted Array (LC 26)", "DSA", "LeetCode Easy", "Easy", lc("remove-duplicates-from-sorted-array")),
  q(3, "Move Zeroes (LC 283)", "DSA", "LeetCode Easy", "Easy", lc("move-zeroes")),
  q(4, "Rotate Array (LC 189)", "DSA", "LeetCode Medium", "Medium", lc("rotate-array")),
  q(5, "3Sum (LC 15)", "DSA", "LeetCode Medium", "Medium", lc("3sum")),

  q(6, "Wrong Branch, Correct Work", "Git & GitHub", "Git Scenario", "Medium",
    "4 commits landed on main instead of the feature branch. Follow-ups: does it change if already pushed? When to use cherry-pick? What if teammates already use main?"),
  q(7, "Merge Conflict During PR", "Git & GitHub", "Git Scenario", "Medium",
    "Conflict with main just before merge. Follow-ups: verify resolution didn't break anything? Merge vs rebase trade-off? What to do before pushing the resolved branch?"),
  q(8, "Secret Accidentally Committed", "Git & GitHub", "Git Scenario", "Hard",
    "API key pushed to GitHub. Follow-ups: why isn't deleting the commit/file enough? What happens to the exposed key? How to prevent it again?"),
  q(9, "PR Review With New Changes", "Git & GitHub", "Git Scenario", "Medium",
    "Reviewer requests changes after several pushed commits. Follow-ups: new commit or amend/squash? When is force-push risky? How to communicate a significant change?"),
  q(10, "Recovering Lost Local Work", "Git & GitHub", "Git Scenario", "Medium",
    "Branch no longer points to yesterday's commit. Follow-ups: what is git reflog and why does it help? Verify the recovered commit before moving the branch? Habits that prevent permanent loss?"),

  q(11, "JavaScript — Async Flow", "Full-Stack Technical", "Async Flow", "Medium",
    "fetch() + UI update + setTimeout() in one flow: event loop order. Follow-ups: microtask vs macrotask? Where do Promise callbacks fit? Why does blocking sync JS freeze the UI?"),
  q(12, "React — Unnecessary Re-render", "Full-Stack Technical", "React", "Medium",
    "Frequent parent re-renders slow the page. Follow-ups: when does React.memo help? What do useMemo/useCallback actually solve? Why not memoize everything?"),
  q(13, "REST API + Express — Request Flow", "Full-Stack Technical", "Express", "Medium",
    "Protected GET /api/profile returns 401 for a logged-in user. Follow-ups: where should auth middleware run? Authentication vs authorization failure? 401 vs 403?"),
  q(14, "MongoDB + Mongoose — Duplicate Data", "Full-Stack Technical", "MongoDB", "Hard",
    "Race condition allows duplicate emails. Follow-ups: is an app-level check enough? How does a unique index help? How should the API respond to a duplicate-key error?"),
  q(15, "Authentication + Authorization + ImageKit", "Full-Stack Technical", "Auth", "Hard",
    "Authenticated student must not access another student's resource or upload area. Follow-ups: authN vs authZ? What can the server trust from the client? Preventing ID tampering in the URL? Where does ImageKit fit in the upload flow?"),
];
