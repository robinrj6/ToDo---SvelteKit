import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { validateSessionToken } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('auth-session');
	
	if (!token) {
		throw redirect(303, '/login');
	}

	const { user, session } = await validateSessionToken(token);
	
	if (!user || !session) {
		throw redirect(303, '/login');
	}

	return { user };
};
    