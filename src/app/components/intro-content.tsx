'use client'

import React from 'react'

interface IntroContentProps {
  isCompactMode: boolean
  setIsCompactMode: (compact: boolean) => void
}

export function IntroContent({ isCompactMode, setIsCompactMode }: IntroContentProps) {
  return (
    <div className="intro-content">
      <div className="mt-3">
        <p>👋 Hi, I&apos;m <a href="https://yizhouyu.github.io">Yizhou Yu</a>. Each week of my life is a little box. <a href="https://yzyzy.dev" style={{ marginLeft: '0.5rem' }}>← Back to main site</a></p>

        <p>💡 Inspired by <a href="https://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>. Adapted from <a href="https://github.com/ginatrapani/life-in-weeks">Gina&apos;s work</a>.<br/>
        💻 Built with <a href="https://rd.me/weeks">Ran Ding&apos;s</a> <a href="https://github.com/dingran/life-in-weeks-nextjs">open-source code</a>. My fork is <a href="https://github.com/yizhouyu/life-in-weeks-nextjs">here</a>.</p>

        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '0.75rem' }}>
          🎨 <strong>Colors:</strong> Background colors change at major life milestones, marking different life phases.<br/>
          🌍 <strong>World events:</strong> Notable historical moments (disasters, technology launches, politics) appear as overlays.
        </p>
      </div>
      
      <div className="compact-toggle" style={{ textAlign: 'center', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
        <button
          type="button"
          onClick={() => setIsCompactMode(!isCompactMode)}
          className={`toggle-button ${isCompactMode ? 'compact-active' : 'standard-active'}`}
          title={isCompactMode ? 'Switch to Standard View' : 'Switch to Compact View (fits entire life on screen)'}
        >
          {isCompactMode ? '📋 Switch to Standard View' : '🔍 Switch to Compact View'}
        </button>
      </div>
    </div>
  )
}