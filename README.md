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
  {#each ['😉','😆','😍'] as face}
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

`npm create svelte@latest nameofapp` or for interactive setup run `npx sv create nameofapp`.
