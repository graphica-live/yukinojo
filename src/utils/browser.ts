const TIKTOK_IN_APP_MARKERS = [
  'tiktok',
  'musical_ly',
  'bytedancewebview',
  'ttwebview',
  'aweme',
  'trill',
]

export const detectTikTokInAppBrowser = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const userAgent = window.navigator.userAgent.toLowerCase()
  const vendor = window.navigator.vendor.toLowerCase()
  const referrer = document.referrer.toLowerCase()

  return TIKTOK_IN_APP_MARKERS.some((marker) => userAgent.includes(marker))
    || vendor.includes('bytedance')
    || referrer.includes('tiktok.com')
    || referrer.includes('tiktokv.com')
}

export const shouldUseLowEffectsMode = () => detectTikTokInAppBrowser()