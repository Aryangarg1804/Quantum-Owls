import { deleteProduct, ensureSchema, getProduct, listProducts, upsertProduct } from './db';

export const dynamic = 'force-dynamic';

export default async function handler(request: Request) {
  // Ensure DB schema exists (no-op if already created)
  try {
    await ensureSchema();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id') || undefined;

  if (request.method === 'GET') {
    if (id) {
      const row = await getProduct(id);
      return new Response(JSON.stringify(row), { headers: { 'content-type': 'application/json' } });
    }
    const rows = await listProducts();
    return new Response(JSON.stringify(rows), { headers: { 'content-type': 'application/json' } });
  }

  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
    const body = await request.json();
    const saved = await upsertProduct(body);
    return new Response(JSON.stringify(saved), { headers: { 'content-type': 'application/json' } });
  }

  if (request.method === 'DELETE') {
    if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400, headers: { 'content-type': 'application/json' } });
    await deleteProduct(id);
    return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
