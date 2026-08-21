import { useMotionProfile } from '../hooks/useMotionProfile'

const items = [
  'TikTok LIVE 毎日6〜8時間',
  'サニプリ所属',
  '2025.01.18 活動開始',
  'IT国家資格 高度区分 多数保有',
  '実務経験14年',
]

const Item = ({ label }: { label: string }) => (
  <span className="flex items-center gap-6 whitespace-nowrap px-6">
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
      {label}
    </span>
    <span className="text-signal/70">/</span>
  </span>
)

/**
 * Repeating signal strip. It carries real information, so when motion is off
 * it degrades to a static wrapped list rather than disappearing or leaving a
 * clipped row of half-visible text.
 */
const SignalTicker = () => {
  const { ambient } = useMotionProfile()

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/10 bg-ink-soft/70 py-4"
    >
      {ambient ? (
        // The fade sits on a full-width wrapper, not on the track itself:
        // masking the track would put the gradient at 8% of the doubled track
        // width instead of at the viewport edges.
        <div className="edge-fade">
          <div className="flex w-max animate-ticker">
            {[0, 1].map((group) => (
              <div key={group} className="flex">
                {items.map((label) => (
                  <Item key={`${group}-${label}`} label={label} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-y-2 px-4">
          {items.map((label) => (
            <Item key={label} label={label} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SignalTicker
