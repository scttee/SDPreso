'use client';
import { Takeaway, WorkshopSubmission } from './interactions';

export type State = {
  polls: Record<string, Record<string, number>>;
  workshop: WorkshopSubmission[];
  takeaways: Takeaway[];
};

const KEY = 'sdpreso_live_state_v1';
const channel = typeof window !== 'undefined' ? new BroadcastChannel('sdpreso-live') : null;

export const emptyState: State = { polls: {}, workshop: [], takeaways: [] };

export function loadState(): State {
  if (typeof window === 'undefined') return emptyState;
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : emptyState;
}

export function saveState(state: State) {
  localStorage.setItem(KEY, JSON.stringify(state));
  channel?.postMessage(state);
}

export function subscribe(cb: (state: State) => void) {
  const onStorage = () => cb(loadState());
  const onMsg = (e: MessageEvent<State>) => cb(e.data);
  window.addEventListener('storage', onStorage);
  channel?.addEventListener('message', onMsg as EventListener);
  return () => {
    window.removeEventListener('storage', onStorage);
    channel?.removeEventListener('message', onMsg as EventListener);
  };
}
