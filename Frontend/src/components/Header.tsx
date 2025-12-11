import { useStore } from "../store/store";

export function Header() {
  const username = useStore((s) => s.username);
  const logout = useStore((s) => s.logout);

  return (
    <header className="max-w-7xl mx-auto flex items-center justify-between py-4 mb-1 bg-white px-3 sm:px-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-indigo-600 text-white shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>

        <div>
          <h1 className="text-lg font-semibold">Hello, {username || "User"}</h1>
          <p className="text-sm text-gray-500">Welcome to your learning journey</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="text-sm px-4 py-1.5 rounded-md bg-red-50 text-red-600 border border-red-100"
      >
        Logout
      </button>
    </header>
  );
}
