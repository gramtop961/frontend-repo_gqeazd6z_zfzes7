import React, { useEffect } from "react";

export default function PostModal({ slug, onClose, backend }) {
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");
    fetch(`${backend}/api/posts/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data) => setPost(data))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [slug, backend]);

  if (!slug) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-white text-xl font-semibold">{post?.title || "Loading…"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        {loading && <p className="text-slate-400 mt-4">Loading…</p>}
        {error && (
          <p className="text-red-400 mt-4">{error}</p>
        )}
        {post && (
          <div className="prose prose-invert mt-4">
            {post.content.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
