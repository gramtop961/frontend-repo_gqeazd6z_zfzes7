import React from "react";

export default function Header({ onSeed, seeding, total }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <div>
            <h1 className="text-white font-semibold leading-tight">Blue Blog</h1>
            <p className="text-xs text-slate-400">A fast, searchable blog with 1500 demo posts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm hidden sm:block">{total?.toLocaleString?.() ?? ""} posts</span>
          <button
            onClick={onSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-3 py-2 text-sm shadow"
          >
            {seeding ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                Seeding…
              </>
            ) : (
              <>Seed 1500 posts</>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
