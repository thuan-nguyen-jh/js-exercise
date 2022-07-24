globalThis.MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoibm10aHVhbiIsImEiOiJjbDV5ODN5ZGsxMTNuM2lueml1ZjV1YmMyIn0.Qxli948hGh2RAM1oqmc-Lg';

import Map from './mapbox.js';
import LocationInput from './locationInput.js';
import MapboxAPI from './mapboxApi.js';

const map = new Map('map', [106.66, 10.76], 11);
const locationInput = new LocationInput(document.querySelector('.search-bar'));
locationInput.onClickItem = (event) => {
    const element = event.target;
    const coordinates = element.dataset.coordinates.split(',');
    map.showDetail(coordinates, element.innerHTML);
}

setTimeout(() => {
    MapboxAPI.getRoute([106.66, 10.76], [107.66, 10.76])
    .then(route => {
        map.showRoute(route);
    });
}, 5000);