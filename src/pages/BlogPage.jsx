import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Hash, MessageCircle, Calendar, Clock } from 'lucide-react';
import { getAllBlogPosts, getBlogPostBySlug } from '../data/blogPosts';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import SEO from '../components/SEO';

const CATEGORY_COLORS = {
  1: { from: '#6366f1', to: '#8b5cf6' },
  3: { from: '#2962ff', to: '#0ea5e9' },
  4: { from: '#e11d48', to: '#f97316' },
  5: { from: '#059669', to: '#10b981' },
  6: { from: '#7c3aed', to: '#a855f7' },
  7: { from: '#1e40af', to: '#3b82f6' },
};

const CATEGORY_NAMES = {
  1: 'Sin categoría',
  3: 'Marketing Digital',
  4: 'Redes Sociales',
  5: 'SEO',
  6: 'Content Marketing',
  7: 'Tecnología',
};

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatCategory(categoryId) {
  return CATEGORY_NAMES[categoryId] || 'General';
}

function FadeIn({ children, delay = 0, y = 30, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PostCard({ post, index, onRead }) {
  const title = post.title?.rendered || 'Sin título';
  const excerpt = stripHtml(post.excerpt?.rendered || '');
  const date = formatDate(post.date);
  const categoryId = post.categories?.[0] || 1;
  const categoryName = formatCategory(categoryId);
  const colors = CATEGORY_COLORS[categoryId] || CATEGORY_COLORS[1];

  return (
    <FadeIn delay={index * 0.05} className="h-full">
      <a
        href={`#/articulo/${post.slug}`}
        onClick={(e) => { e.preventDefault(); onRead(post.slug); }}
        className="group block h-full cursor-pointer"
      >
        <div
          className="relative h-full rounded-xl border border-white/[0.05] overflow-hidden transition-all duration-300 flex flex-col bg-[#111116] hover:bg-[#16161D] hover:border-cyan-500/30 shadow-sm"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-400" />

          {post.image && (
            <div className="relative h-40 overflow-hidden">
              <img
                src={post.image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 45%, #111116 100%)` }} />
            </div>
          )}

          <div className="flex-1 flex flex-col p-5 sm:p-6 mt-1">
            <div className="mb-3">
              <span
                className="inline-block text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border border-cyan-400/20 text-cyan-400 bg-cyan-400/5"
              >
                {categoryName}
              </span>
            </div>

            <h3 className="text-[16px] sm:text-[18px] font-bold text-neutral-100 leading-tight mb-3 group-hover:text-cyan-400 transition-colors duration-300" style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
              {title}
            </h3>

            <p className="text-[13px] text-neutral-400 leading-relaxed mb-5 flex-1" style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
              {excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                <Calendar size={12} className="opacity-70" />
                {date}
              </div>
              <span
                className="flex items-center gap-1.5 text-[12px] font-medium transition-all duration-300 text-neutral-500 group-hover:text-cyan-400"
              >
                Leer
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </FadeIn>
  );
}

function SyncCTA() {
  return (
    <FadeIn delay={0.3} className="mt-16">
      <div
        className="rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden border border-white/[0.06]"
        style={{ background: 'linear-gradient(135deg, rgba(41,98,255,0.08) 0%, rgba(14,165,233,0.04) 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="halo-blue" style={{ top: '-30%', left: '30%', opacity: 0.3 }} />
        </div>
        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">¿Necesitas ayuda con tu estrategia digital?</h3>
          <p className="text-[14px] text-neutral-400 max-w-lg mx-auto mb-6">
            Te ayudamos a crear contenido que conecte con tu audiencia sin poner en riesgo tu reputación.
          </p>
          <SlideButton
            label="HABLEMOS"
            hoverLabel="Escríbenos ahora"
            href="https://wa.me/573115893220"
            target="_blank"
            rel="noopener noreferrer"
            icon={MessageCircle}
            width={220}
          />
        </div>
      </div>
    </FadeIn>
  );
}

function ArticleReader({ post, onBack }) {
  const title = post.title?.rendered || 'Sin título';
  const categoryName = formatCategory(post.categories?.[0] || 1);
  const colors = CATEGORY_COLORS[post.categories?.[0]] || CATEGORY_COLORS[1];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [post]);

  return (
    <section className="relative z-20 px-5 sm:px-8 md:px-10 pt-28 md:pt-36 pb-24 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[12px] tracking-widest uppercase font-semibold text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Volver al blog
        </button>

        <span
          className="inline-block text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded mb-4"
          style={{ color: colors.from, border: `1px solid ${colors.from}33`, background: `${colors.from}0d` }}
        >
          {categoryName}
        </span>

        <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-4">{title}</h1>

        <div className="flex items-center gap-2 text-[12px] text-neutral-500 mb-8">
          <Clock size={13} className="opacity-70" />
          <span>{formatDate(post.date)}</span>
        </div>

        {post.image && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-white/[0.06]">
            <img src={post.image} alt={title} className="w-full object-cover max-h-80" />
          </div>
        )}

        <article
          className="prose prose-invert prose-lg max-w-none article-prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
          <span className="text-[12px] text-neutral-500 flex items-center gap-2">
            <Hash size={13} />
            {categoryName}
          </span>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] tracking-widest font-bold text-white border border-[#2962ff] transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #3a74ff 0%, #1532cb 100%)' }}
          >
            <ArrowLeft size={13} />
            Volver al blog
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default function BlogPage() {
  const [posts] = useState(() => getAllBlogPosts());
  const [activeSlug, setActiveSlug] = useState(() => {
    const match = window.location.hash.match(/^#\/articulo\/([a-zA-Z0-9-]+)/);
    return match ? match[1] : null;
  });

  const openArticle = useCallback((slug) => {
    window.location.hash = `/articulo/${slug}`;
    setActiveSlug(slug);
  }, []);

  const closeArticle = useCallback(() => {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setActiveSlug(null);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const match = window.location.hash.match(/^#\/articulo\/([a-zA-Z0-9-]+)/);
      const slug = match ? match[1] : null;
      const post = slug ? getBlogPostBySlug(slug) : null;
      setActiveSlug(post ? slug : null);
      if (!post) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const activePost = getBlogPostBySlug(activeSlug);

  return (
    <main className="relative w-full min-h-screen text-[#D7E2EA] font-sans" style={{ backgroundColor: '#0B0B0F' }}>
      {activePost ? (
        <>
          <SEO
            title={`${activePost.title?.rendered || 'Artículo'} | Blog`}
            description={stripHtml(activePost.excerpt?.rendered || '')}
            path={`/blog/${activePost.slug}`}
          />
          <Navbar activePage="blog" />
          <ArticleReader post={activePost} onBack={closeArticle} />
        </>
      ) : (
        <>
          <SEO title="Blog y Novedades" description="Últimas noticias y artículos sobre automatización, IA y marketing B2B." path="/blog" />
          <Navbar activePage="blog" />

          <section className="relative z-20 px-5 sm:px-8 md:px-10 pt-28 md:pt-36 pb-24 max-w-6xl mx-auto">
            <FadeIn>
              <div className="mb-12 text-center">
                <span className="inline-block text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border border-cyan-400/20 text-cyan-400 bg-cyan-400/5 mb-4">
                  Profundización
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
                  Blog y Novedades
                </h1>
                <p className="text-[15px] text-neutral-400 max-w-2xl mx-auto">
                  Artículos completos sobre automatización, IA y marketing B2B. Lectura autónoma, sin dependencias externas.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} onRead={openArticle} />
              ))}
            </div>

            <SyncCTA />
          </section>
        </>
      )}
      <SiteFooter />
    </main>
  );
}