<script>
  import L from "leaflet";
  import { setContext, onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  let mapContainer;
  let map;
  const dispatch = createEventDispatcher();

  map = L.map(L.DomUtil.create("div"), {
    center: [0, 0],
    zoom: 10,
  });
  setContext("leafletMapInstance", map);

  L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  }).addTo(map);

  onMount(() => {
    mapContainer.appendChild(map.getContainer());
    map.getContainer().style.width = "100%";
    map.getContainer().style.height = "100%";
    map.invalidateSize();
    dispatch("mapObj", map);
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""
  />
</svelte:head>
<div class="map" bind:this={mapContainer}>
  <slot />
</div>

<style>
  .map {
    height: 100vh;
    width: 100vw;
  }
</style>
