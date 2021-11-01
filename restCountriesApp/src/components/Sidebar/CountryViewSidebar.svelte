<script>
  import MapContent from "./../Map/MapContent.svelte";
  import CountryDetails from "./CountryDetails.svelte";
  import countryStore from "./country-details-store";
  export let countryDataFetchStatus;
  import { fly } from "svelte/transition";
  let map;
  function setMapContext(event) {
    map = event.detail;
  }

  $: if (countryDataFetchStatus === "loaded")
    map.flyTo([...$countryStore[0].latlng], 8);
</script>

{#if countryDataFetchStatus === "loaded"}
  <div class="container" transition:fly={{ x: -500, duration: 500 }}>
    <CountryDetails country={$countryStore[0]} />
  </div>
{/if}
<div class="map">
  <MapContent on:mapObj={setMapContext} />
</div>

<style>
  .container {
    width: 30%;
    height: 100%;
    border: 1px solid gray;
    background-color: whitesmoke;
    position: absolute;
    z-index: 100;
  }
  .map {
    z-index: 0;
    width: 100%;
  }
</style>
