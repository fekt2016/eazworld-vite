import supabase, { supabaseUrl } from './supabase';

export async function signup({ firstName, lastName, email, password, phone }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				firstName,
				lastName,
				phone,
				avatar: '',
			},
			emailRedirectTo:
				'https//eazworld.com/login?message=Congratulations! Your email now is confirmed.',
		},
	});
	if (error) throw new Error(error.message);
	return data;
}
export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;
	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
	password,
	firstName,
	lastName,
	avatar,
}) {
	let updateData;
	if (password) updateData = { password };

	if (lastName && firstName)
		updateData = {
			data: {
				lastName,
				firstName,
			},
		};

	const { data, error } = await supabase.auth.updateUser(updateData);
	if (error) throw new Error(error.message);
	if (!avatar) return data;

	const fileName = `avatar-${data.user.id}-${Math.random()}`;

	const { error: storageError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar);

	if (storageError) throw new Error(error.message);

	const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	});

	if (error2) throw new Error(error.message);
	return updatedUser;
}

export async function resetPassword({ email, password }) {
	const { data, error } = await supabase.auth.updateUser({
		email,
		password,
	});
	if (error) throw new Error(error.message);
	return data;
}

export async function emailLink(email) {
	console.log(email);
}

export async function getUser(id) {
	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		throw new Error('user not found');
	}

	return data;
}
