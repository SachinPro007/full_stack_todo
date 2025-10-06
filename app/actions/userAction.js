'use server';

import { db } from '@/config/db';
import bcrypt from 'bcrypt';


export async function ragisterUser(newUser) {
  const { name, email, password } = newUser;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.execute('INSERT INTO users (id, user_name, email, password) VALUES (?, ?, ?, ?);', [crypto.randomUUID(), name, email, hashedPassword]);

    return { success: 'Registration successful' };

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return { error: 'This Email id already Exist' };
    } else {
      return { error: 'Internal server error' };
    }
  }
}