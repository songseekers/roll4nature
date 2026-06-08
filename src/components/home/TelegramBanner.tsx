'use client';

import { useState, useEffect } from 'react';

export default function TelegramBanner() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    setMounted(true);

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Avoid hydration mismatch — render nothing until client has determined theme
  if (!mounted) return null;

  // ─── Shared layout helpers ───────────────────────────────────
  const row = { display: 'flex', alignItems: 'flex-start', gap: '12px' } as const;

  // ─── Light styles ────────────────────────────────────────────
  const light = {
    outer: {
      background: '#e8dfc0',
      border: '2px solid #7a6340',
      borderRadius: '2px',
      boxShadow: '5px 5px 0px #7a6340, 3px 3px 12px rgba(0,0,0,0.3)',
      fontFamily: "'Courier New', Courier, monospace",
      color: '#2a1a08',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    grain: {
      background: [
        'repeating-linear-gradient(0deg, transparent 28px, rgba(120,90,40,0.06) 29px)',
        'repeating-linear-gradient(90deg, transparent 40px, rgba(120,90,40,0.04) 41px)',
      ].join(', '),
    },
    stain: {
      background: [
        'radial-gradient(ellipse at 10% 15%, rgba(139,100,40,0.18), transparent 50%)',
        'radial-gradient(ellipse at 85% 80%, rgba(139,100,40,0.15), transparent 45%)',
        'radial-gradient(ellipse at 30% 70%, rgba(100,70,20,0.10), transparent 35%)',
      ].join(', '),
    },
    watermark: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(-25deg)',
      fontWeight: '700',
      letterSpacing: '8px',
      color: 'rgba(180, 40, 20, 0.13)',
      border: '6px solid rgba(180, 40, 20, 0.10)',
      padding: '4px 16px',
      borderRadius: '4px',
      whiteSpace: 'nowrap' as const,
      pointerEvents: 'none' as const,
      zIndex: 5,
    },
    header: {
      background: '#2a1a08',
      color: '#d4c49a',
      fontSize: '11px',
      letterSpacing: '3px',
      padding: '9px 16px',
      borderBottom: '2px solid #7a6340',
      textAlign: 'center' as const,
    },
    meta: {
      borderBottom: '1px dashed #9a7d52',
      padding: '7px 20px',
      fontSize: '11px',
      color: '#6b4f28',
    },
    dots: {
      padding: '12px 20px 4px',
      fontSize: '12px',
      color: '#9a7d52',
      letterSpacing: '2px',
    },
    urgentBar: {
      textAlign: 'center' as const,
      fontSize: '12px',
      letterSpacing: '4px',
      fontWeight: '700',
      color: '#2a1a08',
      padding: '6px 20px',
      borderTop: '1px solid #9a7d52',
      borderBottom: '1px solid #9a7d52',
      background: 'rgba(120,90,40,0.08)',
    },
    body: {
      padding: '20px 28px',
      display: 'flex' as const,
      flexDirection: 'column' as const,
      gap: '12px',
    },
    label: {
      color: '#6b4f28',
      minWidth: '80px',
      letterSpacing: '1px',
      textDecoration: 'underline dotted',
      flexShrink: 0,
    },
    value: {
      fontWeight: '700',
      letterSpacing: '2px',
      color: '#1e1206',
    },
    divider: {
      borderTop: '1px dashed #9a7d52',
    },
    msgLabel: {
      color: '#6b4f28',
      minWidth: '80px',
      letterSpacing: '1px',
      textDecoration: 'underline dotted',
      flexShrink: 0,
      paddingTop: '4px',
    },
    footer: {
      background: '#2a1a08',
      color: '#d4c49a',
      fontSize: '10px',
      letterSpacing: '2px',
      padding: '7px 16px',
      borderTop: '2px solid #7a6340',
    },
  };

  // ─── Dark styles ─────────────────────────────────────────────
  const dark = {
    outer: {
      background: '#1a1208',
      border: '1px solid #4a3820',
      borderRadius: '2px',
      boxShadow: [
        '0 0 40px rgba(200,140,40,0.12)',
        '0 0 80px rgba(200,140,40,0.06)',
        '5px 5px 0px #0a0804',
        'inset 0 0 60px rgba(0,0,0,0.4)',
      ].join(', '),
      fontFamily: "'Courier New', Courier, monospace",
      color: '#d4b87a',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    grain: {
      background: 'repeating-linear-gradient(0deg, transparent 28px, rgba(200,150,50,0.03) 29px)',
    },
    stain: {
      background: [
        'radial-gradient(ellipse at 50% 0%, rgba(200,140,40,0.08), transparent 60%)',
        'radial-gradient(ellipse at 20% 50%, rgba(180,120,30,0.05), transparent 50%)',
        'radial-gradient(ellipse at 80% 80%, rgba(160,100,20,0.06), transparent 45%)',
      ].join(', '),
    },
    watermark: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(-25deg)',
      fontWeight: '700',
      letterSpacing: '8px',
      color: 'rgba(220, 60, 40, 0.18)',
      border: '6px solid rgba(220, 60, 40, 0.14)',
      padding: '4px 16px',
      borderRadius: '4px',
      whiteSpace: 'nowrap' as const,
      pointerEvents: 'none' as const,
      zIndex: 5,
    },
    header: {
      background: '#0a0804',
      color: '#c8a050',
      textShadow: '0 0 8px rgba(200,160,80,0.4)',
      fontSize: '11px',
      letterSpacing: '4px',
      padding: '10px 16px',
      borderBottom: '1px solid #4a3820',
      textAlign: 'center' as const,
    },
    meta: {
      borderBottom: '1px dashed #3a2c14',
      padding: '7px 20px',
      fontSize: '11px',
      color: '#7a6030',
      letterSpacing: '1px',
    },
    dots: {
      padding: '12px 20px 4px',
      fontSize: '12px',
      color: '#4a3820',
      letterSpacing: '2px',
    },
    urgentBar: {
      textAlign: 'center' as const,
      fontSize: '12px',
      letterSpacing: '4px',
      fontWeight: '700',
      color: '#e8c060',
      padding: '8px 20px',
      borderTop: '1px solid #3a2c14',
      borderBottom: '1px solid #3a2c14',
      background: 'rgba(200,140,40,0.06)',
      textShadow: '0 0 10px rgba(220,160,60,0.3)',
    },
    body: {
      padding: '22px 28px',
      display: 'flex' as const,
      flexDirection: 'column' as const,
      gap: '14px',
    },
    label: {
      color: '#7a6030',
      minWidth: '80px',
      letterSpacing: '1px',
      textDecoration: 'underline dotted',
      textDecorationColor: '#4a3820',
      flexShrink: 0,
    },
    value: {
      fontWeight: '700',
      letterSpacing: '2px',
      color: '#d4b87a',
      textShadow: '0 0 6px rgba(200,160,80,0.2)',
    },
    divider: {
      borderTop: '1px dashed #3a2c14',
    },
    msgLabel: {
      color: '#7a6030',
      minWidth: '80px',
      letterSpacing: '1px',
      textDecoration: 'underline dotted',
      textDecorationColor: '#4a3820',
      flexShrink: 0,
      paddingTop: '4px',
    },
    footer: {
      background: '#0a0804',
      color: '#7a6030',
      fontSize: '10px',
      letterSpacing: '2px',
      padding: '7px 16px',
      borderTop: '1px solid #4a3820',
    },
  };

  const s = isDark ? dark : light;
  const DOTS = '⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂· ·⠂';

  return (
    <section aria-label="Message from Roll for Veterans">
      <div style={s.outer}>
        {/* Texture: grain lines */}
        <div
          aria-hidden="true"
          style={{ ...s.grain, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
        />
        {/* Texture: age stains / warm glow */}
        <div
          aria-hidden="true"
          style={{ ...s.stain, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
        />

        {/* URGENT watermark */}
        <div
          role="img"
          aria-label="Urgent stamp"
          className="text-[48px] sm:text-[72px]"
          style={s.watermark}
        >
          URGENT
        </div>

        {/* Header bar */}
        <div style={{ ...s.header, position: 'relative', zIndex: 10 }}>
          WESTERN UNION TELEGRAM
        </div>

        {/* Meta row */}
        <div
          style={{ ...s.meta, position: 'relative', zIndex: 10 }}
          className="flex justify-between"
        >
          <span className="hidden sm:block">RECEIVED AT ALL STATIONS</span>
          <span>NO. 2026-R4V</span>
          <span className="hidden sm:block">FEB 27, 2026</span>
        </div>

        {/* Top dots */}
        <div style={{ ...s.dots, position: 'relative', zIndex: 10 }}>{DOTS}</div>

        {/* Urgent header bar */}
        <div style={{ ...s.urgentBar, position: 'relative', zIndex: 10 }}>
          ━━━ URGENT MESSAGE FOLLOWS ━━━
        </div>

        {/* Message body */}
        <div style={{ ...s.body, position: 'relative', zIndex: 10 }}>
          {/* FROM */}
          <div style={row}>
            <span style={s.label}>FROM:</span>
            <span style={s.value}>ROLL 4 VETERANS</span>
          </div>

          {/* TO */}
          <div style={row}>
            <span style={s.label}>TO:</span>
            <span style={s.value}>EVERYONE</span>
          </div>

          {/* Divider */}
          <div style={s.divider} />

          {/* MSG */}
          <div style={row}>
            <span style={s.msgLabel}>MSG:</span>
            <span>
              <span
                className={[
                  'block',
                  'whitespace-normal sm:whitespace-nowrap',
                  isDark
                    ? 'text-[16px] sm:text-[19px]'
                    : 'text-[14px] sm:text-[17px]',
                ].join(' ')}
                style={{
                  fontWeight: '700',
                  letterSpacing: '3px',
                  lineHeight: '1.8',
                  color: isDark ? '#f0d080' : '#1e1206',
                  ...(isDark
                    ? { textShadow: '0 0 12px rgba(240,200,80,0.35), 0 0 24px rgba(240,200,80,0.15)' }
                    : {}),
                }}
              >
                GET OUTSIDE!
              </span>
              <span
                className={[
                  'block',
                  'whitespace-normal sm:whitespace-nowrap',
                  isDark
                    ? 'text-[16px] sm:text-[19px]'
                    : 'text-[14px] sm:text-[17px]',
                ].join(' ')}
                style={{
                  fontWeight: '700',
                  letterSpacing: '3px',
                  lineHeight: '1.8',
                  color: isDark ? '#f0d080' : '#1e1206',
                  ...(isDark
                    ? { textShadow: '0 0 12px rgba(240,200,80,0.35), 0 0 24px rgba(240,200,80,0.15)' }
                    : {}),
                }}
              >
                THE ANSWERS ARE OUTSIDE.
              </span>
            </span>
          </div>
        </div>

        {/* End bar */}
        <div style={{ ...s.urgentBar, position: 'relative', zIndex: 10 }}>
          ━━━━━━━━ END ━━━━━━━━
        </div>

        {/* Bottom dots */}
        <div style={{ ...s.dots, position: 'relative', zIndex: 10 }}>{DOTS}</div>

        {/* Footer bar */}
        <div
          style={{ ...s.footer, position: 'relative', zIndex: 10 }}
          className="flex justify-between"
        >
          <span className="hidden sm:block">FILED: KEY WEST FL</span>
          <span>R4V.SONGSEEKERS.ORG</span>
          <span className="hidden sm:block">DEST: FLAGSTAFF AZ</span>
        </div>
      </div>
    </section>
  );
}
