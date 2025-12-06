import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';

export const actions: Actions = {
	login: async (event) => {
		const { request } = event;
		const data = await request.formData();
		const username = (data.get('username') || '').toString().trim();
		const password = (data.get('password') || '').toString();

		if (!username || !password) {
			return { success: false, message: 'Username and password are required' };
		}

		// Check if user exists
		const [user] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, username));

		if (!user) {
			return { success: false, message: 'User does not exist' };
		}

		// TODO: replace with a hashed password check (e.g. bcrypt.compare)
		if (password !== user.passwordHash) {
			return { success: false, message: 'Invalid credentials' };
		}

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.uid);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		throw redirect(303, '/dashboard');
	}
};