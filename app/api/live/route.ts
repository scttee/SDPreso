import { NextRequest, NextResponse } from 'next/server';

type LiveState = {
  polls: Record<string, Record<string, number>>;
};

const g = globalThis as unknown as { __live?: LiveState };
if (!g.__live) g.__live = { polls: {} };

export async function GET() {
  return NextResponse.json(g.__live);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.type === 'vote') {
    const { kind, option } = body;
    g.__live!.polls[kind] = g.__live!.polls[kind] || {};
    g.__live!.polls[kind][option] = (g.__live!.polls[kind][option] || 0) + 1;
  }
  return NextResponse.json(g.__live);
}
