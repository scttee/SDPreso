'use client';
import { useEffect, useMemo, useState } from 'react';
import { polls } from '@/lib/interactions';
import { State, emptyState, loadState, subscribe } from '@/lib/store';

export default function Presenter(){
  const [state,setState]=useState<State>(emptyState);
  useEffect(()=>{setState(loadState()); return subscribe(setState);},[]);
  const shared = state.workshop.filter(w=>w.shared);
  return <main className='min-h-screen p-8 bg-[#0f141a] text-[#f2eee7]'><h1 className='text-3xl mb-6'>Live audience board</h1><section className='grid md:grid-cols-2 gap-6'>{Object.entries(polls).map(([k,p])=><PollCard key={k} title={p.question} results={state.polls[k]||{}} options={p.options}/>)}</section><section className='mt-8'><h2 className='text-2xl mb-4'>Workshop shared ideas</h2><div className='grid md:grid-cols-3 gap-4'>{shared.map(s=><article key={s.id} className='bg-white/10 backdrop-blur border border-white/20 p-4'><p className='text-xs uppercase text-slate-300'>{s.team||'Team'}</p><p className='mt-2'><strong>Service:</strong> {s.service}</p><p><strong>Challenge:</strong> {s.friction}</p><p><strong>How might we:</strong> {s.hmw}</p><p><strong>Idea:</strong> {s.idea}</p></article>)}</div></section><section className='mt-8'><h2 className='text-2xl mb-4'>Takeaways</h2><div className='flex flex-wrap gap-3'>{state.takeaways.map(t=><div key={t.id} className='px-4 py-2 bg-[#274d8a]/30 border border-[#274d8a]/60'>{t.text}</div>)}</div></section></main>
}

function PollCard({title,results,options}:{title:string;results:Record<string,number>;options:string[]}){
  const total = useMemo(()=>Object.values(results).reduce((a,b)=>a+b,0),[results]);
  return <div className='bg-white/8 border border-white/20 p-5'><p className='text-lg mb-4'>{title}</p><div className='space-y-2'>{options.map(o=>{const c=results[o]||0; const pct=total?Math.round(c/total*100):0; return <div key={o}><div className='flex justify-between text-sm'><span>{o}</span><span>{pct}%</span></div><div className='h-2 bg-white/15'><div className='h-2 bg-[#4d78bf] transition-all' style={{width:`${pct}%`}}/></div></div>})}</div></div>
}
