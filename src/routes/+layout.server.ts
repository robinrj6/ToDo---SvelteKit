import type { LayoutServerLoad } from './$types';
import { validateSessionToken } from '$lib/server/auth';

export const load: LayoutServerLoad = async (event) => {
	const token = event.cookies.get('auth-session');
	
	if (!token) {
		return { user: null };
	}

	const { user } = await validateSessionToken(token);
	return { user };
};
