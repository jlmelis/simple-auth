<script>
  //import { onMount } from 'svelte';
  //let loggedIn;

  const tokenStorageKey = 'simpleAuth-token';
  const netlifyIdentity = window.netlifyIdentity;

  $: loggedIn = localStorage.getItem(tokenStorageKey) !== null;

  function logIn() {
    netlifyIdentity.open();
  }

  netlifyIdentity.on('login', async() => {
    const token = await netlifyIdentity.currentUser().jwt();
    localStorage.setItem(tokenStorageKey, token);
  });

  function logOut() {
    netlifyIdentity.logout();
  }

  netlifyIdentity.on('logout', () => {
    localStorage.removeItem(tokenStorageKey);
  });
</script>

<main>
  {#if !loggedIn}
  <div>
    <h1>Super Secret Stuff</h1>
    <p>🔐 only my bestest friends can see this content</p>
    <button on:click={logIn}>Log in / signup to be my best friend</button>
  </div>
  {:else}
  <div>
    <div></div>
    <button on:click={logOut}>Log out</button> 
  </div>
  {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>