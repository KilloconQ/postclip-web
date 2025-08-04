import { NextRequest, NextResponse } from 'next/server';
import { improvePost } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    if (!input || typeof input !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid input' }, { status: 400 });
    }
    const improved = await improvePost(input);
    return NextResponse.json({ result: improved });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
