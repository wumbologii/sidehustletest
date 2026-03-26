import { useState } from 'react'
import { questions, calculateResults } from './data/quizData'

const TOTAL_STEPS = questions.length

// ─── Landing Page ────────────────────────────────────────────────────────────
function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-extrabold text-gray-900 text-xl tracking-tight">SideHustleTest</span>
        </div>
      </header>

      <div className="flex-1 bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 text-white flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Free 2-minute quiz
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Find Your Perfect<br />Side Hustle
          </h1>
          <p className="text-teal-100 text-lg sm:text-xl mb-10 leading-relaxed">
            Answer 9 quick questions about your hobbies, skills, time, and goals — and we'll match you to the side hustle that actually fits your life.
          </p>
          <button
            onClick={onStart}
            className="bg-white text-teal-700 font-bold text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            Take the Free Quiz →
          </button>
          <p className="text-teal-200 text-sm mt-4">No email required · 2 minutes · Personalized results</p>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">
            Stop guessing. Start earning.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: '🎯', title: 'Personalized Match', desc: 'We score 20 different side hustles based on your unique answers.' },
              { emoji: '💡', title: 'Real Advice', desc: 'Each result includes earnings potential, startup cost, and exactly how to begin.' },
              { emoji: '⚡', title: 'Takes 2 Minutes', desc: '9 questions. Instant results. No fluff, no email required.' },
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-teal-600 py-10 px-4 text-center">
        <p className="text-white text-xl font-bold mb-4">Ready to find your ideal side hustle?</p>
        <button
          onClick={onStart}
          className="bg-white text-teal-700 font-bold px-8 py-3 rounded-xl hover:bg-teal-50 transition-colors"
        >
          Start the Quiz — It's Free
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
      if (cur.includes(optId)) {
        onChange(cur.filter(x => x !== optId))
      } else {
        onChange([...cur, optId])
      }
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
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-extrabold text-gray-900 tracking-tight">SideHustleTest</span>
            </div>
            <span className="text-sm text-gray-400 font-medium">
              {stepIndex + 1} of {total}
            </span>
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
              const isSelected = isMulti
                ? (selected || []).includes(opt.id)
                : selected === opt.id
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
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="font-extrabold text-gray-900 tracking-tight">SideHustleTest</span>
          </div>
          <button
            onClick={onRetake}
            className="text-sm text-teal-600 font-semibold hover:text-teal-700"
          >
            Retake Quiz
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Your Top Side Hustles
          </h1>
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
          <p className="text-teal-100 text-sm mb-5">Retake the quiz with different answers and see how your results change.</p>
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

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState('landing')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  function startQuiz() {
    setStep(0)
    setAnswers({})
    setResults(null)
    setView('quiz')
  }

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1)
      window.scrollTo(0, 0)
    } else {
      const r = calculateResults(answers)
      setResults(r)
      setView('results')
      window.scrollTo(0, 0)
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(s => s - 1)
      window.scrollTo(0, 0)
    }
  }

  function handleChange(val) {
    setAnswers(prev => ({ ...prev, [questions[step].id]: val }))
  }

  if (view === 'landing') return <Landing onStart={startQuiz} />
  if (view === 'results') return <Results results={results} onRetake={startQuiz} />

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
