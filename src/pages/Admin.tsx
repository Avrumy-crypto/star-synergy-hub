import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  createId,
  defaultNewsContent,
  getNewsContent,
  resetNewsContent,
  saveNewsContent,
  type NewsItem,
} from "@/lib/newsContent";

type SectionType = "featured" | "latest" | "press";

const ADMIN_SESSION_KEY = "admin-authenticated";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "fivestar-admin";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof window !== "undefined" && window.localStorage.getItem(ADMIN_SESSION_KEY) === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [content, setContent] = useState(getNewsContent());
  const [section, setSection] = useState<SectionType>("latest");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [pressLine, setPressLine] = useState("");

  const persist = (nextContent: typeof content) => {
    setContent(nextContent);
    saveNewsContent(nextContent);
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== ADMIN_PASSWORD) {
      setError("Invalid password.");
      return;
    }

    window.localStorage.setItem(ADMIN_SESSION_KEY, "true");
    setIsAuthenticated(true);
    setError("");
    setPassword("");
  };

  const logout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (section === "press") {
      if (!pressLine.trim()) return;
      persist({ ...content, press: [pressLine.trim(), ...content.press] });
      setPressLine("");
      return;
    }

    if (!title.trim() || !excerpt.trim() || !date.trim()) return;

    const item: NewsItem = {
      id: createId(section),
      title: title.trim(),
      excerpt: excerpt.trim(),
      date: date.trim(),
      category: section === "featured" ? "Featured" : category.trim() || "News",
    };

    if (section === "featured") {
      persist({ ...content, featured: item });
    } else {
      persist({ ...content, latest: [item, ...content.latest] });
    }

    setTitle("");
    setExcerpt("");
    setDate("");
    setCategory("");
  };

  const deleteLatest = (id: string) => {
    persist({ ...content, latest: content.latest.filter((item) => item.id !== id) });
  };

  const deletePress = (index: number) => {
    persist({ ...content, press: content.press.filter((_, i) => i !== index) });
  };

  const restoreDefaults = () => {
    resetNewsContent();
    setContent(defaultNewsContent);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-narrow px-6 lg:px-12 max-w-xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
              <p className="text-sm text-muted-foreground mb-6">This page is restricted to admin users.</p>

              <form onSubmit={login} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                  required
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold hover:brightness-110 transition-all"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container-narrow px-6 lg:px-12 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-2">Admin</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">News & Blog Manager</h1>
              <p className="text-sm text-muted-foreground mt-2">Add and publish featured stories, latest updates, and press items without code.</p>
            </div>
            <button
              onClick={logout}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-5">Create New Post</h2>
            <form onSubmit={addItem} className="space-y-4">
              <select
                value={section}
                onChange={(e) => setSection(e.target.value as SectionType)}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
              >
                <option value="featured">Featured Story</option>
                <option value="latest">Latest News</option>
                <option value="press">Press Release Line</option>
              </select>

              {section === "press" ? (
                <input
                  type="text"
                  value={pressLine}
                  onChange={(e) => setPressLine(e.target.value)}
                  placeholder="Press headline"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                  required
                />
              ) : (
                <>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                    required
                  />
                  <textarea
                    rows={4}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Summary / excerpt"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Date (e.g. February 2026)"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                      required
                    />
                    {section === "latest" && (
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category (e.g. Sustainability)"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                      />
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                className="rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-110 transition-all"
              >
                Publish
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-3">Featured Story</h3>
              <p className="font-medium text-foreground">{content.featured.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{content.featured.date}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-3">Press Releases</h3>
              <ul className="space-y-2">
                {content.press.map((headline, index) => (
                  <li key={`${headline}-${index}`} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-foreground">{headline}</span>
                    <button
                      onClick={() => deletePress(index)}
                      className="text-destructive text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-bold text-foreground mb-4">Latest News</h3>
            <div className="space-y-4">
              {content.latest.map((item) => (
                <div key={item.id} className="rounded-lg border border-border p-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">{item.category}</p>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                  </div>
                  <button
                    onClick={() => deleteLatest(item.id)}
                    className="text-destructive text-xs font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={restoreDefaults}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              Reset to defaults
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
