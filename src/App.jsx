import React, { useEffect, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PostCard from "./components/PostCard";
import PostModal from "./components/PostModal";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [query, setQuery] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(12);
  const [posts, setPosts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [pages, setPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [seeding, setSeeding] = React.useState(false);
  const [openSlug, setOpenSlug] = React.useState("");

  const fetchPosts = () => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (query) params.set("q", query);
    if (tag) params.set("tag", tag);
    fetch(`${BACKEND}/api/posts?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data) => {
        setPosts(data.items || []);
        setTotal(data.total || 0);
        setPages(data.pages || 1);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, [page, tag]);

  const onSearch = () => {
    setPage(1);
    fetchPosts();
  };

  const onSeed = async () => {
    try {
      setSeeding(true);
      await fetch(`${BACKEND}/api/seed`, { method: "POST" });
      setPage(1);
      fetchPosts();
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  const onOpen = (slug) => setOpenSlug(slug);
  const onClose = () => setOpenSlug("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <Header onSeed={onSeed} seeding={seeding} total={total} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
          tag={tag}
          onTagChange={setTag}
        />
        <div className="mt-3">
          <button
            onClick={onSearch}
            className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-400 mt-6">{error}</p>}

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="h-36 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse" />
            ))
          ) : posts.length ? (
            posts.map((p) => <PostCard key={p.slug} post={p} onOpen={onOpen} />)
          ) : (
            <p className="text-slate-400">No posts found.</p>
          )}
        </section>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-2 rounded bg-slate-900 border border-slate-800 disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm text-slate-400">
            Page {page} of {pages}
          </p>
          <button
            onClick={() => setPage((p) => (p < pages ? p + 1 : p))}
            disabled={page >= pages}
            className="px-3 py-2 rounded bg-slate-900 border border-slate-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>

      <PostModal slug={openSlug} onClose={onClose} backend={BACKEND} />
    </div>
  );
}
