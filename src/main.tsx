import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
    <App />
  </StrictMode>,
)
