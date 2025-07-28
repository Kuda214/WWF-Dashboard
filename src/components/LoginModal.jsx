import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose }) {
  const [userType, setUserType] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in both fields.");
      return;
    }

    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      setLoading(false);
      setErrorMsg(authError?.message || "Authentication failed.");
      return;
    }

    const metadata = authData.user.user_metadata || {};
    const roleType = metadata.user_type?.toLowerCase();
    console.log("User authenticated:",metadata.user_role?.toLowerCase());

    if (!roleType ) {
      setLoading(false);
      setErrorMsg("User role or job description not defined. Contact administrator.");
      return;
    }

    if (roleType !== userType) {
      setLoading(false);
      setErrorMsg(`Access denied. You are registered as '${roleType}'.`);
      return;
    }

    // Save user context
    localStorage.setItem("user_context", JSON.stringify({
      id: authData.user.id,
      email: authData.user.email,
      user_type: roleType,
    }));

    setLoading(false);
    onClose();
    navigate("/SB/dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            &times;
          </button>
        </div>

        {/* Role Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 rounded-full overflow-hidden border border-gray-300">
            {["employee", "partner"].map((role) => (
              <button
                key={role}
                onClick={() => setUserType(role)}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  userType === role
                    ? "bg-[#A8C83F] text-black"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {role === "employee" ? "WWF Employee" : "Partner"}
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm text-center font-medium">{errorMsg}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A8C83F] hover:bg-[#8aa42f] text-black font-bold py-3 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
