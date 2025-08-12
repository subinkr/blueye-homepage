import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
      </main>
    </div>
  )
}
