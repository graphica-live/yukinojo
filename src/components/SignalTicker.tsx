import { useMotionProfile } from '../hooks/useMotionProfile'

const items = ['サニプリ所属', '2025.01.18 活動開始', '実務経験14年']

const Item = ({ label }: { label: string }) => (
  <span className="flex items-center gap-3.5 whitespace-nowrap px-5 text-[12.5px] font-bold text-ink-soft">
    {label}
    <span
      aria-hidden="true"
      className="iris-fill h-4 w-4 shrink-0 [clip-path:polygon(50%_0,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"
    />
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
    <div aria-hidden="true" className="relative -mt-[10dvh] overflow-hidden py-4 sm:-mt-[7dvh] lg:-mt-[4dvh]">
      {ambient ? (
        // The fade sits on a full-width wrapper, not on the track itself:
        // masking the track would put the gradient at 8% of the doubled track
        // width instead of at the viewport edges.
        <div className="edge-fade">
          <div className="flex w-max animate-[marquee_34s_linear_infinite]">
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
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-y-1 px-4">
          {items.map((label) => (
            <Item key={label} label={label} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SignalTicker
