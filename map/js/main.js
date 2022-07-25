globalThis.MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoibm10aHVhbiIsImEiOiJjbDV5ODN5ZGsxMTNuM2lueml1ZjV1YmMyIn0.Qxli948hGh2RAM1oqmc-Lg';

import Map from './mapbox.js';
import LocationInput from './locationInput.js';
import Navigation from './navigation.js';

const map = new Map('map', [106.66, 10.76], 11);
const locationInput = new LocationInput(document.querySelector('.search-bar'), map.showDetail.bind(map));
const navigation = new Navigation(document.querySelector('.navigation'), map.showRoute.bind(map));
navigation.onToggle = (isActive) => {
    if (!isActive) {
        map.removeRoute();
    }
}
map.onPopupButtonClick = (name, coordinates) => {
    navigation.endInput.showData(name, coordinates);
    if (!navigation.isActive) {
        navigation.togglePanel();
    }
}