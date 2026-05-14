import { Layout } from "@/components/layout/Layout";
import { useTitle } from "@/hooks/use-title";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useMemo, useEffect } from "react";
import { getPublishedPostsAsync, BlogPost } from "@/lib/blog-store";
import { Calendar, Clock, Tag, ArrowRight, PenLine, Search, ImageOff } from "lucide-react";
import { useIsAdmin } from "@/components/blog/AdminGate";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
      data-testid={`blog-card-${post.id}`}
    >
      {/* Cover image or gradient */}
      <div className="h-44 relative overflow-hidden bg-black/20">
        {post.imageUrl && !imgError ? (
          <>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${post.coverColor} flex items-center justify-center`}>
            <div className="absolute inset-0 bg-black/20" />
            {(!post.imageUrl || imgError) && (
              <div className="relative z-10 opacity-20">
                <ImageOff className="w-10 h-10 text-white" />
              </div>
            )}
          </div>
        )}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-xs font-semibold uppercase tracking-wider bg-black/50 text-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20">
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h2 className="text-base font-bold text-white leading-snug mb-2.5 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min read
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
            data-testid={`blog-read-more-${post.id}`}
          >
            Read <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  useTitle("Blog | TriTech Forge", "Insights, case studies, and guides on AI voice automation for trade and home service businesses.");

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = useIsAdmin();

  useEffect(() => {
    getPublishedPostsAsync().then(posts => {
      setAllPosts(posts);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return allPosts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allPosts, search, activeCategory]);

  const usedCategories = ["All", ...Array.from(new Set(allPosts.map((p) => p.category)))];

  return (
    <Layout>
      <main className="min-h-screen pt-24 pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 px-4">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          </div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6"
            >
              <Tag className="w-3.5 h-3.5" />
              TriTech Forge Blog
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight"
            >
              Insights for the{" "}
              <span className="text-gradient">Modern Business</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Case studies, ROI guides, and practical insights on AI voice automation for trade and home service businesses across the Gulf & USA.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-lg mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                data-testid="input-blog-search"
              />
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4">
          {/* Category filters + Admin write button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-10 items-center"
          >
            {usedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:border-primary/30 hover:text-white"
                }`}
                data-testid={`filter-category-${cat}`}
              >
                {cat}
              </button>
            ))}

            {/* Write button — always visible, admin gate handles auth */}
            <Link
              href="/blog/write"
              className="ml-auto flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 transition-all"
              data-testid="link-blog-write"
            >
              <PenLine className="w-3.5 h-3.5" />
              {isAdmin ? "Write a Post" : "Team Login"}
            </Link>
          </motion.div>

          {/* Posts grid */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-gray-500"
            >
              <PenLine className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No articles found.</p>
            </motion.div>
          )}
        </div>
      </main>
    </Layout>
  );
}
