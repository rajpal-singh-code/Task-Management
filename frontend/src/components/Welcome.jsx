import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-[#020617] via-[#020617] to-[#030712] px-4 sm:px-6 font-sans tracking-tight overflow-hidden">

      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 blur-[140px] rounded-full" />
      </div>

      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

        
          <div className="flex justify-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-linear-to-tr from-emerald-400 to-cyan-400 p-0.5">
              <div className="h-full w-full rounded-2xl bg-[#020617] flex items-center justify-center text-xl">
                🚀
              </div>
            </div>
          </div>

        
          <div className="text-center mb-10 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-bold">
              Session Active
            </p>

            <h1 className="text-3xl sm:text-4xl font-semibold text-white">
              Welcome,{" "}
              <span className="text-slate-400">
                {user ? user.firstName : "Guest"}
              </span>
            </h1>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
              Your workspace is ready. Create, manage, and track all your
              projects in one place.
            </p>
          </div>

          
          <div className="grid gap-4">
            <Link to="/chat">
              <button className="w-full py-4 rounded-xl bg-linear-to-r from-emerald-400 to-cyan-400 text-black text-sm font-bold tracking-wide hover:opacity-90 active:scale-[0.98] transition">
                ➕ Create New Project
              </button>
            </Link>

            <Link to="/projects">
              <button className="w-full py-4 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-semibold hover:bg-white/15 active:scale-[0.98] transition">
                📁 View My Projects
              </button>
            </Link>

            <Link to="/profile">
              <button className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wide text-slate-300 hover:text-white transition">
                View Profile →
              </button>
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-slate-500 text-[10px] uppercase tracking-widest">
            <span className="h-px w-8 bg-white/20" />
            AI Workspace v2.5
            <span className="h-px w-8 bg-white/20" />
          </div>
        </div>
      </div>

      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] pointer-events-none" />
    </div>
  );
};

export default Welcome;
