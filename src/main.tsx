import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { shouldUseLowEffectsMode } from './utils/browser'

// Applied before React renders so the expensive-effect fallbacks are in place
// on the very first paint. TikTok / ByteDance webviews previously rendered the
// page fully black when backdrop-filter and mix-blend-mode landed together.
if (shouldUseLowEffectsMode()) {
  document.documentElement.classList.add('ua-low-effects')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      `m.*` everywhere instead of `motion.*`, with only the feature set this
      page uses: variants / whileInView / mount animations. Nothing here lays
      out, drags or exits, so `domMax` would be dead weight - and `motion.*`
      bundles all of it unconditionally. The features are imported
      synchronously, so the hero's mount animation still runs on the first
      frame; `strict` makes an accidental `motion.*` fail loudly in dev.
    */}
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </StrictMode>,
)
