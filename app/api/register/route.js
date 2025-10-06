import { db } from '@/config/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
  const { name, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);  

  try {
    await db.execute('INSERT INTO users (id, user_name, email, password) VALUES (?, ?, ?, ?);', [crypto.randomUUID(), name, email, hashedPassword]);

    return Response.json({ success: 'Registration successful' }, { status: 201 });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return Response.json({ error: 'This Email id already Exist' }, { status: 409 });
    } else {
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }

  }

}