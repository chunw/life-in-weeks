'use client'

import React from 'react'

export function IntroContent() {
  return (
    <div className="intro-content">
      <div className="mt-3">
        <p>This is <a href="https://www.chunwang.art" target='_blank' rel='noopener noreferrer'>Chun Wang</a>&apos;s life in weeks (<a target="_blank" rel="noopener noreferrer" href="/chunwang-resume.pdf">CV</a>). Inspired by <a target="_blank" rel="noopener noreferrer" href="https://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>.</p>

        {/* <p style={{ fontSize: '0.9em', color: '#666', marginTop: '0.75rem' }}>
          🎨 <strong>Colors:</strong> Background colors change at major life milestones, marking different life phases.<br/>
          🌍 <strong>World events:</strong> Notable historical moments (disasters, technology launches, politics) appear as overlays.
        </p> */}
      </div>

    </div>
  )
}
