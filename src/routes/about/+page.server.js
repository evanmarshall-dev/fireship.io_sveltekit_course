/** @type {import('./$types').PageLoad} */
export async function load() {
	// Inside this function you can do many things on the back end such as fetch date from an API, fetch data from a Firebase admin SDK, access environment variables, send raw SQL to a relational database, or access files from the filesystem.
	return {
		title: 'My Data',
		text: 'Hi Mom!'
	};
}
