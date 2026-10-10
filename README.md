# Practice Tracker

A weekly interview-preparation dashboard for tracking DSA problems, Git & GitHub scenarios and Full-Stack technical questions. It ships pre-loaded with the 15 questions from Sheryians Weekly Interview Preparation Program, Sheet 01, and keeps everything in the browser, so there is no backend or account.

Built with React 19, Vite, Tailwind CSS v4 and lucide-react, in a neumorphic light/dark design.

## Features

- **Dashboard:** total questions, DSA solved, interview questions answered, overall completion with a progress bar, and a Machine Coding status (Not Started / In Progress / Completed).
- **Question management:** add, edit and delete questions. Delete asks for confirmation inline. Status can be changed straight from the list.
- **Search and filters:** live search across title, tag and notes, plus Category, Status and Difficulty filters with a one-click Clear.
- **Persistence:** questions, Machine Coding status and theme are saved in `localStorage`.
- **Reset data:** restores the 15 Sheet 01 questions and clears filters.
- **Theme toggle:** light and dark, defaulting to your OS preference and remembered afterwards.
- **Empty states and feedback:** friendly empty states, form validation, and toast messages on add, update and delete.
- **Responsive:** table on desktop, cards on mobile.

## Project structure

```
src/
  App.jsx                    State, filtering and page layout
  index.css                  Theme tokens and neumorphic shadow classes
  components/
    DashboardStats.jsx       Summary tiles
    FilterBar.jsx            Search and filters
    QuestionTable.jsx        Table (desktop) / cards (mobile)
    QuestionFormModal.jsx    Add and edit form with validation
    EmptyState.jsx           No-data and no-results states
    Toast.jsx                Notifications
    ui.jsx                   Button, Input, Select, Textarea, Field
  hooks/
    useLocalStorage.js       State persisted to localStorage
    useTheme.js              Light/dark theme
  data/initialData.js        Sheet 01 questions and option lists
  lib/cn.js                  clsx + tailwind-merge helper
```

## Data

Each question has this shape:

```js
{
  (id, title, category, tag, difficulty, status, notes);
}
```

- `category`: `DSA`, `Git & GitHub` or `Full-Stack Technical`
- `difficulty`: `Easy`, `Medium` or `Hard`
- `status`: `Pending`, `In Progress` or `Completed`
- `notes`: a link or free text. A plain URL is shown as a link.

Storage keys: `ipt:questions:v2`, `ipt:machine` and `ipt:theme`. To change the starting questions, edit `src/data/initialData.js`. If you change the shape of stored data, bump the `v2` suffix on the questions key so existing browsers pick up the new defaults.

## Theming

Colours and shadows are CSS variables in `src/index.css`, defined for `:root` (light) and `.dark`. The `.neu`, `.neu-sm`, `.neu-inset` and `.neu-btn` classes create the raised and pressed looks, so changing the palette only means editing the variables.
