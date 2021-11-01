<script>
  import CountryViewSidebar from "./components/Sidebar/CountryViewSidebar.svelte";
  import Navbar from "./components/Navbar.svelte";

  import MapContent from "./components/Map/MapContent.svelte";
  import countriesStore from "./components/Sidebar/country-details-store.js";

  let countryDataFetchStatus = "start";
</script>

<main>
  <header>
    <Navbar
      on:submitquery={async (event) => {
        countryDataFetchStatus = "loading";
        await countriesStore.fetchCountry(event.detail);
        countryDataFetchStatus = "loaded";
      }}
    />
  </header>
  <div class="content">
    <CountryViewSidebar {countryDataFetchStatus} />
  </div>
</main>

<style>
  main {
    overflow: hidden;
    max-width: 86rem;
    height: 95%;
    margin: 1.2rem auto;
    box-shadow: 10px 10px 10px 10px #888888;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .content {
    margin: 0;
    padding: 0;
    max-height: 58rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 100%;
    position: relative;
    z-index: 100;
  }
</style>
