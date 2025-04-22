mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 6
});

const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset:25}).setHTML(
        `<h4>${mapLocation}</h4><p>Exact Location will be provided after booking.</p>`)
    ).addTo(map);