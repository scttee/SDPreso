'use client';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { polls } from '@/lib/interactions';
import { loadState, saveState } from '@/lib/store';

export default function InteractPage() {
  const { kind } = useParams<{ kind: string }>();
  const poll = polls[kind as keyof typeof polls];
  const [done, setDone] = useState(false);
  const [text, setText] = useState('');
  const [team, setTeam] = useState('');

  if (kind === 'workshop') return <Workshop />;
  if (kind === 'takeaway') return <Takeaway text={text} setText={setText} team={team} setTeam={setTeam} done={done} setDone={setDone} />;
  if (!poll) return <div className='p-8'>Unknown interaction.</div>;

  const vote = async (opt: string) => {
    await fetch('/api/live', { method: 'POST', headers: { 'content-type':'application/json' }, body: JSON.stringify({ type: 'vote', kind, option: opt }) });
    setDone(true);
  };

  return <main className='min-h-screen p-6 bg-[radial-gradient(circle_at_top,rgba(39,77,138,.18),transparent_60%),#f2eee7] text-[#161a1f]'><div className='max-w-md mx-auto pt-10'><p className='text-xs uppercase tracking-[.16em] text-slate-600'>Live check-in</p><h1 className='text-3xl font-semibold mt-3'>{poll.question}</h1>{done ? <p className='mt-6'>Thanks — your vote is in.</p> : <div className='mt-6 space-y-3'>{poll.options.map(o=><button key={o} onClick={()=>vote(o)} className='w-full text-left px-4 py-3 border border-slate-300 bg-white/80'>{o}</button>)}</div>}</div></main>;
}

function Workshop(){
  const [saved,setSaved]=useState(false);
  const [form,setForm]=useState({team:'',service:'',tryingToDo:'',friction:'',whereFriction:'',feel:'',hmw:'',idea:''});
  const submit=(shared:boolean)=>{const s=loadState(); s.workshop.unshift({id:crypto.randomUUID(),createdAt:Date.now(),shared,...form}); saveState(s); setSaved(true);};
  if(saved) return <main className='min-h-screen p-6 bg-[radial-gradient(circle_at_top,rgba(138,74,54,.18),transparent_60%),#f2eee7]'><div className='max-w-md mx-auto pt-20'><h1 className='text-3xl font-semibold'>Thanks. Your idea has been added.</h1><p className='mt-4 text-slate-700'>Good design often starts with better noticing, not better answers.</p></div></main>
  return <main className='min-h-screen p-6 bg-[radial-gradient(circle_at_top,rgba(39,77,138,.16),transparent_60%),#f2eee7] text-[#161a1f]'><div className='max-w-md mx-auto pb-12'><h1 className='text-3xl font-semibold mt-8'>Mini workshop</h1><p className='text-lg'>Redesign one frustrating service experience</p><p className='mt-4 text-slate-700'>You are about to run through a fast human-centred design exercise in pairs. Start with a real experience. Frame the challenge clearly. Generate options. Sketch one better version. Test it quickly.</p><div className='mt-4 grid gap-2 text-sm'><div className='p-3 border bg-white/70'><strong>1. Interview (3m)</strong> — Ask your partner about one frustrating service moment. Capture: task, friction, feeling, unmet need.</div><div className='p-3 border bg-white/70'><strong>2. Frame (2m)</strong> — Write one clear ‘How might we…’ question.</div><div className='p-3 border bg-white/70'><strong>3. Generate (3m)</strong> — Sketch 6 fast ideas on paper before choosing one.</div><div className='p-3 border bg-white/70'><strong>4. Sketch (2m)</strong> — Draw one better version.</div><div className='p-3 border bg-white/70'><strong>5. Test (2m)</strong> — Show partner, get feedback, refine.</div></div><Field l='1. Interview your partner (3 min) — What service experience are you discussing?' v={form.service} c={v=>setForm({...form,service:v})}/><Field l='Task — What were they trying to do?' v={form.tryingToDo} c={v=>setForm({...form,tryingToDo:v})}/><Field l='Friction — What got in the way?' v={form.friction} c={v=>setForm({...form,friction:v})}/><Field l='Where did confusion or effort show up?' v={form.whereFriction} c={v=>setForm({...form,whereFriction:v})}/><Field l='Feeling — How did it feel?' v={form.feel} c={v=>setForm({...form,feel:v})}/><Field l='2. Frame (2 min) — How might we…' v={form.hmw} c={v=>setForm({...form,hmw:v})}/><p className='mt-4 text-sm text-slate-700'>3. Generate ideas (3 min): write at least 6 ideas before choosing one (realistic, bold, communication, process, digital, staff-support).</p><p className='mt-2 text-sm text-slate-700'>5. Test and refine (2 min): would this help, what is missing, what would make it clearer?</p><Field l='The key change we would make is…' v={form.idea} c={v=>setForm({...form,idea:v})}/><Field l='Team / pair name' v={form.team} c={v=>setForm({...form,team:v})}/><div className='grid grid-cols-2 gap-3 mt-6'><button onClick={()=>submit(false)} className='border p-3 bg-white/80'>Save privately</button><button onClick={()=>submit(true)} className='border p-3 bg-[#274d8a] text-white'>Share to room</button></div></div></main>
}
function Field({l,v,c}:{l:string;v:string;c:(v:string)=>void}){return <label className='block mt-4'><span className='text-sm text-slate-700'>{l}</span><textarea value={v} onChange={e=>c(e.target.value)} className='w-full mt-1 border border-slate-300 bg-white/85 p-3 min-h-20'/></label>}

function Takeaway({text,setText,team,setTeam,done,setDone}:{text:string;setText:(s:string)=>void;team:string;setTeam:(s:string)=>void;done:boolean;setDone:(b:boolean)=>void}){
  const submit=()=>{const s=loadState(); s.takeaways.unshift({id:crypto.randomUUID(),text,team,createdAt:Date.now()}); saveState(s); setDone(true)};
  return <main className='min-h-screen p-6 bg-[radial-gradient(circle_at_top,rgba(39,77,138,.18),transparent_60%),#f2eee7]'><div className='max-w-md mx-auto pt-10'><h1 className='text-3xl font-semibold'>What is one service design move you want to try next?</h1>{done?<p className='mt-6'>Thanks — captured.</p>:<><textarea value={text} onChange={e=>setText(e.target.value)} className='w-full mt-5 border p-3 min-h-28 bg-white/85'/><input placeholder='Team / name (optional)' value={team} onChange={e=>setTeam(e.target.value)} className='w-full mt-3 border p-3 bg-white/85'/><button onClick={submit} className='mt-4 border p-3 bg-[#274d8a] text-white w-full'>Submit</button></>}</div></main>
}
