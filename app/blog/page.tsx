import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/shared/section-heading"
import { blogPosts } from "@/lib/data/blog-posts"

export const metadata: Metadata = {
  title: "Journal | The Aurelian",
  description: "Stories, travel tips, and insights from The Aurelian. Discover Paris and luxury living.",
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-80">
        <Image
          src="https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1502602898657-3e91760cbb34_w1800.jpg"
          alt="Paris skyline"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">The Journal</h1>
          <p className="mt-2 font-sans text-sm text-cream/70">Stories, travel guides, and insider tips</p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading title="Latest from Our Journal" subtitle="Stories & Insights" />

          {/* Featured Post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group mt-12 block">
              <div className="flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card lg:flex-row">
                <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:w-1/2">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <Badge className="absolute left-4 top-4 bg-gold text-charcoal hover:bg-gold-dark font-sans text-[10px] uppercase tracking-wider">
                    Featured
                  </Badge>
                </div>
                <div className="flex w-full flex-col justify-center gap-4 p-6 lg:w-1/2 lg:p-10">
                  <Badge variant="outline" className="w-fit font-sans text-[10px] uppercase tracking-wider">
                    {featured.category}
                  </Badge>
                  <h3 className="font-serif text-2xl text-foreground transition-colors group-hover:text-gold md:text-3xl text-balance">
                    {featured.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-sans text-xs">
                      <CalendarDays className="size-3" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-sans text-xs">
                      <Clock className="size-3" />
                      {featured.readTime} min read
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-gold">
                    Read Article
                    <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Posts Grid */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <Badge variant="outline" className="w-fit font-sans text-[10px] uppercase tracking-wider">
                      {post.category}
                    </Badge>
                    <h3 className="font-serif text-lg text-foreground transition-colors group-hover:text-gold text-balance">
                      {post.title}
                    </h3>
                    <p className="flex-1 font-sans text-xs leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="font-sans text-[10px]">{post.date}</span>
                      <span className="font-sans text-[10px]">{post.readTime} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
