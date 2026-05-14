import { Layout } from "@/components/layout/Layout";
import { useTitle } from "@/hooks/use-title";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { getPostBySlugAsync } from "@/lib/blog-store";
import { Calendar, Clock, ArrowLeft, PenLine, Tag, Share2, Check } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import type { BlogPost } from "@/lib/blog-store";
import { useIsAdmin } from "@/components/blog/AdminGate";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-white mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-3xl font-bold text-white mt-10 mb-4">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(
        <p key={key++} className="font-semibold text-white my-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      i--;
      elements.push(
        <ul key={key++} className="my-4 space-y-2">
          {items.map((item, idx) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);
            return (
              <li key={idx} className="flex items-start gap-3 text-gray-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>
                  {parts.map((part, pi) =>
                    pi % 2 === 1 ? (
                      <strong key={pi} className="text-white font-semibold">{part}</strong>
                    ) : (
                      part
                    )
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={key++} className="text-gray-300 leading-relaxed my-2">
          {parts.map((part, pi) =>
            pi % 2 === 1 ? (
              <strong key={pi} className="text-white font-semibold">{part}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
  }

  return elements;
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const isAdmin = useIsAdmin();

  useEffect(() => {
    getPostBySlugAsync(params.slug).then(p => {
      setPost(p);
      setLoading(false);
    });
  }, [params.slug]);

  useTitle(
    post ? `${post.title} | TriTech Forge Blog` : "Post Not Found | TriTech Forge",
    post ? post.excerpt : "Article not found."
  );

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <Layout>
        <main className="min-h-screen flex items-center justify-center pt-24">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <main className="min-h-screen flex items-center justify-center px-4 pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">This article doesn't exist or has been removed.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  const hasImage = post.imageUrl && !imgError;

  return (
    <Layout>
      <main className="min-h-screen pt-24 pb-24">
        {/* Cover */}
        <div className={`relative h-64 md:h-80 overflow-hidden ${!hasImage ? `bg-gradient-to-br ${post.coverColor}` : "bg-black"}`}>
          {hasImage && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto max-w-3xl px-4 pb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-black/50 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 mb-4">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-4 mt-8">
          {/* Meta bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8"
          >
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="font-medium text-gray-300">{post.author}</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                data-testid="button-share-post"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Share"}
              </button>
              {/* Only show Edit button to admins */}
              {isAdmin && (
                <Link
                  href={`/blog/write?edit=${post.id}`}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all"
                  data-testid="link-edit-post"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  Edit
                </Link>
              )}
            </div>
          </motion.div>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 leading-relaxed mb-8 font-medium border-l-4 border-primary/50 pl-5 italic"
          >
            {post.excerpt}
          </motion.p>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {renderContent(post.content)}
          </motion.div>

          {/* Footer nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between"
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
              data-testid="link-back-to-blog"
            >
              <ArrowLeft className="w-4 h-4" />
              All Articles
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
              data-testid="link-cta-contact"
            >
              Book a Demo
            </Link>
          </motion.div>
        </div>
      </main>
    </Layout>
  );
}
