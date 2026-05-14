import { Layout } from "@/components/layout/Layout";
import { useTitle } from "@/hooks/use-title";
import { motion } from "framer-motion";
import { Link, useLocation, useSearch } from "wouter";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import {
  getPosts,
  savePost,
  deletePost,
  generateSlug,
  estimateReadingTime,
  BlogPost,
  CATEGORIES,
  COVER_COLORS,
} from "@/lib/blog-store";
import {
  AdminGate,
  AdminLogoutButton,
} from "@/components/blog/AdminGate";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  FileText,
  PenLine,
  CheckCircle,
  AlertCircle,
  Image,
  Link2,
} from "lucide-react";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(1, "Select a category"),
  author: z.string().min(2, "Author name required"),
  published: z.boolean(),
  coverColor: z.string(),
  imageUrl: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-300 mb-1.5">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" /> {message}
    </p>
  );
}

function BlogWriteEditor() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const editId = params.get("edit");

  const existingPost = editId ? getPosts().find((p) => p.id === editId) : undefined;
  const isEditing = !!existingPost;

  useTitle(
    isEditing ? "Edit Post | TriTech Forge" : "Write a Post | TriTech Forge",
    "Blog post editor — TriTech Forge Admin"
  );

  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [slugValue, setSlugValue] = useState(existingPost?.slug ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [imagePreviewError, setImagePreviewError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: existingPost?.title ?? "",
      excerpt: existingPost?.excerpt ?? "",
      content: existingPost?.content ?? "",
      category: existingPost?.category ?? CATEGORIES[0],
      author: existingPost?.author ?? "TriTech Forge Team",
      published: existingPost?.published ?? false,
      coverColor: existingPost?.coverColor ?? COVER_COLORS[0],
      imageUrl: existingPost?.imageUrl ?? "",
    },
  });

  const watchedTitle = watch("title");
  const watchedContent = watch("content");
  const watchedColor = watch("coverColor");
  const watchedPublished = watch("published");
  const watchedImageUrl = watch("imageUrl");

  useEffect(() => {
    if (!isEditing && watchedTitle) {
      setSlugValue(generateSlug(watchedTitle));
    }
  }, [watchedTitle, isEditing]);

  useEffect(() => {
    const words = watchedContent?.trim().split(/\s+/).filter(Boolean).length ?? 0;
    setWordCount(words);
  }, [watchedContent]);

  useEffect(() => {
    setImagePreviewError(false);
  }, [watchedImageUrl]);

  function onSubmit(data: FormData) {
    try {
      const post: BlogPost = {
        id: existingPost?.id ?? crypto.randomUUID(),
        slug: slugValue || generateSlug(data.title),
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        author: data.author,
        published: data.published,
        coverColor: data.coverColor,
        imageUrl: data.imageUrl?.trim() || undefined,
        publishedAt: existingPost?.publishedAt ?? new Date().toISOString().split("T")[0],
        readingTime: estimateReadingTime(data.content),
      };
      savePost(post);
      setSaveStatus("saved");
      setTimeout(() => {
        setLocation(`/blog/${post.slug}`);
      }, 800);
    } catch {
      setSaveStatus("error");
    }
  }

  function handleDelete() {
    if (!existingPost) return;
    if (window.confirm("Delete this post permanently?")) {
      deletePost(existingPost.id);
      setLocation("/blog");
    }
  }

  return (
    <Layout>
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                data-testid="link-back-to-blog"
              >
                <ArrowLeft className="w-4 h-4" />
                Blog
              </Link>
              <span className="text-gray-700">/</span>
              <span className="text-sm text-gray-300 flex items-center gap-1.5">
                <PenLine className="w-4 h-4 text-primary" />
                {isEditing ? "Edit Post" : "New Post"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FileText className="w-3.5 h-3.5" />
                {wordCount} words · ~{estimateReadingTime(watchedContent ?? "")} min read
              </div>
              <AdminLogoutButton />
            </div>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main editor */}
              <div className="lg:col-span-2 space-y-5">
                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                  <Label>Post Title</Label>
                  <input
                    {...register("title")}
                    placeholder="Write a compelling title..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-lg font-semibold"
                    data-testid="input-blog-title"
                  />
                  <FieldError message={errors.title?.message} />
                  {slugValue && (
                    <p className="mt-1.5 text-xs text-gray-600 font-mono">/blog/{slugValue}</p>
                  )}
                </motion.div>

                {/* Excerpt */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Label>Excerpt / Summary</Label>
                  <textarea
                    {...register("excerpt")}
                    rows={3}
                    placeholder="A short, punchy description that hooks the reader..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    data-testid="textarea-blog-excerpt"
                  />
                  <FieldError message={errors.excerpt?.message} />
                </motion.div>

                {/* Content */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label>Content</Label>
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                      data-testid="button-toggle-preview"
                    >
                      {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showPreview ? "Hide Preview" : "Preview"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Use **bold text** for emphasis. Use ## for section headings. Use - for bullet lists.
                  </p>

                  {showPreview ? (
                    <div className="min-h-64 p-5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 leading-relaxed">
                      {watchedContent
                        ? watchedContent.split("\n").map((line, i) => {
                            if (line.startsWith("## "))
                              return <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.slice(3)}</h2>;
                            if (line.startsWith("**") && line.endsWith("**") && line.length > 4)
                              return <p key={i} className="font-semibold text-white my-2">{line.slice(2, -2)}</p>;
                            if (line.startsWith("- "))
                              return <li key={i} className="ml-4 text-gray-300">{line.slice(2)}</li>;
                            if (!line.trim())
                              return <br key={i} />;
                            return <p key={i} className="my-2">{line}</p>;
                          })
                        : <p className="text-gray-600 italic">Nothing to preview yet...</p>}
                    </div>
                  ) : (
                    <textarea
                      {...register("content")}
                      rows={22}
                      placeholder={`Write your article here...\n\nUse ## for section headings\nUse **text** for bold\nUse - for bullet points\n\nExample:\n\n## Why AI Receptionists Work\n\nEvery missed call is a missed opportunity...\n\n- Instant response time\n- 24/7 availability\n- **Zero missed calls**`}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-y font-mono text-sm leading-relaxed"
                      data-testid="textarea-blog-content"
                    />
                  )}
                  <FieldError message={errors.content?.message} />
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* Publish controls */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4"
                >
                  <h3 className="text-sm font-semibold text-white">Publish Settings</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Status</span>
                    <button
                      type="button"
                      onClick={() => setValue("published", !watchedPublished, { shouldDirty: true })}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        watchedPublished
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                      data-testid="button-toggle-published"
                    >
                      <span className={`w-2 h-2 rounded-full ${watchedPublished ? "bg-green-400" : "bg-yellow-400"}`} />
                      {watchedPublished ? "Published" : "Draft"}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                      saveStatus === "saved"
                        ? "bg-green-500 text-white"
                        : saveStatus === "error"
                        ? "bg-red-500 text-white"
                        : "bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                    }`}
                    data-testid="button-save-post"
                  >
                    {saveStatus === "saved" ? (
                      <><CheckCircle className="w-4 h-4" /> Saved!</>
                    ) : saveStatus === "error" ? (
                      <><AlertCircle className="w-4 h-4" /> Error</>
                    ) : (
                      <><Save className="w-4 h-4" /> {isEditing ? "Save Changes" : "Publish Post"}</>
                    )}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all"
                      data-testid="button-delete-post"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Post
                    </button>
                  )}
                </motion.div>

                {/* Cover Image */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3"
                >
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Image className="w-4 h-4 text-primary" />
                    Cover Image
                  </h3>
                  <p className="text-xs text-gray-500">Paste an image URL (Unsplash, your CDN, etc.)</p>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      {...register("imageUrl")}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all font-mono"
                      data-testid="input-blog-image-url"
                    />
                  </div>

                  {/* Live preview */}
                  {watchedImageUrl && !imagePreviewError ? (
                    <div className="relative rounded-lg overflow-hidden aspect-video bg-black/20">
                      <img
                        src={watchedImageUrl}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={() => setImagePreviewError(true)}
                      />
                      <div className="absolute inset-0 border border-white/10 rounded-lg" />
                    </div>
                  ) : watchedImageUrl && imagePreviewError ? (
                    <div className="rounded-lg aspect-video bg-black/20 border border-red-500/20 flex items-center justify-center">
                      <p className="text-xs text-red-400">Could not load image — check the URL</p>
                    </div>
                  ) : (
                    <div className={`rounded-lg aspect-video bg-gradient-to-br ${watchedColor} opacity-60 flex items-center justify-center`}>
                      <p className="text-xs text-white/50">No image — gradient will be used</p>
                    </div>
                  )}
                </motion.div>

                {/* Category */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3"
                >
                  <h3 className="text-sm font-semibold text-white">Category</h3>
                  <select
                    {...register("category")}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    data-testid="select-blog-category"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-gray-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.category?.message} />
                </motion.div>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3"
                >
                  <h3 className="text-sm font-semibold text-white">Author</h3>
                  <input
                    {...register("author")}
                    placeholder="Author name"
                    className="w-full px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                    data-testid="input-blog-author"
                  />
                  <FieldError message={errors.author?.message} />
                </motion.div>

                {/* Cover color (fallback when no image) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3"
                >
                  <h3 className="text-sm font-semibold text-white">Fallback Color</h3>
                  <p className="text-xs text-gray-500">Used when no cover image is set.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {COVER_COLORS.map((color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setValue("coverColor", color, { shouldDirty: true })}
                        className={`h-10 rounded-lg bg-gradient-to-br ${color} transition-all ${
                          watchedColor === color
                            ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-95"
                            : "hover:scale-105"
                        }`}
                        data-testid={`button-color-${color}`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Slug */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">URL Slug</h3>
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setSlugValue(generateSlug(watchedTitle))}
                        className="text-xs text-gray-500 hover:text-primary flex items-center gap-1"
                        data-testid="button-regenerate-slug"
                      >
                        <RefreshCw className="w-3 h-3" /> Reset
                      </button>
                    )}
                  </div>
                  <input
                    value={slugValue}
                    onChange={(e) => setSlugValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                    placeholder="url-slug"
                    className="w-full px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-sm font-mono placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                    data-testid="input-blog-slug"
                  />
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
}

export default function BlogWrite() {
  return (
    <AdminGate>
      <BlogWriteEditor />
    </AdminGate>
  );
}
