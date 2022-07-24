export default class MapboxAPI {
    static forwardGeocode(text) {
        return fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
        );
    }

    static reverseGeocode(coordinates) {
        return fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
        );
    }

    static retrieveDirection(...coordinates) {
        const coordinateString = coordinates.map((coordinate) => coordinate.join(',')).join(';');
        return fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinateString}.json?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
        );
    }

    static async getPlace(text) {
        try {
            const response = await this.forwardGeocode(text);
            const data = await response.json();
            return data.features.map((feature) => ({
                name: feature.place_name,
                coordinates: feature.center,
            }));
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getName(coordinates) {
        try {
            const response = await this.reverseGeocode(coordinates);
            const data = await response.json();
            console.log(data);
            const firstFeature = data.features[0];
            return {
                name: firstFeature.place_name,
                coordinates: firstFeature.center,
            };
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    static async getRoute(...coordinates) {
        try {
            const response = await this.retrieveDirection(...coordinates);
            const data = await response.json();
            return data.routes[0]?.geometry?.coordinates;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
