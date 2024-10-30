<script lang="ts">
	import { enhance } from '$app/forms';
	type PageData = {
		boatName: string;
	};

	export let data: PageData;
</script>

<h1>{data.boatName}</h1>

<!-- First action added to the form element. -->
<form method="POST" action="?/rename" use:enhance>
	<input type="text" name="boatName" />
	<button type="submit">Submit</button>

	<!-- Second action can be added on a second form or triggered on the same form like below, using the formaction attribute. -->
	<button formaction="?/capitalize">Capitalize</button>
</form>
