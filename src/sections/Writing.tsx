import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site, Post } from "@/config/site";
import { ArrowUpRight } from "lucide-react";
import { MediumIcon } from "@/components/icons";

export function Writing() {
  const [posts, setPosts] = useState<Post[]>(site.writing || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const [mediumRes, devtoRes] = await Promise.all([
          fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bhadramohit.cloud").catch(() => null),
          fetch("https://dev.to/api/articles?username=bhadramohit").catch(() => null)
        ]);

        let allPosts: any[] = [];

        if (mediumRes && mediumRes.ok) {
          const mediumData = await mediumRes.json();
          if (mediumData.status === "ok" && mediumData.items) {
            const mediumPosts = mediumData.items.map((item: any) => {
              const textContent = item.content.replace(/<[^>]+>/g, '');
              const wordCount = textContent.split(/\s+/).length;
              const readingTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read";
              
              let summary = item.description.replace(/<[^>]+>/g, '').trim();
              if (summary.length > 150) {
                summary = summary.substring(0, 150) + "...";
              }
              
              const dateObj = new Date(item.pubDate);
              const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              
              return {
                title: item.title,
                summary: summary,
                date: dateStr,
                timestamp: dateObj.getTime(),
                url: item.link,
                readingTime: readingTime,
              };
            });
            allPosts = [...allPosts, ...mediumPosts];
          }
        }

        if (devtoRes && devtoRes.ok) {
          const devtoData = await devtoRes.json();
          if (Array.isArray(devtoData)) {
            const devtoPosts = devtoData.map((item: any) => {
              let summary = (item.description || "").trim();
              if (summary.length > 150) {
                summary = summary.substring(0, 150) + "...";
              }
              
              const dateObj = new Date(item.published_timestamp);
              const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              
              return {
                title: item.title,
                summary: summary,
                date: dateStr,
                timestamp: dateObj.getTime(),
                url: item.url,
                readingTime: item.reading_time_minutes ? `${item.reading_time_minutes} min read` : undefined,
              };
            });
            allPosts = [...allPosts, ...devtoPosts];
          }
        }

        allPosts.sort((a, b) => b.timestamp - a.timestamp);
        
        // Remove the internal timestamp property to match Post type and slice to max 4
        const latestPosts: Post[] = allPosts.slice(0, 4).map(({ timestamp, ...rest }) => rest);

        if (latestPosts.length > 0) {
          setPosts(latestPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);

  if (!loading && (!posts || posts.length === 0)) return null;

  return (
    <div id="writing">
      <SectionHeader
        title="Writing"
        aside={
          <a
            href={(site.socials as any).medium}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--soft)] hover:text-[var(--fg)] transition-colors group/header"
          >
            <MediumIcon className="size-3.5" />
            <span className="hidden sm:inline">medium.com/@bhadramohit</span>
            <ArrowUpRight className="size-3 text-[var(--soft)] group-hover/header:translate-x-0.5 group-hover/header:-translate-y-0.5 transition-transform" />
          </a>
        }
      />
      <Shell>
        <div className="divide-y divide-[var(--line)]">
          {posts.map((post, i) => (
            <motion.a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 px-6 py-5 sm:px-8 hover:bg-[var(--hover)] transition-colors duration-200 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6 flex-1 min-w-0">
                <span className="font-mono text-[11px] text-[var(--soft)] w-20 shrink-0">
                  {post.date}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-[18px] text-[var(--fg)] group-hover:text-[var(--muted)] transition-colors font-medium leading-snug flex items-center gap-1.5">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-[var(--muted)] leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0 font-mono text-[11px] text-[var(--soft)] mt-2 sm:mt-0">
                {post.readingTime && <span>{post.readingTime}</span>}
                <ArrowUpRight className="size-3.5 text-[var(--soft)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
              </div>
            </motion.a>
          ))}
        </div>
      </Shell>
    </div>
  );
}

export default Writing;
