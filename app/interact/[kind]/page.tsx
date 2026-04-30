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

  const vote = (opt: string) => {
    const s = loadState();
    s.polls[kind] = s.polls[kind] || {};
    s.polls[kind][opt] = (s.polls[kind][opt] || 0) + 1;
    saveState(s);
    setDone(true);
  };

  return <main className='min-h-screen p-6 bg-[radial-gradient(circle_at_top,rgba(39,77,138,.18),transparent_60%),#f2eee7] text-[#161a1f]'><div className='max-w-md mx-auto pt-10'><p className='text-xs uppercase tracking-[.16em] text-slate-600'>Live check-in</p><h1 className='text-3xl font-semibold mt-3'>{poll.question}</h1>{done ? <p className='mt-6'>Thanks — your vote is in.</p> : <div className='mt-6 space-y-3'>{poll.options.map(o=><button key={o} onClick={()=>vote(o)} className='w-full text-left px-4 py-3 border border-slate-300 bg-white/80'>{o}</button>)}</div>}</div></main>;
}

function Workshop(){
  const [saved,setSaved]=useState(false);
  const [form,setForm]=useState({team:'',service:'',tryingToDo:'',friction:'',whereFriction:'',feel:'',hmw:'',idea:''});
  const submit=(shared:boolean)=>{const s=loadState(); s.workshop.unshift({id:crypto.randomUUID(),createdAt:Date.now(),shared,...form}); saveState(s); setSaved(true);};
  if(saved) return <main className='min-h-screen p-6 bg-[radial-gradient(circle_at_top,rgba(138,74,54,.18),transparent_60%),#f2eee7]'><div className='max-w-md mx-auto pt-20'><h1 className='text-3xl font-semibold'>Thanks. Your idea has been added.</h1><p className='mt-4 text-slate-700'>Good design often starts with better noticing, not better answers.</p></div></main>
  return <main className='min-h-screen p-6 bg-[radial-gradient(circle_at_top,rgba(39,77,138,.16),transparent_60%),#f2eee7] text-[#161a1f]'><div className='max-w-md mx-auto pb-12'><h1 className='text-3xl font-semibold mt-8'>Mini workshop</h1><p className='text-lg'>Redesign one frustrating service experience</p><p className='mt-4 text-slate-700'>This is a fast design exercise...</p><Field l='Pick a service or interaction' v={form.service} c={v=>setForm({...form,service:v})}/><Field l='What is the person trying to do?' v={form.tryingToDo} c={v=>setForm({...form,tryingToDo:v})}/><Field l='What gets in the way?' v={form.friction} c={v=>setForm({...form,friction:v})}/><Field l='Where does confusion or friction show up?' v={form.whereFriction} c={v=>setForm({...form,whereFriction:v})}/><Field l='How does the experience feel?' v={form.feel} c={v=>setForm({...form,feel:v})}/><Field l='How might we…' v={form.hmw} c={v=>setForm({...form,hmw:v})}/><Field l='What would a better version look like?' v={form.idea} c={v=>setForm({...form,idea:v})}/><Field l='Team / table name (optional)' v={form.team} c={v=>setForm({...form,team:v})}/><div className='grid grid-cols-2 gap-3 mt-6'><button onClick={()=>submit(false)} className='border p-3 bg-white/80'>Save privately</button><button onClick={()=>submit(true)} className='border p-3 bg-[#274d8a] text-white'>Share to room</button></div></div></main>
}
function Field({l,v,c}:{l:string;v:string;c:(v:string)=>void}){return <label className='block mt-4'><span className='text-sm text-slate-700'>{l}</span><textarea value={v} onChange={e=>c(e.target.value)} className='w-full mt-1 border border-slate-300 bg-white/85 p-3 min-h-20'/></label>}

function Takeaway({text,setText,team,setTeam,done,setDone}:{text:string;setText:(s:string)=>void;team:string;setTeam:(s:string)=>void;done:boolean;setDone:(b:boolean)=>void}){
  const submit=()=>{const s=loadState(); s.takeaways.unshift({id:crypto.randomUUID(),text,team,createdAt:Date.now()}); saveState(s); setDone(true)};
  return <main className='min-h-screen p-6 bg-[radial-gradient(circle_at_top,rgba(39,77,138,.18),transparent_60%),#f2eee7]'><div className='max-w-md mx-auto pt-10'><h1 className='text-3xl font-semibold'>What is one service design move you want to try next?</h1>{done?<p className='mt-6'>Thanks — captured.</p>:<><textarea value={text} onChange={e=>setText(e.target.value)} className='w-full mt-5 border p-3 min-h-28 bg-white/85'/><input placeholder='Team / name (optional)' value={team} onChange={e=>setTeam(e.target.value)} className='w-full mt-3 border p-3 bg-white/85'/><button onClick={submit} className='mt-4 border p-3 bg-[#274d8a] text-white w-full'>Submit</button></>}</div></main>
}
