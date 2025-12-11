import { useState } from "react";
import { useStore } from "../store/store";

export default function LoginPage() {
  const username = useStore((s) => s.username);
  const setUsername = useStore((s) => s.setUsername);
  const setPage = useStore((s) => s.setPage);
  const setLoggedIn = (val: boolean) => useStore.setState({ isLoggedIn: val });
  const [errormsg, setErrorMsg] = useState('');

  const loginUser = async () => {
    try {
      if (!username) return;
      const res = await fetch(`http://localhost:3000/user/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status == 400) {
        const data = await res.json()
        setErrorMsg(data.error)
        return;
      }
      setLoggedIn(true);
      setPage("dashboard");
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const createUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/user/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status == 400) {
        const data = await res.json()
        setErrorMsg(data.error)
        return;
      }
      setLoggedIn(true);
      setPage("dashboard");
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">

        <h1 className="text-2xl font-semibold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">
          Continue your learning journey
        </p>

        <div className="mb-6">
          <label htmlFor="username" className="text-sm text-gray-600 mb-2 block">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errormsg != '' ? <span className="text-[14px] pl-1 text-red-400">{errormsg}</span> : <></>}
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={loginUser}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-medium shadow hover:bg-indigo-700"
          >
            Continue
          </button>

          <button
            onClick={createUser}
            className="w-full border border-gray-300 py-3 rounded-xl text-sm font-medium hover:bg-gray-100"
          >
            New User
          </button>
        </div>
      </div>
    </div>
  );
}
