<!-- Create by right-clicking on 'routes' dir and using sveltekit vscode plugin. -->

<script>
	import Button from './Button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

{data.text}

<!-- Often you have to extract your code into a smaller component. -->
<!-- This can be done by highlighting the code and selecting 'extract component'. -->
<!-- This will move the code over while importing it into the existing file. -->

<Button {data} />
