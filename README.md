# Fireship.io Course: Svelte and Sveltekit

## Svelte in 100 Seconds

### Section 1: Intro

A Javascript (JS) tool for building UI components, similar to React, Angular or Vue. Unlike the rest of the JS frameworks though, instead of sending a JS runtime to the browser, it is a **_compiler_**. It takes the code you write (declarative code) and converts it into code that works with native browser APIs (imperative code). This creates highly performant code in a small package.

### Section 2: Components

Components are created in .svelte files. These files contain three main parts:

1. A script for JS code.
2. Style tag for CSS (Can also be a pre-processor like sass).
3. The main template represented as regular HTML. This HTML is special because it has been empowered with extra syntax for writing declarative code.

### Section 3: Reactive State

Need Reactive state, simply write a variable with let and reference dynamically in HTML using parenthesis.

If we want to change state we can write a function then listen to event in the DOM using "on" and bind the function to it as the handler (**_event binding_**).

When the value of that variable changes the component will auto re-render to show the updated state.

#### Example

```svelte
<script lang="ts">
	let count = 0;

	function addOne() {
		count += 1;
	}
</script>

<button on:click={addOne}>
	Clicked {count} Times
</button>
```

### Section 4: Conditional Logic or Loops

```svelte
<!-- If Else Statement. -->
{#if count > 0}
	<p>Nice work!</p>
{/if}

<!-- For Each Loop. -->
{#each ['😉', '😆', '😍'] as face}
	<p>Hello {face}</p>
{/each}
```

### Section 5: Cross Component Communication

Svelte has multiple ways to share data between components.

To pass data from a parent to child you can use props by providing the **_export_** keyword to a variable.

Then you can pass data into this component. If you have a ton of props you can use the **_spread_** syntax to keep code looking better.

```svelte
<script lang="ts">
	export let name: string;
</script>

<h1>Hello {name}</h1>

<User name="Jeff" color="blue" height="5" />

<!-- OR -->

<User {...myProps} />
```

### Section 6: Component Trees

For more complex component trees you have a **_context API_** just like React.

Svelte also has a mechanism called **_observable stores_**, which are like observables which can be shared anywhere in the component tree and subscribe to a template by putting a $ symbol in front of them.

```svelte

  <script>
  <!-- Component A -->
  setContext('icon', '🍌');

  <!-- Component B -->
  const icon = getContext('icon');
  </script>

  <script>
  <!-- Stores -->
  import {writable} from 'svelte/store';

  const user = writable({ icon: '❤️' });
  </script>

  { $user.icon }
```

Section 7: Outro

After you have built your app you can then use the compiler to convert it to vanilla JS.

If you are building a full blown web app you can use Sveltekit to implement **_server side rendering_** (SSR), **_routing_** and **_code splitting_**.

## Create a Sveltekit app

`npm create svelte@latest name-of-app` or for interactive setup run `npx sv create name-of-app`.

Then you CD into the app created above and run pnpm run dev.

### Project Breakdown

There will be a vite config which is the build tool that bundles all of the code, a tsconfig (if typescript), a tailwind config (if using tailwind), and most importantly a svelte config which controls the settings for the framework itself.

#### Svelte Config

You can use adapters defined in this file to deploy the app to most major platforms with minimal configuration.

#### Source Directory

There is a **src** and **static** directory. Static is for static files such as logos, font files or other assets you want to deploy alongside your app. Source code is all contained in the `src` directory.

The route of every page in the app is surrounded by the `app.html` file. Within it you will notice a few special insertion points (i.e. %sveltekit.head%), which will be replaced with code from your sveltekit components.

There is also an `app.d.ts` file which is used to create your own type definitions in typescript.

The `routes` directory (dir) is important. This is where you define all of the logic and UI for all of the pages in the app.

The `lib` dir is also special in svelte because it is auto mapped to a `$` ($lib) which means you can import from it without having to write the full relative path in your code.

For example:

```svelte
<script>
	import { user, userData } from '$lib/firebase';
</script>
```

It will be used to add reusable utilities and components that aren't tied to a specific route in the app.

## Routing

Sveltekit has a file system based routing. Meaning the URL for users are determined by the file naming and structure in the routes dir.

Routes can be **dynamic** (surrounded by square brackets) such as a username pulled from a database. The framework identifies this as a URL parameter which you can access elsewhere in the framework like when fetching data.

### Page Store

Sometimes you want to access user data on the client side instead of the server. This can be done with a built in `$page` store (i.e. `$page.params.username`).

The page store contains the page store ($page), the route params (params), and additional info from the router. Anytime the route changes the store value will update reactively.

### Svelte Filenames

Svelte has four special filenames prefixed with a + symbol. These are **_page_**, **_layout_**, **_server_**, and **_error_**. These files will end in either **_.svelte_**, **_.ts_**, or **_.server.ts_**. The most common file is the `page.svelte` file. The page file is what is rendered when a user navigates to that URL.

On the initial load of the page it will be rendered on the **_server_**, which is good for SEO because bots need fully rendered HTML to understand the page.

After the initial page load Svelte will **_hydrate_** the page, the client side JS will take over and we will be able to render subsequent navigations client side. This is faster and more efficient as well as better user experience (UX).

#### +page.svelte

- **used for**: building UI.
- **runs on**: client & server.

#### +page.ts

- **used for**: data fetching.
- **runs on**: client & server.

#### +page.server.ts

- **used for**: data fetching.
- **runs on**: server only.

#### +layout.ts

Same group of patterns for +layout.ts. These work the same as pages, but their UI can be shared among multiple child routes.

Two more file types:

#### +server.ts

- **used for**: API routes (Routes that don't return HTML, but JSON or another response type).
- **runs on**: server only.

#### +error.svelte

Fallback for a page when data fetching fails.

- **used for**: API routes.
- **runs on**: server only.

## Data Fetching

There are three ways to fetch data:

1. Client Side
2. Server Side
3. Hybrid of Both

### Client Side Data Fetching

With client side everything happens in the browser after the initial page load. This is the typical way to do things in svelte without the kit. The trade off is due to happening on the client side the data won't be rendered on the server making it invisible to bots. Usually you only do client side fetching for data not public (i.e. content for an authenticated user).

```svelte
<script lang="ts">
  <!-- Import onMount lifecycle hook. -->
	import { onMount } from 'svelte';

  <!-- Set some state on the components like a todo. -->
	let todo = null;

  <!-- Once the component is mounted we make a cal to fetch to an API endpoint somewhere. -->
  <!-- Then set response json as the state on the component. -->
	onMount(async () => {
		todo = await fetch('.../todos').then((res) => res.json());
	});

  <!-- If using your own database, you will need separate server side code to create the API endpoint. -->
  {todo.title}
</script>
```

### Server Side Data Fetching

All data will be maintained on a secure back end environment then used in the HTML when rendered for the initial page load.

To create this we will create a `page.server.js` file in the same dir as the component that needs that data. This file exports a **_load_** function that will be executed when a user navigates to that page. This function returns an object of data that is accessible automatically to the svelte component.

Inside this function you can do many things on the back end such as fetch date from an API, fetch data from a Firebase admin SDK, access environment variables, send raw SQL to a relational database, or access files from the filesystem. This code will not be bundled with your client side code and will only run on the server.

Now back in the page component you will see that we have access to this data as a type of page data. Sveltekit generates this interface automatically, which provides end-to-end type safety from the back end to the front end. There is intellisense on the data.

### Hybrid Approach

Most times you do not need a server to do data fetching. Instead of creating a page.server.js file you create a page.ts file. This code can run both client side and server side.

On the initial page load it will run server side, but on any subsequent navigation it will run on client side, which makes it faster and not use unnecessary server resources, but at the same time search bots will get the fully rendered HTML. The downside is because it runs client side you won't have access to things like environment variables, firebase admin SDK, etc. This is ultimately the best way to fetch data, especially if it is public like from a CMS or some other API accessible with fetch.

Another great feature for Sveltekit is that we can access fetched data from the **_page store_**. This is useful when you have deeply nested components because you can used that fetched data anywhere on the page. You cannot do this in other frameworks like React without _prop drilling_ or using extra state management system.

```svelte
<script lang="ts">
  import type {PageData} from "./$types";

  export let data: PageData;

  <!-- Fetched data from page store. -->
  import {page} from "$app/stores";
</script>

{data.text}

<!-- Accessed fetched data as a deeply nested component. -->
{$page.data.text}
```

## Navigation

In Sveltekit you can handle navigation the same as plain HTML, with the anchor tag.

You simply can add a route within an anchor tag and Sveltekit will auto intercept this route and use client side routing to grab that page.

It also does not do a full page reload, but re-renders the HTML with JS client side.

You will also notice in the root app.html there is an attribute on the body tag called `data-sveltekit-preload-data` with a value of `hover`. This tells the framework to auto prefetch and prerender a page whenever a user hovers over a link. Sometimes this behaviour is not desirable (i.e. A very expensive data fetching operation/computation on the backend, you might want to wait for an official click). You can simply disable this behaviour by removing the attribute above from the body tag and add it to other parts of the app as needed.

### Link Customization

There are a bunch of ways to customize a link in Sveltekit. For example you might want to force a page reload on click by using the attribute `data-sveltekit-reload`.

Sometimes regular links are not enough to handle all of your navigation needs. The framework provides several utilities for programmatic navigation. The most basic utility is `goto()`, which allows you to navigate to a specific link from your JS code. For example, you could use this to implement an auto play feature like "play next video after 10 seconds".

Sometimes you might want to run code before or after a user navigates to a page. You can do this by using `beforeNavigate()` and `afterNavigate()`. These give us access to a navigation object then we will run the callback function before it actually navigates (intercept navigation) to that page.

We can also invalidate the cache when it comes to data fetching (`invalidate()`)

```svelte
<script lang="ts">
	import {
		afterNavigate,
		beforeNavigate,
		disableScrollHandling,
		goto,
		invalidate,
		invalidateAll,
		preloadCode,
		preloadData
	} from '$app/navigation';

  <!-- goto() example. -->
	function handleClick(event: MouseEvent) {
		event.preventDefault();
		showCoolAnimation();
		goto('/about');
	}

  <!-- beforeNavigate and afterNavigate example. -->
  beforeNavigate((navigation) => {
    if(!admin) {
      navigation.cancel()
    }
  })

  <!-- invalidate example. -->
  invalidate("./about")
</script>
```
