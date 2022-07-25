import MapboxAPI from "./mapboxApi.js";

class Popup {
    element;
    textElement;
    buttonElement;
    
    name;
    coordinates;
    onNavigation;

    constructor(name, coordinates, onNavigation) {
        this.name = name;
        this.coordinates = coordinates;
        this.onNavigation = onNavigation;

        this.element = document.createElement('div');
        this.element.classList.add('popup');
        this.textElement = this.createTextElement();
        this.buttonElement = this.createButtonElement();
        this.buttonElement.addEventListener('click', this.onClick.bind(this));

        this.element.appendChild(this.textElement);
        this.element.appendChild(this.buttonElement);
    }

    createTextElement() {
        const textElement = document.createElement('p');
        textElement.innerHTML = `<strong>${this.name}</strong><br>${this.coordinates}`;
        return textElement;
    }

    createButtonElement() {
        const buttonElement = document.createElement('button');
        buttonElement.innerText = 'Navigation';
        buttonElement.classList.add('submit-btn');
        return buttonElement;
    }

    onClick(event) {
        if (typeof this.onNavigation === 'function') {
            this.onNavigation(this.name, this.coordinates);
        }
    }
}
export default class Map {
    map;
    popup;
    onPopupButtonClick;

    constructor(mapId, center, zoom) {
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

        this.map = new mapboxgl.Map({
            container: mapId,
            style: "mapbox://styles/mapbox/streets-v11",
            center,
            zoom,
            projection: "globe",
        });

        this.map.on("style.load", () => {
            this.map.setFog({});
            this.map.on("click", (event) => {
                const coordinates = event.lngLat.toArray();
                this.showDetail(coordinates);
            });
        });

        this.map.addControl(new mapboxgl.NavigationControl());
    }

    moveTo(coordinates) {
        this.map.flyTo({
            center: coordinates,
            zoom: 15,
        });
    }

    async showDetail(coordinates, name) {
        this.popup?.remove();
        if (name === undefined) {
            const feature = await MapboxAPI.getName(coordinates);
            if (feature === undefined) {
                return;
            }
            name = feature.name;
            coordinates = feature.coordinates;
        }

        const popupContent = new Popup(name, coordinates, this.onPopupButtonClick)
        this.popup = new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setDOMContent(popupContent.element)
            .addTo(this.map);
        this.moveTo(coordinates);
    }

    showRoute(coordinates) {
        this.removeRoute();
        this.map.addLayer({
            id: "route",
            type: "line",
            source: {
                type: "geojson",
                data: {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates,
                    },
                },
            },
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": "#888",
                "line-width": 8,
            },
        });
        this.moveToBoundary(coordinates);
    }

    removeRoute() {
        if (this.map.getLayer("route")) {
            this.map.removeLayer("route");
            this.map.removeSource("route");
        }
    }

    moveToBoundary(coordinates) {
        const boundary = new mapboxgl.LngLatBounds();
        coordinates.forEach((coordinate) => boundary.extend(coordinate));
        this.map.fitBounds(boundary, {
            padding: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50,
            },
        });
    }
}