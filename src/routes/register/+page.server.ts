import type { Actions } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
    register: async ({ request }) => {
        try {
            const data = await request.formData();
            const username = (data.get('username') || '').toString().trim();
            const password = (data.get('password') || '').toString();

            if (!username || !password) {
                return { success: false, message: 'Username and password are required' };
            }

            const [existing] = await db
                .select({ uid: table.user.uid })
                .from(table.user)
                .where(eq(table.user.username, username));

            if (existing) {
                return { success: false, message: 'User already exists' };
            }

            // TODO: hash password before storing (e.g. bcrypt.hash)
            await db.insert(table.user).values({
                uid: crypto.randomUUID(),
                username,
                passwordHash: password,
                createdAt: new Date()
            });

            return { success: true, message: 'Registered successfully' };
        } catch (error) {
            console.error('Register action error', error);
            return { success: false, message: 'Internal error, please try again.' };
        }
    },
};