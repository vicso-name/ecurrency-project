import { NextRequest, NextResponse } from 'next/server';
import { BrevoClient } from '@getbrevo/brevo';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json({ error: 'Brevo not configured' }, { status: 500 });
    }

    const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });
    const listId = parseInt(process.env.BREVO_LIST_ID || '3', 10);

    await client.contacts.createContact({
      email,
      listIds: [listId],
      updateEnabled: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
