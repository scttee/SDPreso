'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { slides } from '@/content/slides';

const tokens = {
  ease: 'cubic-bezier(0.22,0.8,0.2,1)',
};

function SlideBody({ slide }: { slide: (typeof slides)[number] }) {
  const [active, setActive] = useState(0);
  const [inside, setInside] = useState(true);
  const [stage, setStage] = useState(0);
  const [timer, setTimer] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(i);
  }, [running]);

  if (slide.type === 'timeline') return <div className='relative'><div className='line-in h-px bg-slate/40 mb-6' /> <ul className='grid md:grid-cols-5 gap-3'>{slide.data.items.map((i:string,idx:number)=><li key={i} className='reveal border-l md:border-l-0 md:border-t border-slate/35 pt-3 md:pt-4 pl-3 md:pl-0' style={{animationDelay:`${idx*80}ms`}}><span className='text-xs uppercase tracking-[0.15em] text-slate'>0{idx+1}</span><p className='mt-1'>{i}</p></li>)}</ul></div>;
  if (slide.type === 'constellation') return <div className='relative min-h-[360px] slide-panel rounded-2xl p-6'><div className='absolute inset-0 opacity-30' style={{background:'radial-gradient(circle at center, rgba(39,77,138,.15), transparent 60%)'}}/><div className='relative text-center mb-4 text-xl font-semibold tracking-tight'>Designer</div><div className='grid grid-cols-2 md:grid-cols-4 gap-3 relative'>{slide.data.items.map(([k]:[string,string],idx:number)=><button key={k} onMouseEnter={()=>setActive(idx)} onClick={()=>setActive(idx)} className={`reveal rounded-full border px-3 py-2 transition-all duration-300 ${active===idx?'border-[#274d8a] text-[#274d8a] scale-[1.03] bg-white/70':'border-slate/40 hover:border-slate/70'}`} style={{animationDelay:`${idx*45}ms`}}>{k}</button>)}</div><p className='mt-6 text-slate reveal'>{slide.data.items[active][1]}</p></div>;
  if (slide.type === 'bullets') return <ul className='space-y-3'>{slide.data.bullets.map((b:string,idx:number)=><li key={b} className='reveal flex items-start gap-3' style={{animationDelay:`${idx*70}ms`}}><span className='mt-2 h-px w-7 bg-[#8a4a36] inline-block'/> {b}</li>)}</ul>;
  if (slide.type === 'toggle') return <div className='slide-panel rounded-2xl p-6'><div className='mb-5 inline-flex gap-2 rounded-full border border-slate/30 p-1'><button onClick={()=>setInside(true)} className={`px-4 py-2 rounded-full transition ${inside?'bg-[#161a1f] text-[#f2eee7]':'text-slate'}`}>Inside view</button><button onClick={()=>setInside(false)} className={`px-4 py-2 rounded-full transition ${!inside?'bg-[#161a1f] text-[#f2eee7]':'text-slate'}`}>Outside view</button></div><div className='grid md:grid-cols-4 gap-3'>{(inside?slide.data.inside:slide.data.outside).map((t:string,idx:number)=><div key={t} className='reveal border border-slate/25 p-4' style={{animationDelay:`${idx*70}ms`}}>{t}</div>)}</div><p className='mt-6 text-slate'>{slide.data.closing}</p></div>;
  if (slide.type === 'layers') return <div className='relative'><div className='line-in h-px bg-slate/35 mb-5'/><div className='grid grid-cols-2 md:grid-cols-5 gap-3'>{slide.data.layers.map((l:string,idx:number)=><div key={l} className='reveal border border-slate/25 bg-white/45 p-3 text-sm hover:bg-white/70 transition' style={{animationDelay:`${idx*45}ms`}}>{l}</div>)}</div></div>;
  if (slide.type === 'progression') return <div><div className='line-in h-px bg-slate/35 mb-6'/><div className='grid md:grid-cols-4 gap-3'>{slide.data.items.map((i:string,idx:number)=><div key={i} className='reveal p-4 border border-slate/30' style={{animationDelay:`${idx*90}ms`}}>{i}</div>)}</div><p className='mt-6 text-slate'>{slide.data.footer}</p></div>;
  if (slide.type === 'diamond') { const s=slide.data.stages[stage]; return <div className='slide-panel rounded-2xl p-6'><div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>{slide.data.stages.map((st:any,i:number)=><button key={st.name} onClick={()=>setStage(i)} className={`aspect-square rotate-45 border transition-all duration-300 ${stage===i?'border-[#274d8a] shadow-[0_0_0_2px_rgba(39,77,138,.15)]':'border-slate/30'}`}><span className='-rotate-45 block text-sm'>{st.name}</span></button>)}</div><p className='text-2xl mb-2'>{s.question}</p><p className='text-slate'>{s.explanation}</p><p className='mt-3 text-[#8a4a36]'>If skipped: {s.risk}</p></div>; }
  if (slide.type === 'cards') return <div className='grid md:grid-cols-3 gap-4'>{slide.data.cards.map((c:string,idx:number)=><div key={c} className='reveal border border-slate/30 p-6 bg-white/55 hover:bg-white/80 transition' style={{animationDelay:`${idx*90}ms`}}>{c}</div>)}</div>;
  if (slide.type === 'beforeAfter') return <BeforeAfter />;
  if (slide.type === 'table') return <div className='slide-panel rounded-2xl p-5'><div className='grid grid-cols-2 text-sm uppercase tracking-[0.15em] text-slate pb-3 border-b border-slate/30'><p>Inside-out</p><p>Designed for use</p></div>{[['organised by team','organised by user need'],['assumes prior knowledge','explains the path'],['repeats information','reuses what is known'],['sends generic messages','gives clear next steps'],['digitises complexity','reduces complexity'],['measures activity','measures experience and outcomes']].map((r,idx)=><div key={r[0]} className='grid grid-cols-2 gap-8 py-3 border-b border-slate/20 hover:bg-white/40 transition reveal' style={{animationDelay:`${idx*70}ms`}}><p>{r[0]}</p><p>{r[1]}</p></div>)}</div>;
  if (slide.type === 'steps') return <ol className='space-y-3'>{slide.data.steps.map((s:string,idx:number)=><li key={s} className='reveal flex gap-4' style={{animationDelay:`${idx*80}ms`}}><span className='text-slate w-8'>{idx+1}.</span><span>{s}</span></li>)}</ol>;
  if (slide.type === 'process') return <div><div className='line-in h-px bg-slate/35 mb-4'/><div className='grid md:grid-cols-5 gap-2'>{slide.data.items.map((i:string,idx:number)=><span key={i} className='reveal px-3 py-2 border border-slate/30 text-center' style={{animationDelay:`${idx*70}ms`}}>{i}</span>)}</div><div className='mt-4'><button className='text-sm border px-3 py-1' onClick={()=>setRunning(!running)}>{running?'Pause':'Start'} timer</button><span className='ml-3 tabular-nums'>{Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}</span></div></div>;
  return slide.subtitle ? <p className='text-slate'>{slide.subtitle}</p> : null;
}

function BeforeAfter(){ const [v,setV]=useState(50); return <div className='slide-panel rounded-2xl p-6'><div className='flex justify-between text-xs uppercase tracking-[0.15em] text-slate'><span>Before</span><span>After</span></div><input type='range' min={0} max={100} value={v} onChange={e=>setV(Number(e.target.value))} className='w-full my-4 accent-[#274d8a]'/><div className='grid grid-cols-2 gap-6 text-sm'><div className='border-r border-slate/25 pr-4'><ul><li>Unclear entry points</li><li>Repeated triage</li><li>Contact centre escalation</li></ul></div><div><ul><li>Clear intent-based choices</li><li>Better routing and context reuse</li><li>Fewer avoidable contacts</li></ul></div></div></div>}

export default function Slides() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [overview, setOverview] = useState(false);
  const [present, setPresent] = useState(false);
  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', ' '].includes(e.key)) refs.current[Math.min(current + 1, slides.length - 1)]?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === 'ArrowLeft') refs.current[Math.max(current - 1, 0)]?.scrollIntoView({ behavior: 'smooth' });
      if (e.key.toLowerCase() === 'o') setOverview((v) => !v);
      if (e.key.toLowerCase() === 'p') setPresent((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  useEffect(() => {
    const io = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){const idx=Number((e.target as HTMLElement).dataset.i);setCurrent(idx);}})},{threshold:0.6});
    refs.current.forEach(r=>r&&io.observe(r)); return ()=>io.disconnect();
  }, []);


  useEffect(() => {
    const el = document.getElementById('deck-scroll');
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: 'smooth' });
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);
  return <div className='deck-bg text-[#161a1f]'><div className='fixed top-0 left-0 h-[2px] bg-[#274d8a] z-40 transition-all duration-500' style={{width:`${progress}%`, transitionTimingFunction:tokens.ease}}/><button onClick={()=>setOverview(v=>!v)} className='fixed top-5 right-4 text-[11px] uppercase tracking-[0.14em] border border-slate/35 bg-white/75 px-3 py-2 z-40'>Index</button><button onClick={()=>setPresent(v=>!v)} className='fixed top-5 right-24 text-[11px] uppercase tracking-[0.14em] border border-slate/35 bg-white/75 px-3 py-2 z-40'>{present?'Exit':'Present'}</button>{overview && <aside className='fixed z-40 top-16 right-4 bg-white/92 border border-slate/25 p-4 max-h-[72vh] overflow-auto w-80 backdrop-blur-sm'><p className='text-xs uppercase tracking-[0.15em] text-slate mb-3'>Slide index</p>{slides.map((s,i)=><button key={s.id} className={`block w-full text-left text-sm py-2 border-b border-slate/10 ${i===current?'text-[#274d8a]':''}`} onClick={()=>refs.current[i]?.scrollIntoView({behavior:'smooth'})}>{String(i+1).padStart(2,'0')} · {s.title}</button>)}</aside>}<main id='deck-scroll' className='snap-x snap-mandatory h-screen overflow-x-scroll overflow-y-hidden relative z-10 flex'>{slides.map((slide,i)=><section data-i={i} key={slide.id} ref={(el) => { refs.current[i] = el; }} className='snap-start min-h-screen min-w-full flex items-center'><div className='slide-shell max-w-6xl w-full mx-auto px-8 md:px-14 py-16 md:py-24'><p className='reveal text-[11px] uppercase tracking-[0.2em] text-slate mb-6'>{String(i+1).padStart(2,'0')} / {slides.length}</p><h1 className={`reveal text-4xl md:text-7xl font-semibold leading-[1.02] max-w-5xl ${i===0?'md:text-8xl':''}`}>{slide.title}</h1>{slide.subtitle && <p className='reveal reveal-delay-1 mt-5 text-lg md:text-2xl text-slate max-w-3xl'>{slide.subtitle}</p>}<div className='mt-10 md:mt-14 text-lg md:text-xl max-w-5xl'><SlideBody slide={slide}/></div></div></section>)}</main></div>;
}
