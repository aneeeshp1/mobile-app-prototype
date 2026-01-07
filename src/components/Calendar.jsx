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
  const [modeState, setModeState] = useState('lunar') // fallback local state
  const mode = propMode ?? modeState
  const setMode = propSetMode ?? setModeState

  const year = current.getFullYear()
  const month = current.getMonth()
  // Matrix will be selected per mode
  let matrix = getMonthMatrix(year, month)

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1))

  const monthName = mode === 'lunar' ? getLunarMonthName(month) : current.toLocaleString(undefined, { month: 'long' })

  // Lunar calculation anchored to today's Gregorian day
  function getLunarDayAndMonth(date) {
    const today = new Date()
    const todayGregorianDay = today.getDate()
    
    // Calculate days difference from today
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const daysDiff = Math.floor((dateMidnight - todayMidnight) / (1000 * 60 * 60 * 24))
    
    // Today's lunar day equals today's Gregorian day
    // Calculate lunar day for the target date
    const lunarDayRaw = todayGregorianDay + daysDiff
    
    // Wrap into 28-day cycle (1-28)
    const lunarDay = ((lunarDayRaw - 1) % 28 + 28) % 28 + 1
    
    // Calculate lunar month (each 28 days is a new month)
    // Start counting months from today
    const lunarMonthIndex = Math.floor((lunarDayRaw - 1) / 28)
    const baseMonthIndex = today.getMonth()
    const lunarMonth = ((baseMonthIndex + lunarMonthIndex) % 12 + 12) % 12
    
    return { lunarDay, lunarMonth, lunarMonthName: lunarMonthNames[lunarMonth] }
  }

  // Lunar age for moon phase (kept separate for moon emoji logic)
  function lunarAgeFor(date) {
    const lunarMonth = 28
    const epoch = Date.UTC(2000, 0, 6)
    const d = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    const days = (d - epoch) / (1000 * 60 * 60 * 24)
    const age = ((days % lunarMonth) + lunarMonth) % lunarMonth
    return age
  }

  // Map lunar day (1..28) to dummy wellness events
  const lunarEvents = {
    1: [{ title: 'New Moon Breathwork', emoji: '🧘' }],
    3: [{ title: 'Gentle Yoga & Stretch', emoji: '🧎' }],
    7: [{ title: 'Sound Bath Therapy', emoji: '🎶' }],
    10: [{ title: 'Herbal Tea Workshop', emoji: '🌿' }],
    14: [{ title: 'Full Moon Meditation', emoji: '🌕' }],
    18: [{ title: 'Acupressure Basics', emoji: '🤲' }],
    21: [{ title: 'Herbal Healing Circle', emoji: '🍵' }],
    24: [{ title: 'Nature Therapy Walk', emoji: '🌲' }],
    27: [{ title: 'Breath & Cold Therapy', emoji: '❄️' }]
  }

  function lunarDayFor(date) {
    return getLunarDayAndMonth(date).lunarDay
  }

  // Helpers to build a 28-day lunar month matrix
  function addDays(date, delta) {
    const copy = new Date(date)
    copy.setDate(copy.getDate() + delta)
    return copy
  }

  function getLunarMonthDates(anchorDate) {
    // Find the nearest new moon before or on the anchor's first day
    const threshold = 0.8 // tolerance around new moon
    let start = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1)
    // Step backward up to 28 days to find age close to 0
    for (let i = 0; i < 28 && lunarAgeFor(start) > threshold; i++) {
      start = addDays(start, -1)
    }
    // Build 28 consecutive dates for the lunar month
    const days = []
    for (let i = 0; i < 28; i++) {
      days.push(addDays(start, i))
    }
    return days
  }

  function getLunarMatrix(anchorDate) {
    const days = getLunarMonthDates(anchorDate)
    const matrix = []
    for (let i = 0; i < 4; i++) {
      matrix.push(days.slice(i * 7, i * 7 + 7))
    }
    return matrix
  }

  // Use lunar matrix when in lunar mode to ensure exactly 28 days
  if (mode === 'lunar') {
    matrix = getLunarMatrix(current)
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
            const inMonth = mode === 'lunar' ? true : (date && date.getMonth() === month)
            const age = date ? lunarAgeFor(date) : null
            const lunar = date ? getLunarDayAndMonth(date).lunarDay : ''

            function moonEmojiForAge(a) {
              if (a == null) return ''
              const fullAge = 14 // day 14 is full moon in 28-day cycle
              const threshold = 0.8 // days tolerance

              if (Math.abs(a - fullAge) < threshold) return '🌕' // Full moon
              if (a < threshold || a > 28 - threshold) return '🌑' // New moon
              return ''
            }

            const moonEmoji = age != null ? moonEmojiForAge(age) : ''
            // Determine events for this cell (use lunar day mapping for both modes)
            const cellLunarDay = date ? lunarDayFor(date) : null
            const events = cellLunarDay ? lunarEvents[cellLunarDay] || [] : []

            // Build hover/aria label showing lunar + Gregorian info
            let title = ''
            let ariaLabel = ''
            if (date) {
              const lunarInfo = getLunarDayAndMonth(date)
              const gregLabel = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
              const lunarLabel = `${lunarInfo.lunarMonthName}, Day ${lunarInfo.lunarDay}`
              const moonLabel = moonEmoji ? `${moonEmoji} ${lunarLabel}`.trim() : lunarLabel
              const eventLabel = events.length ? `Events: ${events.map(e => e.title).join(', ')}` : ''
              const lines = [moonLabel || lunarLabel, `Gregorian: ${gregLabel}`]
              if (eventLabel) lines.push(eventLabel)
              title = lines.join('\n') // multiline native tooltip
              ariaLabel = lines.join('. ')
            }

            return (
              <div
                key={`${wi}-${di}`}
                className={`calendar-cell ${inMonth ? 'in-month' : 'out-month'} ${isToday ? 'today' : ''} ${mode === 'lunar' ? 'moon' : ''}`}
                aria-current={isToday ? 'date' : undefined}
                title={title}
                aria-label={ariaLabel || title}
              >
                {mode === 'lunar' ? (
                  <div className="moon-cell">
                    <div className="moon-date">{lunar}</div>
                    {moonEmoji && <div className="moon-emoji">{moonEmoji}</div>}
                    {events.length > 0 && !moonEmoji && (
                      <div className="event-list" aria-label="Events">
                        <span className="event-dot" aria-hidden="true">{events[0].emoji || '•'}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="greg-cell">
                    <div className="greg-date">{date ? date.getDate() : ''}</div>
                    {events.length > 0 && (
                      <div className="event-list" aria-label="Events">
                        <span className="event-dot" aria-hidden="true">{events[0].emoji || '•'}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })
        ))}
      </div>
    </div>
  )
}
