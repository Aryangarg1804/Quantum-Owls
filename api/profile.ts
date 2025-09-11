import { ensureSchema, getProfile, upsertProfile } from './db';

export const dynamic = 'force-dynamic';

export default async function handler(request: Request) {
  try {
    await ensureSchema();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (request.method === 'GET') {
    if (!userId) return new Response(JSON.stringify({ error: 'userId required' }), { status: 400, headers: { 'content-type': 'application/json' } });
    const profile = await getProfile(userId);
    return new Response(JSON.stringify(profile), { headers: { 'content-type': 'application/json' } });
  }

  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
    const body = await request.json();
    const saved = await upsertProfile(body);
    return new Response(JSON.stringify(saved), { headers: { 'content-type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
