import { deleteCookie, verifyCookie } from '@/config/auth';
import { db } from '@/config/db';

export async function POST() {
  const sessionID = await verifyCookie();    

  if(sessionID instanceof Response){
    return sessionID;
  }

  await db.execute('DELETE FROM session WHERE id = ?;', [sessionID]);
  deleteCookie('userID');

  return new Response(null, {status: 204});
}