import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		
		console.log('Login action triggered', { email, password });
		
		// TODO log the user in
        

	},
	register: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		
		console.log('Register action triggered', { email, password });
		
		// TODO register the user
	}
};