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

  if (!mounted) return null;

  const row = { display: 'flex', alignItems: 'flex-start', gap: '12px' } as const;

  // ─── Light styles ────────────────────────────────────────────
  const light = {
    outer: {
      background: '#e8dfc0',
      border: '2px solid #7a6340',
      borderRadius: '2px',
      boxShadow: '4px 4px 0 #7a6340',
      fontFamily: "'Courier New', Courier, monospace",
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
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%) rotate(-25deg)',
      fontSize: '72px',
      fontWeight: '700',
      letterSpacing: '8px',
      color: 'rgba(74,124,89,0.12)',
      border: '6px solid rgba(74,124,89,0.09)',
      padding: '4px 16px',
      borderRadius: '3px',
      whiteSpace: 'nowrap' as const,
      pointerEvents: 'none' as const,
      zIndex: 5,
    },
    header: {
      background: '#2a1a08',
      color: '#7AB648',
      textAlign: 'center' as const,
      padding: '10px 16px',
      fontSize: '14px',
      letterSpacing: '3px',
      fontWeight: '700',
      borderBottom: '2px solid #7a6340',
    },
    meta: {
      padding: '8px 20px',
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      fontSize: '13px',
      color: '#6b4f28',
      borderBottom: '1px dashed #9a7d52',
    },
    urgentBar: {
      textAlign: 'center' as const,
      fontSize: '13px',
      letterSpacing: '3px',
      fontWeight: '700',
      color: '#2a1a08',
      padding: '8px 20px',
      borderBottom: '1px solid #9a7d52',
      background: 'rgba(120,90,40,0.08)',
    },
    body: {
      padding: '20px 24px',
      display: 'flex' as const,
      flexDirection: 'column' as const,
      gap: '12px',
    },
    label: {
      color: '#5C3317',
      minWidth: '68px',
      letterSpacing: '1px',
      textDecoration: 'underline dotted',
      fontWeight: '700',
      flexShrink: 0,
      fontSize: '14px',
    },
    value: {
      fontWeight: '700',
      letterSpacing: '2px',
      color: '#5C3317',
      fontSize: '14px',
    },
    divider: { borderTop: '1px dashed #9a7d52', margin: '2px 0' },
    endBar: {
      textAlign: 'center' as const,
      fontSize: '13px',
      letterSpacing: '3px',
      fontWeight: '700',
      color: '#2a1a08',
      padding: '8px 20px',
      borderTop: '1px solid #9a7d52',
      borderBottom: '1px solid #9a7d52',
      background: 'rgba(120,90,40,0.08)',
    },
    footer: {
      background: '#2a1a08',
      color: '#7AB648',
      padding: '8px 16px',
      fontSize: '12px',
      letterSpacing: '2px',
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      borderTop: '2px solid #7a6340',
    },
    msg1: { fontSize: '14px', fontWeight: '700', letterSpacing: '2px', lineHeight: '1.7', color: '#5C3317' },
    msg2: { fontSize: '15px', fontWeight: '700', letterSpacing: '2px', lineHeight: '1.7', color: '#5C3317' },
    msg3: { fontSize: '16px', fontWeight: '700', letterSpacing: '2px', lineHeight: '1.7', color: '#5C3317' },
  };

  // ─── Dark styles ─────────────────────────────────────────────
  const dark = {
    outer: {
      background: '#1a1208',
      border: '1px solid #4a3820',
      borderRadius: '2px',
      boxShadow: '0 0 30px rgba(200,140,40,0.1), 4px 4px 0 #0a0804',
      fontFamily: "'Courier New', Courier, monospace",
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
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%) rotate(-25deg)',
      fontSize: '72px',
      fontWeight: '700',
      letterSpacing: '8px',
      color: 'rgba(220,60,40,0.16)',
      border: '6px solid rgba(220,60,40,0.12)',
      padding: '4px 16px',
      borderRadius: '3px',
      whiteSpace: 'nowrap' as const,
      pointerEvents: 'none' as const,
      zIndex: 5,
    },
    header: {
      background: '#0a0804',
      color: '#c8a050',
      textAlign: 'center' as const,
      padding: '10px 16px',
      fontSize: '14px',
      letterSpacing: '3px',
      fontWeight: '700',
      borderBottom: '1px solid #4a3820',
    },
    meta: {
      padding: '8px 20px',
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      fontSize: '13px',
      color: '#a08848',
      borderBottom: '1px dashed #3a2c14',
    },
    urgentBar: {
      textAlign: 'center' as const,
      fontSize: '13px',
      letterSpacing: '3px',
      fontWeight: '700',
      color: '#e8c060',
      padding: '8px 20px',
      borderBottom: '1px solid #3a2c14',
      background: 'rgba(200,140,40,0.06)',
    },
    body: {
      padding: '20px 24px',
      display: 'flex' as const,
      flexDirection: 'column' as const,
      gap: '12px',
    },
    label: {
      color: '#c8a050',
      minWidth: '68px',
      letterSpacing: '1px',
      textDecoration: 'underline dotted',
      fontWeight: '700',
      flexShrink: 0,
      fontSize: '14px',
    },
    value: {
      fontWeight: '700',
      letterSpacing: '2px',
      color: '#c8a050',
      fontSize: '14px',
    },
    divider: { borderTop: '1px dashed #3a2c14', margin: '2px 0' },
    endBar: {
      textAlign: 'center' as const,
      fontSize: '13px',
      letterSpacing: '3px',
      fontWeight: '700',
      color: '#e8c060',
      padding: '8px 20px',
      borderTop: '1px solid #3a2c14',
      borderBottom: '1px solid #3a2c14',
      background: 'rgba(200,140,40,0.06)',
    },
    footer: {
      background: '#0a0804',
      color: '#a08848',
      padding: '8px 16px',
      fontSize: '12px',
      letterSpacing: '2px',
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      borderTop: '1px solid #4a3820',
    },
    msg1: { fontSize: '14px', fontWeight: '700', letterSpacing: '2px', lineHeight: '1.7', color: '#c8a050' },
    msg2: { fontSize: '15px', fontWeight: '700', letterSpacing: '2px', lineHeight: '1.7', color: '#c8a050' },
    msg3: { fontSize: '16px', fontWeight: '700', letterSpacing: '2px', lineHeight: '1.7', color: '#c8a050' },
  };

  const s = isDark ? dark : light;

  return (
    <section aria-label="Message from Roll 4 Nature">
      <div style={s.outer}>

        {/* Texture layers */}
        <div aria-hidden="true" style={{ ...s.grain, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
        <div aria-hidden="true" style={{ ...s.stain, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

        {/* URGENT watermark */}
        <div role="img" aria-label="Urgent stamp" style={s.watermark}>URGENT</div>

        {/* All content above textures */}
        <div style={{ position: 'relative', zIndex: 4 }}>

          {/* Header */}
          <div style={s.header}>ROLL 4 NATURE TELEGRAM</div>

          {/* Meta row */}
          <div style={s.meta}>
            <span>RCVD: ALL STATIONS</span>
            <span>NO. 2026-R4N</span>
            <span>FEB 27, 2026</span>
          </div>

          {/* Urgent bar */}
          <div style={s.urgentBar}>━━━ URGENT MESSAGE FOLLOWS ━━━</div>

          {/* Body */}
          <div style={s.body}>

            {/* FROM */}
            <div style={row}>
              <span style={s.label}>FROM:</span>
              <span style={s.value}>ROLL 4 NATURE</span>
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
              <span style={{ ...s.label, paddingTop: '2px' }}>MSG:</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={s.msg1}>GET OUTSIDE!</span>
                <span style={s.msg2}>DISCOVER PURPOSE.</span>
                <span style={s.msg3}>NATURE IS EVERYTHING.</span>
              </div>
            </div>

          </div>

          {/* End bar */}
          <div style={s.endBar}>━━━━━━━━ END ━━━━━━━━</div>

          {/* Footer */}
          <div style={s.footer}>
            <span>FILED: KEY WEST FL</span>
            <span>R4N.SONGSEEKERS.ORG</span>
            <span>DEST: FLAGSTAFF AZ</span>
          </div>

        </div>
      </div>
    </section>
  );
}
