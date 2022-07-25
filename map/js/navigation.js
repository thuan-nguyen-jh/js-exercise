import LocationInput from "./locationInput.js";
import MapboxAPI from "./mapboxApi.js";

export default class Navigation {
    containerElement;
    toggleElement;

    panelElement;
    startInput;
    endInput;
    submitElement;

    onNavigation;
    onToggle;

    constructor(containerElement, onNavigation) {
        this.onNavigation = onNavigation;

        this.containerElement = containerElement;
        this.toggleElement = document.createElement('div');
        this.toggleElement.classList.add('toggle-btn');
        this.panelElement = this.createPanel();

        this.containerElement.appendChild(this.toggleElement);
        this.containerElement.appendChild(this.panelElement);

        this.toggleElement.addEventListener('click', this.togglePanel.bind(this));
        this.submitElement.addEventListener('click', this.submitLocation.bind(this));
    }

    createPanel() {
        const panelElement = document.createElement('div');
        panelElement.classList.add('panel');

        this.startInput = new LocationInput(document.createElement('div'));
        this.endInput = new LocationInput(document.createElement('div'));
        this.submitElement = this.createSubmitButton();

        panelElement.appendChild(this.createLabel('Start location'));
        panelElement.appendChild(this.startInput.containerElement);
        panelElement.appendChild(this.createLabel('End location'));
        panelElement.appendChild(this.endInput.containerElement);
        panelElement.appendChild(this.submitElement);

        return panelElement;
    }

    createLabel(text) {
        const element = document.createElement('p');
        element.innerText = text;
        return element;
    }

    createSubmitButton() {
        const submitElement = document.createElement('button');
        submitElement.innerText = 'Navigation';
        submitElement.classList.add('submit-btn');
        return submitElement;
    }

    togglePanel() {
        this.toggleElement.classList.toggle('active');
        this.panelElement.classList.toggle('show');
        if (typeof this.onToggle === 'function') {
            const state = this.toggleElement.classList.contains('active');
            this.onToggle(state);
        }
    }

    async getRoute() {
        const start = this.startInput.coordinates;
        const end = this.endInput.coordinates;
        const route = await MapboxAPI.getRoute(start, end); 
        return route;
    }

    get isActive() {
        return this.toggleElement.classList.contains('active');
    }
    
    submitLocation() {
        this.getRoute().then(route => {
            if (typeof this.onNavigation === 'function') {
                this.onNavigation(route);
            }
        });
    }
}