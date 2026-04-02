import React, { useState, useEffect, useCallback, useRef } from 'react';
import OrbCanvas from '@/components/OrbCanvas';
import { useTranslation } from '@/hooks/useTranslation';

interface OrbToGraphsAnimationProps {
  prefersReducedMotion: boolean;
  isLoaded: boolean;
}

type Phase = 'orb' | 'listening' | 'transition' | 'dashboard' | 'returning';

const PHASE_DURATIONS: Record<Phase, number> = {
  orb: 2200,
  listening: 2800,
  transition: 1200,
  dashboard: 5000,
  returning: 1000,
};

const PHASE_ORDER: Phase[] = ['orb', 'listening', 'transition', 'dashboard', 'returning'];

// Bar chart data matching the screenshot
const barData = [
  { labelKey: 'hero.demo.regionNA', current: 78, previous: 65 },
  { labelKey: 'hero.demo.regionEU', current: 62, previous: 58 },
  { labelKey: 'hero.demo.regionAPAC', current: 90, previous: 55 },
  { labelKey: 'hero.demo.regionLATAM', current: 45, previous: 40 },
];

// Pie chart data — channel mix
const pieData = [
  { labelKey: 'hero.demo.pieDirect', value: 40, color: 'var(--primary-cyan)' },
  { labelKey: 'hero.demo.pieOrganic', value: 30, color: 'var(--deep-indigo)' },
  { labelKey: 'hero.demo.piePaid', value: 20, color: 'var(--accent-magenta)' },
  { labelKey: 'hero.demo.pieReferral', value: 10, color: 'var(--accent-violet)' },
];

// Pre-compute cumulative angles for conic-gradient stops
const pieAngles = pieData.reduce<number[]>((acc, slice) => {
  const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
  acc.push(prev + slice.value * 3.6);
  return acc;
}, []);

// Voice waveform bars — center-weighted bell curve for realistic speech energy
const waveformBars = [
  { amp: 4,  dur: 0.7, kf: 1 },
  { amp: 6,  dur: 0.55, kf: 3 },
  { amp: 8,  dur: 0.45, kf: 2 },
  { amp: 11, dur: 0.4,  kf: 4 },
  { amp: 14, dur: 0.35, kf: 1 },
  { amp: 17, dur: 0.3,  kf: 3 },
  { amp: 19, dur: 0.28, kf: 2 },
  { amp: 20, dur: 0.25, kf: 1 },
  { amp: 19, dur: 0.27, kf: 4 },
  { amp: 18, dur: 0.3,  kf: 3 },
  { amp: 20, dur: 0.26, kf: 2 },
  { amp: 19, dur: 0.28, kf: 1 },
  { amp: 17, dur: 0.3,  kf: 4 },
  { amp: 14, dur: 0.35, kf: 3 },
  { amp: 11, dur: 0.38, kf: 2 },
  { amp: 9,  dur: 0.45, kf: 1 },
  { amp: 7,  dur: 0.5,  kf: 4 },
  { amp: 5,  dur: 0.6,  kf: 3 },
  { amp: 4,  dur: 0.65, kf: 2 },
  { amp: 3,  dur: 0.7,  kf: 1 },
];

const OrbToGraphsAnimation: React.FC<OrbToGraphsAnimationProps> = ({
  prefersReducedMotion,
  isLoaded,
}) => {
  const { t } = useTranslation();
  // Reduced motion: skip straight to dashboard so users still see the product story
  const [phase, setPhase] = useState<Phase>(prefersReducedMotion ? 'dashboard' : 'orb');
  const [typedText, setTypedText] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const queryText = t('hero.demo.voiceQuery');

  // Typing effect
  useEffect(() => {
    if (phase !== 'listening' || prefersReducedMotion) {
      if (phase !== 'listening') setTypedText('');
      return;
    }

    let i = 0;
    setTypedText('');

    const type = () => {
      if (i < queryText.length) {
        setTypedText(queryText.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(type, 45 + Math.random() * 25);
      }
    };

    typingRef.current = setTimeout(type, 400);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [phase, queryText, prefersReducedMotion]);

  // Phase cycling
  const advancePhase = useCallback(() => {
    setPhase((prev) => {
      const idx = PHASE_ORDER.indexOf(prev);
      return PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
    });
  }, []);

  // BUG 1 FIX: Re-schedule timeout when visibility returns.
  // Track whether a phase advance was skipped while off-screen.
  const pendingAdvanceRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || !isLoaded) return;

    // If currently not visible, mark as pending and don't start timer
    if (!isVisibleRef.current) {
      pendingAdvanceRef.current = true;
      return;
    }

    pendingAdvanceRef.current = false;
    timerRef.current = setTimeout(advancePhase, PHASE_DURATIONS[phase]);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, advancePhase, prefersReducedMotion, isLoaded]);

  // Pause when off screen — and resume pending advance when back
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasHidden = !isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;

        // BUG 1 FIX: If we just became visible and there's a pending advance, fire it
        if (wasHidden && entry.isIntersecting && pendingAdvanceRef.current) {
          pendingAdvanceRef.current = false;
          advancePhase();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [advancePhase]);

  const isDashboardPhase = phase === 'dashboard';
  const isTransitioning = phase === 'transition';
  const isReturning = phase === 'returning';
  const showOrb = phase === 'orb' || phase === 'listening';
  const showDashboard = isDashboardPhase || isTransitioning;
  const showWaveform = !prefersReducedMotion && phase === 'listening';

  // Bars must grow AFTER the dashboard container is fully opaque.
  // Container transition: opacity 350ms ease-out with 100ms delay = ~450ms to fully opaque.
  // Wait 500ms to guarantee container is opaque before bars start their growth animation.
  const [barsReady, setBarsReady] = useState(prefersReducedMotion);
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isDashboardPhase && !barsReady) {
      const id = setTimeout(() => setBarsReady(true), 500);
      return () => clearTimeout(id);
    }
    if (!isDashboardPhase && !isTransitioning) {
      setBarsReady(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDashboardPhase, isTransitioning, prefersReducedMotion]);

  const barsGrow = barsReady;

  // REGRESSION 2 FIX: Don't render OrbCanvas when it's fully invisible
  const orbIsHidden = isDashboardPhase;

  // Orb scale/opacity — fast decisive shrink during transition, smooth return to full
  const orbScale = isDashboardPhase ? 0.05 : isTransitioning ? 0.15 : isReturning ? 1 : 1;
  const orbOpacity = isDashboardPhase ? 0 : isTransitioning ? 0 : isReturning ? 1 : 1;

  // For reduced motion, show dashboard statically with voice bar
  const isReducedMotionStatic = prefersReducedMotion;

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      {/* Voice query bar — shown during listening phase (or always for reduced motion) */}
      <div
        className={`
          mx-auto mb-3 sm:mb-6 w-full max-w-xl px-4 sm:px-0
          transition-all duration-700 ease-out
          ${isReducedMotionStatic || phase === 'listening' || isTransitioning || isDashboardPhase
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <div className="glass-panel-static flex w-full items-center gap-3 px-3 py-3 sm:px-4 !rounded-2xl">
          {/* Mic icon */}
          <div className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${phase === 'listening' && !prefersReducedMotion ? 'bg-primary-cyan/20' : 'bg-white/5'}
            transition-colors duration-500
          `}>
            <svg className="w-4 h-4 text-primary-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-14 0m7 7v4m-4 0h8M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z" />
            </svg>
          </div>

          {/* Waveform — hidden for reduced motion */}
          {showWaveform && (
            <div className={`
              hidden min-[420px]:flex items-center gap-[2px] h-6
            `}>
              {waveformBars.map((bar, i) => {
                // Opacity varies with amplitude: louder bars glow brighter
                const opacity = 0.4 + (bar.amp / 20) * 0.6;
                return (
                  <div
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                      height: `${bar.amp + 4}px`,
                      backgroundColor: `rgba(0, 229, 200, ${opacity})`,
                      animation: `waveform-bar-${bar.kf} ${bar.dur}s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.04}s infinite`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Typed text */}
          <div className="flex-1 min-w-0">
            <span className="block text-xs sm:text-sm text-white/70 font-light leading-snug sm:truncate">
              {isReducedMotionStatic
                ? queryText
                : (typedText || (isDashboardPhase || isTransitioning ? queryText : ''))}
              {phase === 'listening' && !prefersReducedMotion && (
                <span className="inline-block w-[2px] h-4 bg-primary-cyan/80 ml-[1px] align-middle animate-pulse" />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main animation container — dynamic height per phase.
          Two min-height declarations: vh fallback first, svh override second.
          Browsers without svh support ignore the second and keep the vh value. */}
      <div
        className={`relative overflow-hidden transition-[min-height] duration-700 ease-out ${
          (showDashboard || isReducedMotionStatic)
            ? 'animation-container-expanded'
            : 'animation-container-collapsed'
        }`}
        style={{
          // vh fallback for older browsers; svh override via CSS @supports class
          minHeight: (showDashboard || isReducedMotionStatic)
            ? 'min(380px, 50vh)'
            : 'min(320px, 45vh)',
        }}
      >

        {/* === Glow burst — the visual bridge between orb and dashboard === */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 20 }}
          >
            {/* Expanding teal ring — use ONLY the animation, no conflicting transition.
                key forces remount on each transition so the animation replays. */}
            {isTransitioning && (
              <div
                key={`burst-${Date.now()}`}
                className="absolute rounded-full"
                style={{
                  width: 'min(500px, 130vw)',
                  height: 'min(500px, 130vw)',
                  background: 'radial-gradient(circle, rgba(0, 229, 200, 0.3) 0%, rgba(0, 229, 200, 0.1) 40%, transparent 70%)',
                  animation: 'glow-burst 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              />
            )}
            {/* Core flash — bright initial burst */}
            <div
              className="absolute rounded-full"
              style={{
                width: 'min(180px, 48vw)',
                height: 'min(180px, 48vw)',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(0, 229, 200, 0.6) 25%, rgba(124, 92, 250, 0.3) 55%, transparent 80%)',
                opacity: isTransitioning ? 1 : 0,
                transform: isTransitioning ? 'scale(2.5)' : 'scale(0.2)',
                filter: 'blur(30px)',
                transition: isTransitioning
                  ? 'opacity 150ms ease-out, transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'opacity 300ms ease-out, transform 300ms ease-in',
              }}
            />
          </div>
        )}

        {/* Orb layer — REGRESSION 2 FIX: conditionally render OrbCanvas */}
        {!isReducedMotionStatic && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: orbOpacity,
              transform: `scale(${orbScale})`,
              transition: isTransitioning
                ? 'opacity 400ms ease-in, transform 500ms cubic-bezier(0.4, 0, 1, 1)'
                : 'opacity 600ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: showOrb ? 10 : 1,
              pointerEvents: showOrb ? 'auto' : 'none',
              willChange: 'opacity, transform',
            }}
          >
            <div className={`
              relative rounded-full
              ${phase === 'listening' ? 'animate-[orb-listening_2s_ease-in-out_infinite]' : ''}
            `}>
              {!orbIsHidden && (
                <OrbCanvas
                  prefersReducedMotion={prefersReducedMotion}
                  className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px]"
                />
              )}
            </div>
          </div>
        )}

        {/* Dashboard layer — switches to relative in dashboard phase so content
            naturally sizes the parent (fixes overflow on small mobile viewports).
            During transition phase it remains absolute to overlap the shrinking orb. */}
        <div
          className={`
            ${(isReducedMotionStatic || isDashboardPhase) ? 'relative' : 'absolute inset-0'} flex items-center justify-center
          `}
          style={isReducedMotionStatic ? {} : {
            opacity: showDashboard ? 1 : 0,
            transform: showDashboard ? 'scale(1)' : 'scale(0.95)',
            transition: showDashboard
              ? 'opacity 350ms ease-out 100ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 80ms'
              : 'opacity 300ms ease-in, transform 300ms ease-in',
            zIndex: showDashboard ? 10 : 1,
            pointerEvents: showDashboard ? 'auto' : 'none',
            willChange: 'opacity, transform',
          }}
        >
          {/* GAP 3 FIX: ltr direction to prevent RTL flex-row reversal */}
          <div className="w-full max-w-full flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-2" dir="ltr">
            {/* Bar chart panel — REGRESSION 1 FIX: glass-panel-static (no hover lift) */}
            <div className="glass-panel-static flex-1 min-w-0 !rounded-2xl p-3 sm:p-5">
              <div className="mb-3 sm:mb-4 flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white/90">{t('hero.demo.chartTitle')}</h3>
                  <p className="text-xs text-white/40 mt-0.5">{t('hero.demo.chartSubtitle')}</p>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/50">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-primary-cyan" />
                    2024
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-white/20" />
                    2023
                  </span>
                </div>
              </div>

              {/* Bar chart — bars start growing during transition, not just dashboard */}
              <div className="flex justify-between gap-1 min-[420px]:gap-2 sm:gap-4 h-[104px] min-[420px]:h-[110px] sm:h-[170px]">
                {barData.map((bar, i) => (
                  <div key={bar.labelKey} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                    <div className="flex items-end gap-0.5 min-[420px]:gap-1 flex-1 w-full justify-center">
                      {/* Current year bar — GAP 4 FIX: uses CSS variable via class */}
                      <div
                        className="w-3.5 min-[420px]:w-4 sm:w-[28px] rounded-t-sm demo-bar-current"
                        style={{
                          height: (barsGrow || isReducedMotionStatic) ? `${bar.current}%` : '0%',
                          transition: prefersReducedMotion ? 'none' : `height 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 120 + 100}ms, box-shadow 600ms ease ${i * 120 + 400}ms`,
                          boxShadow: (isDashboardPhase || isReducedMotionStatic) ? '0 0 12px var(--primary-cyan-glow)' : 'none',
                        }}
                      />
                      {/* Previous year bar */}
                      <div
                        className="w-3.5 min-[420px]:w-4 sm:w-[28px] rounded-t-sm bg-white/15"
                        style={{
                          height: (barsGrow || isReducedMotionStatic) ? `${bar.previous}%` : '0%',
                          transition: prefersReducedMotion ? 'none' : `height 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 120 + 200}ms`,
                        }}
                      />
                    </div>
                    <span className="mt-1 text-[9px] min-[420px]:text-[10px] sm:text-xs text-white/40">{t(bar.labelKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI cards — 1-col on very narrow (<360px), 2-col on mobile, stacked on desktop sidebar */}
            <div className="grid w-full grid-cols-1 min-[440px]:grid-cols-2 sm:flex sm:flex-col gap-2 sm:gap-3 min-w-0 sm:w-[180px]">
              {/* Total Revenue */}
              <div
                className="glass-panel-static !rounded-2xl p-2.5 sm:p-4 text-center sm:flex-1"
                style={isReducedMotionStatic ? {} : {
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 500ms ease-out 150ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
                }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-1">{t('hero.demo.totalRevenue')}</p>
                <p className="text-lg sm:text-2xl font-bold text-white/90">{t('hero.demo.totalRevenueValue')}</p>
                <p className="text-xs text-primary-cyan font-medium mt-0.5">{t('hero.demo.totalRevenueChange')}</p>
              </div>

              {/* Top Region */}
              <div
                className="glass-panel-static !rounded-2xl p-2.5 sm:p-4 text-center sm:flex-1"
                style={isReducedMotionStatic ? {} : {
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 500ms ease-out 300ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
                }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-1">{t('hero.demo.topRegion')}</p>
                <p className="text-base sm:text-xl font-bold text-white/90">{t('hero.demo.topRegionValue')}</p>
                <p className="text-xs text-primary-cyan font-medium mt-0.5">{t('hero.demo.topRegionChange')}</p>
              </div>

              {/* Pie / Donut chart — Channel Mix — spans full width on mobile */}
              <div
                className="glass-panel-static min-[440px]:col-span-2 sm:col-span-1 !rounded-2xl p-2.5 sm:p-4 sm:flex-1"
                style={isReducedMotionStatic ? {} : {
                  opacity: barsGrow ? 1 : 0,
                  transform: barsGrow ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 500ms ease-out 450ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 450ms',
                }}
              >
                <p className="text-[10px] sm:text-xs text-white/40 mb-2 text-center">{t('hero.demo.pieTitle')}</p>
                <div className="flex items-center justify-center gap-3">
                  {/* Donut chart via conic-gradient — opacity transition since gradients can't interpolate */}
                  <div
                    className="w-[54px] h-[54px] sm:w-[72px] sm:h-[72px] rounded-full flex-shrink-0"
                    style={{
                      background: `conic-gradient(
                        ${pieData.map((slice, i) =>
                          `${slice.color} ${i === 0 ? '0deg' : `${pieAngles[i - 1]}deg`} ${pieAngles[i]}deg`
                        ).join(', ')}
                      )`,
                      mask: 'radial-gradient(circle at center, transparent 40%, black 41%)',
                      WebkitMask: 'radial-gradient(circle at center, transparent 40%, black 41%)',
                      opacity: (barsGrow || isReducedMotionStatic) ? 1 : 0,
                      transition: prefersReducedMotion ? 'none' : 'opacity 600ms ease-out 500ms',
                    }}
                  />
                  {/* Legend */}
                  <div className="flex flex-col gap-1">
                    {pieData.map((slice) => (
                      <div key={slice.labelKey} className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: slice.color }}
                        />
                        <span className="text-[9px] sm:text-[10px] text-white/50 leading-none">
                          {t(slice.labelKey)} {slice.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase indicator dots — hidden for reduced motion (static view) */}
      {!isReducedMotionStatic && (
        <div className="flex justify-center gap-2 mt-6">
          {(['orb', 'dashboard'] as const).map((p) => (
            <div
              key={p}
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${(p === 'orb' && (phase === 'orb' || phase === 'listening'))
                  || (p === 'dashboard' && (phase === 'dashboard' || phase === 'transition'))
                  ? 'w-6 bg-primary-cyan/60'
                  : 'w-1.5 bg-white/20'}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrbToGraphsAnimation;
