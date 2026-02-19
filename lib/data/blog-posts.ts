export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image: string
  category: string
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "art-of-parisian-dining",
    title: "The Art of Parisian Dining: A Guide to Culinary Excellence",
    excerpt: "Discover the secrets behind Paris's most celebrated restaurants and how Le Dore continues to set the standard for fine dining.",
    content: "Paris has long been the gastronomic capital of the world...",
    author: "Chef Antoine Beaumont",
    date: "2026-01-15",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    category: "Dining",
    readTime: 6,
  },
  {
    id: "2",
    slug: "wellness-rituals-for-modern-traveler",
    title: "Wellness Rituals for the Modern Traveler",
    excerpt: "How to maintain balance and rejuvenation during your travels, with insights from our spa director.",
    content: "In the fast-paced world of modern travel...",
    author: "Dr. Marie Fontaine",
    date: "2026-01-02",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    category: "Wellness",
    readTime: 5,
  },
  {
    id: "3",
    slug: "hidden-gems-of-paris",
    title: "Hidden Gems of Paris: Beyond the Tourist Trail",
    excerpt: "Our concierge team reveals their favorite secret spots that most visitors never discover.",
    content: "While the Eiffel Tower and Louvre are unmissable...",
    author: "Pierre Dubois",
    date: "2025-12-18",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    category: "Travel",
    readTime: 8,
  },
  {
    id: "4",
    slug: "design-philosophy-behind-aurelian",
    title: "The Design Philosophy Behind The Aurelian",
    excerpt: "A conversation with our interior architect about blending timeless elegance with contemporary comfort.",
    content: "Every space within The Aurelian tells a story...",
    author: "Isabelle Martin",
    date: "2025-12-05",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    category: "Design",
    readTime: 7,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
