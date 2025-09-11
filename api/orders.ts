import { createOrder, ensureSchema, getOrder, listOrders } from './db';

export const dynamic = 'force-dynamic';

export default async function handler(request: Request) {
  try {
    await ensureSchema();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id') || undefined;
  const userId = url.searchParams.get('userId') || undefined;

  if (request.method === 'GET') {
    if (id) {
      const row = await getOrder(id);
      return new Response(JSON.stringify(row), { headers: { 'content-type': 'application/json' } });
    }
    const rows = await listOrders(userId);
    return new Response(JSON.stringify(rows), { headers: { 'content-type': 'application/json' } });
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const saved = await createOrder(body);
    return new Response(JSON.stringify(saved), { headers: { 'content-type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
