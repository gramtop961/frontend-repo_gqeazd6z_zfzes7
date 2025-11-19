import React from "react";

export default function SearchBar({ value, onChange, onClear, tag, onTagChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search posts, excerpts, or tags…"
          className="w-full rounded-lg bg-slate-900/70 border border-slate-800 text-slate-200 placeholder-slate-500 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        )}
      </div>
      <select
        value={tag}
        onChange={(e) => onTagChange(e.target.value)}
        className="sm:w-56 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="">All tags</option>
        {[
          "tech",
          "design",
          "business",
          "ai",
          "dev",
          "life",
          "product",
          "growth",
          "marketing",
          "tutorial",
        ].map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
