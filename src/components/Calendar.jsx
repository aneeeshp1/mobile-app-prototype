import { useState } from 'react'
import '../styles/HomePage.css'

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const matrix = []
  let week = []
  // Fill initial blanks
  for (let i = 0; i < firstDay.getDay(); i++) week.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) {
    week.push(new Date(year, month, d))
    if (week.length === 7) {
      matrix.push(week)
      week = []
    }
  }
  while (week.length < 7 && week.length !== 0) week.push(null)
  if (week.length) matrix.push(week)
  // Ensure 6 rows for consistent height
  while (matrix.length < 6) matrix.push(new Array(7).fill(null))
  return matrix
}

// Custom lunar month names
const lunarMonthNames = [
  'Moon of Beginnings', 'Moon of Awakening', 'Moon of Growth', 'Moon of Light',
  'Moon of Warmth', 'Moon of Abundance', 'Moon of Peak', 'Moon of Harvest',
  'Moon of Balance', 'Moon of Change', 'Moon of Reflection', 'Moon of Stillness'
]

function getLunarMonthName(gregorianMonth) {
  return lunarMonthNames[gregorianMonth] || 'Lunar Month'
}

export default function Calendar({ mode: propMode, setMode: propSetMode }) {
  const today = new Date()
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [modeState, setModeState] = useState('gregorian') // fallback local state
  const mode = propMode ?? modeState
  const setMode = propSetMode ?? setModeState

  const year = current.getFullYear()
  const month = current.getMonth()
  const matrix = getMonthMatrix(year, month)

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1))

  const monthName = mode === 'lunar' ? getLunarMonthName(month) : current.toLocaleString(undefined, { month: 'long' })

  // Lunar age calculation using 28-day lunar month
  function lunarAgeFor(date) {
    const lunarMonth = 28 // Use 28-day lunar month
    const epoch = Date.UTC(2000, 0, 6) // approximate known new moon reference
    const d = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    const days = (d - epoch) / (1000 * 60 * 60 * 24)
    const age = ((days % lunarMonth) + lunarMonth) % lunarMonth
    return age // fractional age in days (0 .. 28)
  }

  return (
    <div className="calendar" role="application" aria-label={`Calendar ${monthName} ${year}`}>
      <div className="calendar-header">
        <button className="cal-btn" onClick={prevMonth} aria-label="Previous month">◀</button>
        <div className="calendar-title">{monthName} {year}</div>
        <button className="cal-btn" onClick={nextMonth} aria-label="Next month">▶</button>
      </div>

      {mode === 'lunar' && <div className="calendar-subtitle">Lunar view</div>}

      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="calendar-weekday">{d}</div>
        ))}

        {matrix.map((week, wi) => (
          week.map((date, di) => {
            const isToday = date && date.toDateString() === today.toDateString()
            const inMonth = date && date.getMonth() === month
            const age = date ? lunarAgeFor(date) : null
            const lunar = age != null ? Math.floor(age) + 1 : ''

            function moonEmojiForAge(a) {
              if (a == null) return ''
              const fullAge = 14 // day 14 is full moon in 28-day cycle
              const threshold = 0.8 // days tolerance

              if (Math.abs(a - fullAge) < threshold) return '🌕' // Full moon
              if (a < threshold || a > 28 - threshold) return '🌑' // New moon
              return ''
            }

            const moonEmoji = age != null ? moonEmojiForAge(age) : ''
            let title = ''
            if (date) {
              if (mode === 'lunar') {
                if (moonEmoji === '🌑') title = `New moon — age ${age.toFixed(1)}d (Lunar day ${lunar})`
                else if (moonEmoji === '🌕') title = `Full moon — age ${age.toFixed(1)}d (Lunar day ${lunar})`
                else title = `Lunar day ${lunar} — age ${age.toFixed(1)}d`
              } else {
                title = `Gregorian ${date.toDateString()}`
              }
            }

            return (
              <div
                key={`${wi}-${di}`}
                className={`calendar-cell ${inMonth ? 'in-month' : 'out-month'} ${isToday ? 'today' : ''} ${mode === 'lunar' ? 'moon' : ''}`}
                aria-current={isToday ? 'date' : undefined}
                title={title}
                aria-label={title}
              >
                {mode === 'lunar' ? (
                  <div className="moon-cell">
                    <div className="moon-date">{date ? date.getDate() : ''}</div>
                    {moonEmoji && <div className="moon-emoji">{moonEmoji}</div>}
                  </div>
                ) : (
                  date ? date.getDate() : ''
                )}
              </div>
            )
          })
        ))}
      </div>
    </div>
  )
}
