import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog-posts"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return { title: "Not Found" }
  return {
    title: `${post.title} | The Kerawi International Hotel Journal`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <main>
      {/* Hero */}
      <section className="relative flex h-72 items-end overflow-hidden bg-charcoal md:h-96">
        <Image src={post.image} alt={post.title} fill className="object-cover opacity-50" priority />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-10 lg:px-8">
          <Badge className="bg-gold text-charcoal hover:bg-gold-dark font-sans text-[10px] uppercase tracking-wider">
            {post.category}
          </Badge>
          <h1 className="mt-3 font-serif text-3xl text-cream md:text-4xl lg:text-5xl text-balance">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-cream/70">
            <span className="flex items-center gap-1.5 font-sans text-xs">
              <User className="size-3" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5 font-sans text-xs">
              <CalendarDays className="size-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 font-sans text-xs">
              <Clock className="size-3" />
              {post.readTime} min read
            </span>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2 font-sans text-xs uppercase tracking-wider text-muted-foreground">
              <ArrowLeft className="size-3" />
              Back to Journal
            </Button>
          </Link>

          <article className="prose-luxury mt-8">
            <p className="font-sans text-base leading-relaxed text-foreground">
              {post.excerpt}
            </p>
            <Separator className="my-8" />
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              {post.content} This is an excerpt from our full article. The complete story is available to our newsletter subscribers and registered guests. We share in-depth travel guides, culinary insights, wellness tips, and exclusive behind-the-scenes content from The Aurelian.
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
              Our team of writers, chefs, and hospitality experts bring decades of experience to every piece. Whether you are planning your first visit to Paris or returning to discover something new, our journal is your companion to the finest experiences the city has to offer.
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
              From the cobblestone streets of Le Marais to the grand boulevards, from hidden patisseries to Michelin-starred dining rooms, we invite you to see Paris through the eyes of those who know it best. Subscribe to our newsletter to never miss a story.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
