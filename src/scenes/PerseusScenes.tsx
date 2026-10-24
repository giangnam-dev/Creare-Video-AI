import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {AudioLines, SlidersHorizontal, ThumbsUp, Volume2} from 'lucide-react';
import {COLORS} from './tokens';

const reveal = (frame: number, offset = 36) => interpolate(frame, [0, 20], [offset, 0], {
  easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
});
const opacityIn = (frame: number, delay = 0) => interpolate(frame, [delay, delay + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Stars: React.FC<{count?: number; drift?: number}> = ({count = 48, drift = 0.5}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
    {Array.from({length: count}, (_, i) => {
      const x = (i * 151.7 + 9) % 100;
      const y = (i * 77.3 + frame * drift * (i % 4 + 1) * 0.012) % 100;
      const size = i % 13 === 0 ? 3 : i % 3 === 0 ? 2 : 1.4;
      return <div key={i} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: size, height: size, borderRadius: '50%', background: i % 7 === 0 ? COLORS.cyan : '#DCE7FF', opacity: 0.24 + (i % 5) * 0.12, boxShadow: i % 13 === 0 ? `0 0 12px ${COLORS.cyan}` : undefined}} />;
    })}
  </AbsoluteFill>;
};

const Heading: React.FC<{children: React.ReactNode; size?: number; align?: 'center' | 'left'}> = ({children, size = 62, align = 'center'}) => (
  <div style={{fontFamily: 'Arial, sans-serif', fontSize: size, fontWeight: 800, lineHeight: 1.06, letterSpacing: -1.5, color: COLORS.text, textAlign: align, textShadow: '0 4px 30px #000B'}}>{children}</div>
);
const Eyebrow: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = COLORS.cyan}) => (
  <div style={{fontFamily: 'Arial, sans-serif', fontSize: 20, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color}}>{children}</div>
);

const BlackHole: React.FC<{size: number; xray?: boolean}> = ({size, xray = false}) => {
  const frame = useCurrentFrame();
  const pulse = 0.84 + Math.sin(frame * 0.32) * 0.12;
  return <div style={{position: 'relative', width: size * 1.5, height: size * 1.5, display: 'grid', placeItems: 'center'}}>
    <div style={{position: 'absolute', width: size * 1.5, height: size * 0.6, borderRadius: '50%', transform: `rotate(-18deg)`, background: `conic-gradient(from ${frame * 2}deg, transparent, ${xray ? COLORS.purple : COLORS.cyan}99, #FFFFFF, ${COLORS.red}88, transparent 72%)`, filter: 'blur(12px)', opacity: pulse}} />
    <div style={{position: 'absolute', width: size * 1.42, height: size * 0.44, border: `3px solid ${COLORS.cyan}88`, borderRadius: '50%', transform: 'rotate(-18deg)', boxShadow: `0 0 25px ${COLORS.cyan}77`}} />
    <div style={{position: 'relative', width: size, height: size, borderRadius: '50%', background: 'radial-gradient(circle at 42% 43%, #000 0 49%, #01030B 60%, #17203B 68%, #050711 74%)', boxShadow: `0 0 ${size * 0.42}px #050713, 0 0 ${size * 0.2}px ${COLORS.blue}66`}} />
  </div>;
};

const Waveform: React.FC<{width: number; height: number; frame: number; color?: string; density?: number; amplitude?: number}> = ({width, height, frame, color = COLORS.cyan, density = 5, amplitude = 1}) => {
  const points = Array.from({length: 120}, (_, i) => {
    const x = (i / 119) * width;
    const envelope = 0.28 + 0.72 * Math.pow(Math.sin((i / 119) * Math.PI), 0.7);
    const y = height / 2 + Math.sin(i * density * 0.19 + frame * 0.16) * height * 0.39 * envelope * amplitude
      + Math.sin(i * density * 0.47 - frame * 0.1) * height * 0.11 * amplitude;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{overflow: 'visible'}}>
    <path d={points} fill="none" stroke={color} strokeWidth="8" opacity=".16" filter="blur(8px)" />
    <path d={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>;
};

export const Scene1BlackHoleHook: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 49%, #11182B 0%, #050711 50%, #010207 100%)'}}>
    <Stars count={72} drift={1.2} />
    <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', opacity: opacityIn(f), transform: `translateY(${reveal(f)}px)`}}>
      <Eyebrow>NASA DATA SONIFICATION · PERSEUS</Eyebrow>
      <div style={{marginTop: 28}}><Heading size={68}>A BLACK HOLE<br/>HAS A SOUND.</Heading></div>
    </div>
    <div style={{position: 'absolute', top: 910, left: '50%', transform: 'translate(-50%,-50%) scale(1.12)'}}><BlackHole size={300} xray /></div>
    <div style={{position: 'absolute', top: 910, left: 65, right: 65, transform: 'translateY(-50%)'}}><Waveform width={950} height={310} frame={f} density={7} amplitude={1.12} /></div>
    <div style={{position: 'absolute', top: 1248, width: '100%', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 23, color: COLORS.muted, letterSpacing: 3}}>PRESSURE WAVES · HOT CLUSTER GAS</div>
  </AbsoluteFill>;
};

export const Scene2PerseusCluster: React.FC = () => {
  const f = useCurrentFrame();
  const sweep = interpolate(f, [0, 150], [-24, 24], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 55%, #172343 0%, #060A17 59%, #010207 100%)'}}>
    <Stars count={45} drift={0.35} />
    <div style={{position: 'absolute', top: 310, left: 88, right: 88, opacity: opacityIn(f)}}>
      <Eyebrow>THE PERSEUS GALAXY CLUSTER</Eyebrow>
      <div style={{marginTop: 24}}><Heading align="left" size={60}>240 MILLION<br/>LIGHT-YEARS AWAY</Heading></div>
    </div>
    <div style={{position: 'absolute', left: '50%', top: 990, width: 640, height: 420, transform: `translate(-50%,-50%) rotate(${sweep}deg)`}}>
      {Array.from({length: 48}, (_, i) => {
        const angle = i * 2.399;
        const radius = 25 + Math.sqrt(i / 48) * 285;
        const x = 320 + Math.cos(angle) * radius;
        const y = 210 + Math.sin(angle) * radius * 0.62;
        const starSize = 3 + (i % 6) * 1.5;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: starSize, height: starSize, borderRadius: '50%', background: i % 4 === 0 ? '#C2A9FF' : '#96D8FF', boxShadow: `0 0 ${8 + i % 7 * 2}px ${i % 4 === 0 ? COLORS.purple : COLORS.cyan}`, opacity: 0.4 + (i % 5) * 0.1}} />;
      })}
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}><BlackHole size={178} /></div>
      {[0, 1, 2].map((ring) => <div key={ring} style={{position: 'absolute', inset: 35 + ring * 48, border: `1px solid ${COLORS.cyan}${ring === 0 ? '65' : '32'}`, borderRadius: '50%', transform: `scaleY(.62) rotate(${f * (ring % 2 ? -0.12 : 0.16)}deg)`}} />)}
    </div>
    <div style={{position: 'absolute', top: 1282, left: 110, right: 110, display: 'flex', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif', fontSize: 20, letterSpacing: 2, color: COLORS.muted}}><span>CHANDRA X-RAY DATA</span><span>HOT GAS · PRESSURE WAVES</span></div>
  </AbsoluteFill>;
};

export const Scene3AudioFilterDashboard: React.FC = () => {
  const f = useCurrentFrame();
  const show = interpolate(f, [80, 105], [0, 1], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pressed = interpolate(f, [116, 123, 139, 147], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const line = interpolate(f, [95, 160], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 51%, #142447 0%, #050916 58%, #010207 100%)'}}>
    <Stars count={38} drift={0.2} />
    <div style={{position: 'absolute', top: 320, width: '100%', textAlign: 'center', transform: `translateY(${reveal(f)}px)`, opacity: opacityIn(f)}}>
      <Eyebrow color={COLORS.red}>INCOMING COSMIC SIGNAL</Eyebrow>
      <div style={{marginTop: 24}}><Heading size={60}>ENGAGE SHIP<br/>AUDIO FILTERS</Heading></div>
    </div>
    <div style={{position: 'absolute', top: 710, left: 76, right: 76, height: 470, padding: 5, borderRadius: 38, opacity: show, transform: `translateY(${interpolate(show, [0, 1], [130, 0])}px) scale(${0.94 + show * 0.06})`, background: `linear-gradient(135deg,${COLORS.cyan},#446DDE,${COLORS.red})`, boxShadow: `0 0 60px ${COLORS.cyan}33`}}>
      <div style={{height: '100%', borderRadius: 34, padding: '35px 34px', boxSizing: 'border-box', background: 'linear-gradient(145deg,#111E37,#050A14)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: COLORS.muted, fontFamily: 'Arial, sans-serif', fontSize: 19, letterSpacing: 2}}><span>VESSEL AUDIO CONTROL</span><SlidersHorizontal size={24} color={COLORS.cyan} /></div>
        <div style={{height: 1, background: '#FFFFFF22', margin: '22px 0 28px'}} />
        <div style={{display: 'flex', gap: 18, height: 165}}>
          <div style={{flex: 1, border: `1px solid ${COLORS.cyan}77`, borderRadius: 22, background: '#142D49', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${pressed * 5}px)`, boxShadow: `inset 0 0 ${pressed * 28}px ${COLORS.cyan}33`}}><ThumbsUp size={48} color={COLORS.cyan} fill={pressed ? COLORS.cyan : 'none'} /><span style={{fontFamily: 'Arial, sans-serif', color: COLORS.text, marginTop: 14, fontWeight: 700, letterSpacing: 2}}>LIKE</span></div>
          <div style={{flex: 1.5, borderRadius: 22, background: COLORS.red, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', transform: `translateY(${pressed * 5}px)`, boxShadow: `0 10px 34px ${COLORS.red}55`}}><strong style={{fontFamily: 'Arial, sans-serif', fontSize: 28}}>SUBSCRIBE</strong><span style={{fontFamily: 'Arial, sans-serif', fontSize: 15, letterSpacing: 2, marginTop: 9}}>FILTERS READY</span></div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 29, fontFamily: 'Arial, sans-serif', color: COLORS.cyan}}><Volume2 size={23} /><span style={{fontSize: 18, letterSpacing: 2}}>SIGNAL FILTER</span><div style={{marginLeft: 'auto', width: '37%', height: 8, background: '#192942', borderRadius: 8}}><div style={{width: `${line * 100}%`, height: '100%', background: COLORS.cyan, borderRadius: 8, boxShadow: `0 0 14px ${COLORS.cyan}`}} /></div></div>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1250, width: '100%', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 21, color: COLORS.muted, letterSpacing: 3}}>FILTER ARRAY · ONLINE</div>
  </AbsoluteFill>;
};

export const Scene4GasWavefront: React.FC = () => {
  const f = useCurrentFrame();
  const wave = interpolate(f, [0, 150], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: 'radial-gradient(ellipse at 48% 56%, #101B38 0%, #040814 60%, #010207 100%)'}}>
    <Stars count={46} drift={0.3} />
    <div style={{position: 'absolute', top: 300, left: 90, right: 90}}><Eyebrow>SPACE IS MOSTLY A VACUUM</Eyebrow><div style={{marginTop: 22}}><Heading align="left" size={58}>BUT THIS CLUSTER<br/>IS FILLED WITH GAS</Heading></div></div>
    <div style={{position: 'absolute', top: 980, left: '50%', transform: 'translate(-50%,-50%)'}}><BlackHole size={145} /></div>
    {[0, 1, 2, 3, 4].map((i) => {
      const size = 220 + ((f * 4 + i * 180) % 680);
      const fade = 1 - ((f * 4 + i * 180) % 680) / 680;
      return <div key={i} style={{position: 'absolute', top: 980, left: '50%', width: size, height: size, border: `2px solid ${i % 2 ? COLORS.purple : COLORS.cyan}`, borderRadius: '50%', opacity: fade * wave * 0.6, transform: 'translate(-50%,-50%) scaleY(.76)', boxShadow: `0 0 22px ${i % 2 ? COLORS.purple : COLORS.cyan}55`}} />;
    })}
    <div style={{position: 'absolute', top: 1350, left: 105, right: 105, opacity: opacityIn(f, 24)}}><Waveform width={870} height={110} frame={f} density={2.5} amplitude={0.52} color={COLORS.purple} /></div>
    <div style={{position: 'absolute', top: 1254, width: '100%', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 23, letterSpacing: 3, color: COLORS.cyan}}>GAS CARRIES THE PRESSURE RIPPLE</div>
  </AbsoluteFill>;
};

export const Scene5PitchShift: React.FC = () => {
  const f = useCurrentFrame();
  const progress = interpolate(f, [0, 90], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateRight: 'clamp'});
  const pitch = Math.floor(progress * 57);
  return <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 52%, #18223E 0%, #050916 60%, #010207 100%)'}}>
    <Stars count={42} drift={0.25} />
    <div style={{position: 'absolute', top: 310, width: '100%', textAlign: 'center'}}><Eyebrow>SHIFT THE SIGNAL INTO RANGE</Eyebrow><div style={{marginTop: 20}}><Heading size={58}>57 OCTAVES UP</Heading></div></div>
    <div style={{position: 'absolute', top: 760, left: 140, right: 140, display: 'flex', alignItems: 'center', gap: 35}}>
      <div style={{fontFamily: 'Arial, sans-serif', color: COLORS.muted, fontSize: 19, textAlign: 'center', width: 150}}>TOO LOW<br/>TO HEAR</div>
      <div style={{flex: 1, position: 'relative', height: 440, borderLeft: '3px solid #50607D'}}>
        {Array.from({length: 12}, (_, i) => <div key={i} style={{position: 'absolute', left: -10, top: `${i * 9}%`, width: i % 3 === 0 ? 24 : 12, height: 2, background: '#8291AA'}} />)}
        <div style={{position: 'absolute', left: 30, right: 0, bottom: 10, height: 42, opacity: 1 - progress * 0.85}}><Waveform width={500} height={42} frame={f} density={1.2} amplitude={0.28} color={COLORS.purple} /></div>
        <div style={{position: 'absolute', left: 30, right: 0, top: 12, height: 86, opacity: progress}}><Waveform width={500} height={86} frame={f} density={6} amplitude={0.9} color={COLORS.cyan} /></div>
        <div style={{position: 'absolute', left: 5, bottom: `${progress * 88}%`, transform: 'translate(-50%,50%)', width: 20, height: 20, borderRadius: '50%', background: COLORS.cyan, boxShadow: `0 0 26px ${COLORS.cyan}`}} />
      </div>
      <div style={{fontFamily: 'Arial, sans-serif', color: COLORS.cyan, fontSize: 19, textAlign: 'center', width: 150}}>HUMAN<br/>HEARING</div>
    </div>
    <div style={{position: 'absolute', top: 1280, width: '100%', textAlign: 'center', fontFamily: 'Arial, sans-serif', color: COLORS.text, fontSize: 30, letterSpacing: 2}}>+ <strong style={{color: COLORS.cyan, fontSize: 52}}>{pitch}</strong> OCTAVES</div>
  </AbsoluteFill>;
};

export const Scene6Listen: React.FC<{slug: string}> = ({slug}) => {
  const f = useCurrentFrame();
  const pulse = 0.86 + 0.14 * Math.sin(f * 0.16);
  return <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 51%, #111C35 0%, #040711 58%, #010207 100%)'}}>
    <Stars count={58} drift={0.18} />
    <div style={{position: 'absolute', top: 370, width: '100%', textAlign: 'center', opacity: opacityIn(f)}}><Eyebrow>NASA / CHANDRA SONIFICATION</Eyebrow><div style={{marginTop: 20}}><Heading size={56}>THE COSMIC<br/>HEARTBEAT</Heading></div></div>
    <div style={{position: 'absolute', left: '50%', top: 950, width: 430, height: 430, transform: `translate(-50%,-50%) scale(${pulse})`}}>
      {Array.from({length: 7}, (_, i) => <div key={i} style={{position: 'absolute', inset: i * 27, border: `2px solid ${i % 2 ? COLORS.purple : COLORS.cyan}`, borderRadius: '50%', opacity: 0.58 - i * 0.055, transform: `scaleY(.74) rotate(${f * (i % 2 ? -0.25 : 0.18)}deg)`, boxShadow: `0 0 28px ${i % 2 ? COLORS.purple : COLORS.cyan}44`}} />)}
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}><BlackHole size={152} xray /></div>
    </div>
    <div style={{position: 'absolute', top: 1235, left: 62, right: 62}}><Waveform width={956} height={150} frame={f} density={8} amplitude={0.86} /></div>
    <div style={{position: 'absolute', top: 1400, width: '100%', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 17, letterSpacing: 1.5, color: COLORS.muted}}>DATA SONIFICATION: NASA/CXC/SAO · SYSTEM Sounds</div>
    <Audio src={staticFile(`${slug}/perseus-excerpt.mp3`)} volume={(frame) => interpolate(frame, [0, 10, 96, 108, 159], [0, 0.13, 0.13, 0.62, 0.52], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
  </AbsoluteFill>;
};
