import MapboxAPI from './mapboxApi.js';

class SuggestionList {
    element;

    constructor(element) {
        this.element = element;
    }

    show(suggestions, onClickItem) {
        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('li');
            suggestionElement.innerText = suggestion.name;
            suggestionElement.dataset.coordinates = suggestion.coordinates;
            suggestionElement.addEventListener('click', onClickItem);
            suggestionElement.addEventListener('click', this.hide.bind(this));
            this.element.appendChild(suggestionElement);
        });
        this.element.classList.add('show');
    }

    hide() {
        this.element.classList.remove('show');
        this.element.innerHTML = '';
    }
}

export default class LocationInput {
    containerElement;
    inputElement;

    suggestionList;
    suggestionTimer;
    onCompleteSuggestion;

    name;
    coordinates;

    constructor(containerElement, onCompleteSuggestion) {
        this.onCompleteSuggestion = onCompleteSuggestion;
        this.containerElement = containerElement;
        this.containerElement.classList.add('location-input');

        this.inputElement = document.createElement('input');
        this.suggestionList = new SuggestionList(document.createElement('ul'));

        this.containerElement.appendChild(this.inputElement);
        this.containerElement.appendChild(this.suggestionList.element);

        this.inputElement.addEventListener('input', this.handleInput.bind(this));
        this.inputElement.addEventListener('focusout', this.handleFocusOut.bind(this));
        this.inputElement.addEventListener('focusin', this.getSuggestions.bind(this));  
    }

    handleInput() {
        clearTimeout(this.suggestionTimer);
        this.suggestionList.hide();
        this.setData();
        this.suggestionTimer = setTimeout(this.getSuggestions.bind(this), 500);
    }

    handleFocusOut(event) {
        const target = event.explicitOriginalTarget;
        if (this.containerElement.contains(target)) {
            return;
        }  
        clearTimeout(this.suggestionTimer);
        this.suggestionList.hide();
    }

    async getSuggestions() {
        const text = this.inputElement.value;
        if (text.length < 3) {
            return;
        }

        const suggestions = await MapboxAPI.getPlace(text);
        this.suggestionList.show(suggestions, this.onClickItem.bind(this));
    }

    onClickItem(event) {
        this.showData(event.target.innerHTML, event.target.dataset.coordinates.split(','));
        
        if (typeof this.onCompleteSuggestion === 'function') {
            this.onCompleteSuggestion(this.coordinates, this.name);
        }
    }

    setData(name, coordinates) {
        this.name = name;
        this.coordinates = coordinates;
    }

    showData(name, coordinates) {
        this.setData(name, coordinates);
        this.inputElement.value = this.name;
    }

    getData() {
        return {
            name: this.name,
            coordinates: this.coordinates,
        };
    }
}
