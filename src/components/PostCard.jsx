import React from "react";

export default function PostCard({ post, onOpen }) {
  return (
    <article
      onClick={() => onOpen(post.slug)}
      className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-colors p-5 flex flex-col gap-3"
    >
      <div className="flex-1">
        <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm mt-1 line-clamp-3">{post.excerpt}</p>
      </div>
      <div className="text-xs text-slate-500 flex items-center gap-2">
        <span>{post.author}</span>
        <span>•</span>
        <div className="flex gap-1 flex-wrap">
          {post.tags?.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
