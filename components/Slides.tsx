'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { slides } from '@/content/slides';

function SlideBody({ slide }: { slide: (typeof slides)[number] }) {
  const [active, setActive] = useState(0);
  const [inside, setInside] = useState(true);
  const [stage, setStage] = useState(0);
  const [timer, setTimer] = useState(300);
  const [running, setRunning] = useState(false);
  useEffect(() => { if(!running) return; const i=setInterval(()=>setTimer(t=>Math.max(0,t-1)),1000); return ()=>clearInterval(i);}, [running]);

  if (slide.type === 'timeline') return <ul className='space-y-4'>{slide.data.items.map((i:string)=><li key={i} className='border-l-2 border-slate pl-4'>{i}</li>)}</ul>;
  if (slide.type === 'constellation') return <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>{slide.data.items.map(([k,v]:[string,string],idx:number)=><button key={k} onMouseEnter={()=>setActive(idx)} onClick={()=>setActive(idx)} className={`rounded-full border px-3 py-2 text-left ${active===idx?'border-accent text-accent':'border-slate/40'}`}>{k}</button>)}<p className='col-span-full text-slate mt-4'>{slide.data.items[active][1]}</p></div>;
  if (slide.type === 'bullets') return <><ul className='space-y-2'>{slide.data.bullets.map((b:string)=><li key={b}>• {b}</li>)}</ul>{slide.data.closing && <p className='mt-6 text-slate'>{slide.data.closing}</p>}</>;
  if (slide.type === 'toggle') return <div><div className='mb-4 flex gap-2'><button onClick={()=>setInside(true)} className={`px-4 py-2 rounded ${inside?'bg-charcoal text-paper':'bg-slate/10'}`}>Inside view</button><button onClick={()=>setInside(false)} className={`px-4 py-2 rounded ${!inside?'bg-charcoal text-paper':'bg-slate/10'}`}>Outside view</button></div><ul className='space-y-2'>{(inside?slide.data.inside:slide.data.outside).map((t:string)=><li key={t}>• {t}</li>)}</ul><p className='mt-6 text-slate'>{slide.data.closing}</p></div>;
  if (slide.type === 'layers') return <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>{slide.data.layers.map((l:string)=><div key={l} className='border border-slate/30 rounded p-3 text-sm'>{l}</div>)}</div>;
  if (slide.type === 'progression') return <div><div className='flex flex-wrap gap-3'>{slide.data.items.map((i:string)=><div key={i} className='px-4 py-2 border border-slate/40 rounded-full'>{i}</div>)}</div><p className='mt-6 text-slate'>{slide.data.footer}</p></div>;
  if (slide.type === 'diamond') { const s=slide.data.stages[stage]; return <div><div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-5'>{slide.data.stages.map((st:any,i:number)=><button key={st.name} onClick={()=>setStage(i)} className={`p-3 border rotate-45 aspect-square ${stage===i?'border-accent':'border-slate/30'}`}><span className='-rotate-45 block text-sm'>{st.name}</span></button>)}</div><p><strong>{s.question}</strong></p><p className='text-slate'>{s.explanation}</p><p className='text-accent mt-2'>If skipped: {s.risk}</p></div>; }
  if (slide.type === 'cards') return <div className='grid md:grid-cols-3 gap-4'>{slide.data.cards.map((c:string)=><div key={c} className='p-5 border border-slate/30 rounded-xl'>{c}</div>)}</div>;
  if (slide.type === 'beforeAfter') return <BeforeAfter />;
  if (slide.type === 'table') return <table className='w-full text-sm border-collapse'><thead><tr><th className='text-left p-2 border-b'>Inside-out</th><th className='text-left p-2 border-b'>Designed for use</th></tr></thead><tbody>{[['organised by team','organised by user need'],['assumes prior knowledge','explains the path'],['repeats information','reuses what is known'],['sends generic messages','gives clear next steps'],['digitises complexity','reduces complexity'],['measures activity','measures experience and outcomes']].map(r=><tr key={r[0]}><td className='p-2 border-b'>{r[0]}</td><td className='p-2 border-b'>{r[1]}</td></tr>)}</tbody></table>;
  if (slide.type === 'steps') return <ol className='space-y-2 list-decimal pl-5'>{slide.data.steps.map((s:string)=><li key={s}>{s}</li>)}</ol>;
  if (slide.type === 'process') return <div><div className='flex gap-2 flex-wrap'>{slide.data.items.map((i:string)=><span key={i} className='px-3 py-2 border rounded-full'>{i}</span>)}</div><div className='mt-4'><button className='text-sm underline' onClick={()=>setRunning(!running)}>{running?'Pause':'Start'} timer</button><span className='ml-3 tabular-nums'>{Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}</span></div></div>;
  return slide.subtitle ? <p className='text-slate'>{slide.subtitle}</p> : null;
}

function BeforeAfter(){ const [v,setV]=useState(45); return <div><input type='range' min={0} max={100} value={v} onChange={e=>setV(Number(e.target.value))} className='w-full'/><div className='grid grid-cols-2 gap-4 mt-4 text-sm'><div><h4 className='font-semibold mb-2'>Before</h4><ul><li>Unclear entry points</li><li>Repeated triage</li><li>Contact centre escalation</li></ul></div><div><h4 className='font-semibold mb-2'>After</h4><ul><li>Clear intent-based choices</li><li>Better routing and context reuse</li><li>Fewer avoidable contacts</li></ul></div></div></div>}

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

  return <div className={`${present?'bg-paper':'slide-grid bg-paper'} text-charcoal`}><div className='fixed top-0 left-0 h-1 bg-accent z-40' style={{width:`${progress}%`}}/><button onClick={()=>setOverview(v=>!v)} className='fixed top-4 right-4 text-xs border px-2 py-1 rounded'>Overview</button><button onClick={()=>setPresent(v=>!v)} className='fixed top-4 right-24 text-xs border px-2 py-1 rounded'>{present?'Exit':'Present'}</button>{overview && <aside className='fixed z-30 top-12 right-4 bg-paper border p-3 max-h-[70vh] overflow-auto w-72'>{slides.map((s,i)=><button key={s.id} className='block w-full text-left text-sm py-1 hover:text-accent' onClick={()=>refs.current[i]?.scrollIntoView({behavior:'smooth'})}>{i+1}. {s.title}</button>)}</aside>}<main className='snap-y snap-mandatory h-screen overflow-y-scroll'>{slides.map((slide,i)=><section data-i={i} key={slide.id} ref={el=>refs.current[i]=el} className='snap-start min-h-screen flex items-center'><div className='max-w-5xl w-full mx-auto px-10 py-20'><p className='text-xs uppercase tracking-[0.2em] text-slate mb-4'>{String(i+1).padStart(2,'0')} / {slides.length}</p><h1 className='text-4xl md:text-6xl font-semibold leading-tight max-w-4xl'>{slide.title}</h1>{slide.subtitle && <p className='mt-4 text-xl text-slate max-w-3xl'>{slide.subtitle}</p>}<div className='mt-10 text-lg'><SlideBody slide={slide}/></div></div></section>)}</main></div>;
}
