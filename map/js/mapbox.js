import MapboxAPI from "./mapboxApi.js";

export default class Map {
    map;
    popup;

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
            console.log(name, coordinates);
        }

        this.popup = new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<h1>${name}</h1>`)
            .addTo(this.map);
        this.moveTo(coordinates);
    }

    showRoute(coordinates) {
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
    }
}