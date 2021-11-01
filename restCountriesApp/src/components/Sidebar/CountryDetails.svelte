<script>
  import CountryDetailButtons from "./CountryDetailButtons.svelte";
  import { slide } from "svelte/transition";

  export let country;

  let altNamesToggle = false;
  let bordersToggle = false;
  let descToggle = false;

  $: console.log(country);
</script>

<div class="country-details-container">
  <header>
    <img src={country.flag} alt={country.name} />
    <div class="title-desc">
      <h1 class="country-name">{country.name}</h1>
      <h3 class="country-altname">
        {country.altSpellings[1]}<span>+{country.callingCodes[0]}</span>
      </h3>
      <div class="other-details">
        <h5 class="">Capital : {country.capital}</h5>
        <h5 class="">Region : {country.subregion}</h5>
      </div>
      <hr />
    </div>

    <CountryDetailButtons on:click={() => (altNamesToggle = !altNamesToggle)}
      >Alternate Names</CountryDetailButtons
    >
    {#if altNamesToggle}
      <div class="dropdowns" transition:slide>
        {#each country.altSpellings as altname}
          <p>- {altname}</p>
        {/each}
      </div>
    {/if}

    <!-- If there are Borders -->

    {#if country.borders}
      <CountryDetailButtons on:click={() => (bordersToggle = !bordersToggle)}
        >Borders</CountryDetailButtons
      >
      {#if bordersToggle}
        <div class="dropdowns" transition:slide>
          {#each country.borders as border}
            <p>- {border}</p>
          {/each}
        </div>
      {/if}
    {/if}

    <CountryDetailButtons on:click={() => (descToggle = !descToggle)}
      >Description</CountryDetailButtons
    >
    {#if descToggle}
      <div class="dropdowns" transition:slide>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          aliquam porro fuga earum rerum pariatur minus corrupti minima,
          aliquid, excepturi doloribus, tenetur debitis quisquam dolorem culpa
          hic. Fugiat, cum tenetur.
        </p>
      </div>
    {/if}
  </header>
</div>

<style>
  .country-details-container {
    padding: 1rem;
    margin: 0;
    position: absolute;
  }
  header {
    width: 100%;
  }

  img {
    width: 100%;
    box-shadow: 1px 3px 3px 3px #888888;
  }

  .title-desc {
    margin: 1rem;
  }

  .title-desc hr {
    color: var(--primary-color);
  }

  .desc-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .muted {
    color: gray;
  }

  .country-name {
    margin: 0.4rem 0;
  }

  .country-altname {
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .dropdowns {
    background-color: whitesmoke;
    padding: 0.8rem;
    font-size: 0.8rem;
    margin: 0;
  }

  h5 {
    margin: 0;
  }

  .other-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.4rem 0;
    flex-shrink: 2;
  }

  .footer {
    border: 1px solid gray;
    width: 100%;
    height: 10rem;
  }
</style>
