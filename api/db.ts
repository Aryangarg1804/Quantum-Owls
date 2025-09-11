import { sql } from '@vercel/postgres';

export interface DBProduct {
  id: string;
  category: string;
  image: string;
  images: string[] | null;
  title: string;
  title_hi: string | null;
  producer: string;
  producer_hi: string | null;
  description: string;
  description_hi: string | null;
  price_range: string;
  rating: number | null;
  orders: number | null;
  owner_id: string | null;
  created_at: string;
}

export interface DBProfile {
  user_id: string;
  name: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
  business_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export interface DBOrderItem {
  id: string;
  title: string;
  price: string; // stored as display string
  quantity: number;
  image: string;
}

export interface DBOrder {
  id: string;
  user_id: string | null;
  items: DBOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  payment_method: 'cod' | 'online';
  shipping_name: string | null;
  shipping_phone: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
  created_at: string;
}

export async function ensureSchema() {
  await sql`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    images JSONB,
    title TEXT NOT NULL,
    title_hi TEXT,
    producer TEXT NOT NULL,
    producer_hi TEXT,
    description TEXT NOT NULL,
    description_hi TEXT,
    price_range TEXT NOT NULL,
    rating REAL,
    orders INT,
    owner_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`;

  await sql`CREATE TABLE IF NOT EXISTS profiles (
    user_id TEXT PRIMARY KEY,
    name TEXT,
    phone TEXT,
    address TEXT,
    bio TEXT,
    business_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );`;

  await sql`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    items JSONB NOT NULL,
    subtotal REAL NOT NULL,
    tax REAL NOT NULL,
    total REAL NOT NULL,
    status TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    shipping_name TEXT,
    shipping_phone TEXT,
    shipping_address TEXT,
    shipping_city TEXT,
    shipping_state TEXT,
    shipping_pincode TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`;
}

export async function listProducts(): Promise<DBProduct[]> {
  const { rows } = await sql<DBProduct>`SELECT * FROM products ORDER BY created_at DESC`;
  return rows;
}

export async function getProduct(id: string): Promise<DBProduct | null> {
  const { rows } = await sql<DBProduct>`SELECT * FROM products WHERE id = ${id} LIMIT 1`;
  return rows[0] || null;
}

export async function upsertProduct(p: DBProduct): Promise<DBProduct> {
  const { rows } = await sql<DBProduct>`
    INSERT INTO products (id, category, image, images, title, title_hi, producer, producer_hi, description, description_hi, price_range, rating, orders, owner_id)
    VALUES (${p.id}, ${p.category}, ${p.image}, ${JSON.stringify(p.images)}, ${p.title}, ${p.title_hi}, ${p.producer}, ${p.producer_hi}, ${p.description}, ${p.description_hi}, ${p.price_range}, ${p.rating}, ${p.orders}, ${p.owner_id})
    ON CONFLICT (id) DO UPDATE SET
      category = EXCLUDED.category,
      image = EXCLUDED.image,
      images = EXCLUDED.images,
      title = EXCLUDED.title,
      title_hi = EXCLUDED.title_hi,
      producer = EXCLUDED.producer,
      producer_hi = EXCLUDED.producer_hi,
      description = EXCLUDED.description,
      description_hi = EXCLUDED.description_hi,
      price_range = EXCLUDED.price_range,
      rating = EXCLUDED.rating,
      orders = EXCLUDED.orders,
      owner_id = EXCLUDED.owner_id
    RETURNING *;
  `;
  return rows[0];
}

export async function deleteProduct(id: string): Promise<void> {
  await sql`DELETE FROM products WHERE id = ${id}`;
}

export async function getProfile(userId: string): Promise<DBProfile | null> {
  const { rows } = await sql<DBProfile>`SELECT * FROM profiles WHERE user_id = ${userId} LIMIT 1`;
  return rows[0] || null;
}

export async function upsertProfile(p: DBProfile): Promise<DBProfile> {
  const { rows } = await sql<DBProfile>`
    INSERT INTO profiles (user_id, name, phone, address, bio, business_name, avatar_url)
    VALUES (${p.user_id}, ${p.name}, ${p.phone}, ${p.address}, ${p.bio}, ${p.business_name}, ${p.avatar_url})
    ON CONFLICT (user_id) DO UPDATE SET
      name = EXCLUDED.name,
      phone = EXCLUDED.phone,
      address = EXCLUDED.address,
      bio = EXCLUDED.bio,
      business_name = EXCLUDED.business_name,
      avatar_url = EXCLUDED.avatar_url,
      updated_at = NOW()
    RETURNING *;
  `;
  return rows[0];
}

export async function createOrder(o: DBOrder): Promise<DBOrder> {
  const { rows } = await sql<DBOrder>`
    INSERT INTO orders (id, user_id, items, subtotal, tax, total, status, payment_method, shipping_name, shipping_phone, shipping_address, shipping_city, shipping_state, shipping_pincode)
    VALUES (
      ${o.id}, ${o.user_id}, ${JSON.stringify(o.items)}, ${o.subtotal}, ${o.tax}, ${o.total}, ${o.status}, ${o.payment_method},
      ${o.shipping_name}, ${o.shipping_phone}, ${o.shipping_address}, ${o.shipping_city}, ${o.shipping_state}, ${o.shipping_pincode}
    )
    RETURNING *;
  `;
  return rows[0];
}

export async function getOrder(id: string): Promise<DBOrder | null> {
  const { rows } = await sql<DBOrder>`SELECT * FROM orders WHERE id = ${id} LIMIT 1`;
  return rows[0] || null;
}

export async function listOrders(userId?: string): Promise<DBOrder[]> {
  if (userId) {
    const { rows } = await sql<DBOrder>`SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC`;
    return rows;
  }
  const { rows } = await sql<DBOrder>`SELECT * FROM orders ORDER BY created_at DESC`;
  return rows;
}
