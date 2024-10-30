import { type RequestHandler, type RequestEvent, json, error } from '@sveltejs/kit';

// The request.
export const GET: RequestHandler = async (e: RequestEvent) => {
	// Access to below is due to the above imported request data.
	e.cookies;
	e.params;
	e.request.body;
	e.fetch('some URL');
	return new Response();
};

// The response.
export const POST: RequestHandler = async (e: RequestEvent) => {
	// Error handling with HTTP status code and message.
	// User data below for testing, change admin to true to make the code work.
	// let user = { admin: false };
	let user = { admin: true };

	if (!user.admin) {
		throw error(401, 'Unauthorized');
	}
	// return new Response();
	return json({ name: 'dog' });
};

// export const DELETE: RequestHandler = async (e: RequestEvent) => {
// 	e.cookies;

// 	return new Response();
// };
