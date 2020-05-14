<script>
  import netlifyIdentity from 'netlify-identity-widget';
  import { onMount } from 'svelte';
  let loggedIn;
  let protectedContent;
  
  onMount(async () => {
    netlifyIdentity.init();
  });
  

  function logIn() {
    netlifyIdentity.open();
  }

  netlifyIdentity.on('login', async() => {
    const token = await netlifyIdentity.currentUser().jwt();

    const response = await fetch('/.netlify/functions/auth-only-content', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then( res => res.text());

    protectedContent = response;
    loggedIn = true;
  });

  function logOut() {
    netlifyIdentity.logout();
  }

  netlifyIdentity.on('logout', () => {
    loggedIn = false;
  });
</script>

<main>
  <h1>Super Secret Stuff</h1>
  {#if !loggedIn}
    <div>
      <button on:click={logIn}>Log in</button>
    </div>
  {:else}
    <div>
      <div>{protectedContent}</div>
      <button on:click={logOut}>Log out</button> 
    </div>
  {/if}
</main>

<style>
	
</style>