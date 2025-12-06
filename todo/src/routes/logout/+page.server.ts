import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';

export const actions: Actions = {
	logout: async (event) => {
		const token = event.cookies.get('auth-session');
		
		if (token) {
			// We need to hash the token to get the session ID
			const { sha256 } = await import('@oslojs/crypto/sha2');
			const { encodeHexLowerCase } = await import('@oslojs/encoding');
			const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
			await invalidateSession(sessionId);
		}
		
		deleteSessionTokenCookie(event);
		throw redirect(303, '/login');
	}
};
