<script>
  export let name;

  let userName;
  let resultString;

  async function helloWorldFunction() {
    const response = await fetch(`/.netlify/functions/hello-world?name=${encodeURI(userName)}`);
    const result = await response.json();
    
    resultString = result.message;
  }

  function handleClick() {
    if (userName && userName.length > 0) {
      helloWorldFunction();
    }
  }
</script>

<main>
	<h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
  
  <div>
    <h3>Call Lamba function!</h3>
    <input bind:value={userName} placeholder="enter name" >
    <button on:click={handleClick}>Call Function</button>
    <br />
    <span>Result from function: </span>
    <strong>{resultString || ''}</strong>
  </div>
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