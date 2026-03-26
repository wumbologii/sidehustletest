import { useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import { questions, calculateResults } from './data/quizData'

const TOTAL_STEPS = questions.length

// ─── Shared Nav ───────────────────────────────────────────────────────────────
function Nav({ right }) {
  return (
    <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">⚡</span>
          <span className="font-extrabold text-gray-900 text-xl tracking-tight">SideHustleTest</span>
        </Link>
        {right}
      </div>
    </header>
  )
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 text-white px-4 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            100% Free · No Email Required
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            Find Your Perfect<br />Side Hustle<br />in 3 Minutes
          </h1>
          <p className="text-teal-100 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
            Answer 9 questions and get matched to the best side hustles for your skills, time, and goals.
          </p>
          <button
            onClick={() => navigate('/quiz')}
            className="bg-white text-teal-700 font-bold text-lg px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            Take the Free Quiz →
          </button>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-10 flex-wrap">
            {[
              { icon: '📋', label: '9-Question Quiz' },
              { icon: '🏆', label: '20 Side Hustles Ranked' },
              { icon: '🆓', label: '100% Free' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2 text-teal-100 text-sm font-semibold">
                <span className="text-xl">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-500 mb-14 max-w-lg mx-auto">
            Three simple steps to find the side hustle that fits your life.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                emoji: '📝',
                title: 'Answer 9 Questions',
                desc: 'Tell us about your hobbies, skills, how much time and money you can invest, and what you want to avoid.',
              },
              {
                step: '2',
                emoji: '⚙️',
                title: 'We Score 20 Hustles',
                desc: 'Our algorithm matches your answers against 20 different side hustles and scores each one based on fit.',
              },
              {
                step: '3',
                emoji: '🎯',
                title: 'Get Your Matches',
                desc: 'See your top 5 personalized results with earnings potential, startup costs, and exact steps to begin.',
              },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why section */}
      <div className="bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">
            Stop guessing. Start earning.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: '🎯', title: 'Personalized Match', desc: 'We score 20 different side hustles based on your unique answers — not a generic list.' },
              { emoji: '💡', title: 'Real Actionable Advice', desc: 'Each result shows earnings potential, startup cost, and exactly how to get your first client or sale.' },
              { emoji: '⚡', title: 'Instant Results', desc: '9 questions. Done in 3 minutes. No email required, no fluff, no upsells.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-teal-600 py-14 px-4 text-center">
        <h2 className="text-white text-2xl sm:text-3xl font-extrabold mb-3">Ready to find your side hustle?</h2>
        <p className="text-teal-100 mb-8">It takes 3 minutes. Results are instant.</p>
        <button
          onClick={() => navigate('/quiz')}
          className="bg-white text-teal-700 font-bold text-lg px-10 py-4 rounded-2xl hover:bg-teal-50 transition-colors shadow-lg"
        >
          Take the Free Quiz →
        </button>
      </div>

      <footer className="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        <p>© 2025 SideHustleTest.com · Built to help you earn more</p>
      </footer>
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
      <div
        className="h-full bg-teal-500 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ─── Quiz Step ────────────────────────────────────────────────────────────────
function QuizStep({ question, value, onChange, onNext, onBack, stepIndex, total }) {
  const isMulti = question.type === 'multi-select'
  const selected = isMulti ? (value || []) : value

  function toggle(optId) {
    if (isMulti) {
      const cur = selected || []
      onChange(cur.includes(optId) ? cur.filter(x => x !== optId) : [...cur, optId])
    } else {
      onChange(optId)
    }
  }

  const canAdvance = isMulti ? (selected && selected.length > 0) : !!selected

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-xl">⚡</span>
              <span className="font-extrabold text-gray-900 tracking-tight">SideHustleTest</span>
            </Link>
            <span className="text-sm text-gray-400 font-medium">{stepIndex + 1} of {total}</span>
          </div>
          <ProgressBar current={stepIndex + 1} total={total} />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <p className="text-sm font-semibold text-teal-600 mb-2 uppercase tracking-widest">
              Question {stepIndex + 1}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
              {question.question}
            </h2>
            <p className="text-gray-500">{question.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {question.options.map(opt => {
              const isSelected = isMulti ? (selected || []).includes(opt.id) : selected === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => toggle(opt.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-150
                    ${isSelected
                      ? 'border-teal-500 bg-teal-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/40'
                    }`}
                >
                  <span className="text-2xl shrink-0">{opt.emoji}</span>
                  <span className={`font-medium text-sm leading-snug ${isSelected ? 'text-teal-700' : 'text-gray-700'}`}>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <span className="ml-auto shrink-0 text-teal-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex gap-3">
            {stepIndex > 0 && (
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
            )}
            <button
              onClick={onNext}
              disabled={!canAdvance}
              className={`flex-1 py-3 rounded-xl font-bold text-base transition-all duration-150
                ${canAdvance
                  ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              {stepIndex === total - 1 ? 'See My Results →' : 'Next Question →'}
            </button>
          </div>

          {isMulti && (
            <p className="text-center text-xs text-gray-400 mt-3">
              {(selected || []).length} selected — pick as many as you like
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

// ─── Results ──────────────────────────────────────────────────────────────────
function DifficultyBadge({ label }) {
  const color = label.startsWith('Beginner') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{label}</span>
}

function HustleCard({ hustle, rank }) {
  const [expanded, setExpanded] = useState(false)
  const isTop = rank === 1

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden ${isTop ? 'border-teal-400' : 'border-gray-100'}`}>
      {isTop && (
        <div className="bg-teal-500 text-white text-xs font-bold text-center py-1.5 tracking-widest uppercase">
          ⭐ Your Best Match
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{hustle.emoji}</span>
            <div>
              <h3 className="font-extrabold text-gray-900 text-xl leading-tight">{hustle.name}</h3>
              <DifficultyBadge label={hustle.difficulty} />
            </div>
          </div>
          <span className="shrink-0 bg-gray-100 text-gray-500 text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">
            #{rank}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">{hustle.description}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Earnings', value: hustle.earnings, icon: '💵' },
            { label: 'Startup', value: hustle.startup_cost, icon: '🚀' },
            { label: 'Hours/wk', value: hustle.time_per_week, icon: '⏰' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
              <div className="text-lg mb-0.5">{stat.icon}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-xs font-bold text-gray-800 mt-0.5 leading-tight">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 mb-4">
          {hustle.pros.map(pro => (
            <div key={pro} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {pro}
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-sm font-semibold text-teal-600 hover:text-teal-700 py-2 border border-teal-200 rounded-xl hover:bg-teal-50 transition-colors"
        >
          {expanded ? '▲ Hide Action Steps' : '▼ How to Get Started'}
        </button>
        {expanded && (
          <div className="mt-3 bg-teal-50 border border-teal-200 rounded-xl p-4">
            <p className="text-sm text-teal-800 font-semibold mb-1">First steps:</p>
            <p className="text-sm text-teal-700 leading-relaxed">{hustle.get_started}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Results({ results, onRetake }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Nav right={
        <button onClick={onRetake} className="text-sm text-teal-600 font-semibold hover:text-teal-700">
          Retake Quiz
        </button>
      } />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Your Top Side Hustles</h1>
          <p className="text-gray-500 text-lg">
            Based on your answers, here are your 5 personalized matches — ranked best fit first.
          </p>
        </div>

        <div className="space-y-6">
          {results.map((hustle, i) => (
            <HustleCard key={hustle.id} hustle={hustle} rank={i + 1} />
          ))}
        </div>

        <div className="mt-12 bg-teal-600 rounded-2xl p-6 sm:p-8 text-center text-white">
          <h2 className="text-xl font-extrabold mb-2">Not quite right?</h2>
          <p className="text-teal-100 text-sm mb-5">Retake the quiz with different answers to see new results.</p>
          <button
            onClick={onRetake}
            className="bg-white text-teal-700 font-bold px-8 py-3 rounded-xl hover:bg-teal-50 transition-colors"
          >
            Retake the Quiz
          </button>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        <p>© 2025 SideHustleTest.com · Find your best side hustle</p>
      </footer>
    </div>
  )
}

// ─── Quiz Page (manages quiz + results state) ─────────────────────────────────
function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1)
      window.scrollTo(0, 0)
    } else {
      setResults(calculateResults(answers))
      window.scrollTo(0, 0)
    }
  }

  function handleBack() {
    setStep(s => s - 1)
    window.scrollTo(0, 0)
  }

  function handleChange(val) {
    setAnswers(prev => ({ ...prev, [questions[step].id]: val }))
  }

  function handleRetake() {
    setStep(0)
    setAnswers({})
    setResults(null)
    window.scrollTo(0, 0)
  }

  if (results) return <Results results={results} onRetake={handleRetake} />

  return (
    <QuizStep
      question={questions[step]}
      value={answers[questions[step].id]}
      onChange={handleChange}
      onNext={handleNext}
      onBack={handleBack}
      stepIndex={step}
      total={TOTAL_STEPS}
    />
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  )
}
