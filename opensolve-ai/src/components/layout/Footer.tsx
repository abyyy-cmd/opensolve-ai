export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
              OS
            </div>
            <span className="text-sm font-medium text-gray-900">
              OpenSolve AI
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Turn Problems Into Collaborative Solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
