import { useState } from 'react'
import { toolsData, categoryMeta } from './data/toolsData'

const categories = Object.keys(categoryMeta)

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-4 h-4 ${rating >= star ? 'text-yellow-400' : rating >= star - 0.5 ? 'text-yellow-300' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

function FitBar({ score }) {
  const color = score >= 90 ? 'bg-teal-500' : score >= 75 ? 'bg-blue-500' : 'bg-gray-400'
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Side Hustle Fit</span>
        <span className="font-semibold text-gray-700">{score}/100</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

function ToolCard({ tool }) {
  const meta = categoryMeta[tool.category]
  return (
    <div className={`relative bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow flex flex-col ${tool.is_top_pick ? 'border-teal-400 ring-1 ring-teal-300' : 'border-gray-200'}`}>
      {tool.is_top_pick && (
        <div className="absolute -top-3 left-4">
          <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            TOP PICK
          </span>
        </div>
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2 mt-1">
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{tool.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{meta.emoji} {meta.label}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {tool.has_free_tier && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Free tier</span>
            )}
            <span className="text-sm font-semibold text-gray-700">{tool.price_starting_at}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{tool.tagline}</p>

        <StarRating rating={tool.overall_rating} />
        <FitBar score={tool.fit_score} />

        <div className="space-y-1">
          {tool.pros.slice(0, 3).map((pro) => (
            <div key={pro} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {pro}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-2">
          <a
            href={tool.affiliate_url}
            className="block w-full text-center bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            Try {tool.name} →
          </a>
        </div>
      </div>
    </div>
  )
}

function CategorySection({ category, tools, isVisible }) {
  if (!isVisible) return null
  const meta = categoryMeta[category]
  const topPick = tools.find((t) => t.is_top_pick)
  const rest = tools.filter((t) => !t.is_top_pick)
  const sorted = topPick ? [topPick, ...rest] : tools

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">{meta.emoji}</span>
        <h2 className="text-xl font-bold text-gray-900">{meta.label}</h2>
        <span className="text-sm text-gray-400 ml-1">({tools.length} tools)</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filteredTools = toolsData.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    const q = search.toLowerCase()
    const matchesSearch = !q || tool.name.toLowerCase().includes(q) || tool.tagline.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const visibleCategories = activeCategory === 'all'
    ? categories
    : [activeCategory]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-extrabold text-gray-900 text-lg tracking-tight">SideHustleTest</span>
          </div>
          <p className="hidden sm:block text-sm text-gray-500">The best tools for every side hustle</p>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Find the best tools for your side hustle
          </h1>
          <p className="text-teal-100 text-lg mb-8">
            {toolsData.length} tools across {categories.length} categories — ranked by real side-hustle fit.
          </p>
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm shadow-lg outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[57px] z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              All
            </button>
            {categories.map((cat) => {
              const meta = categoryMeta[cat]
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {meta.emoji} {meta.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No tools found for "{search}"</p>
          </div>
        ) : (
          visibleCategories.map((cat) => {
            const tools = filteredTools.filter((t) => t.category === cat)
            return (
              <CategorySection
                key={cat}
                category={cat}
                tools={tools}
                isVisible={tools.length > 0}
              />
            )
          })
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-400">
          <p>© 2025 SideHustleTest · Tools ranked by side-hustle fit, not commission.</p>
          <p className="mt-1">Some links are affiliate links. We only recommend tools we'd actually use.</p>
        </div>
      </footer>
    </div>
  )
}
