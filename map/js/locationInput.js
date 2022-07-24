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
            this.element.appendChild(suggestionElement);
        });
        this.element.classList.add('show');
    }

    hide() {
        this.element.classList.remove('show');
    }
}

export default class LocationInput {
    containerElement;
    inputElement;

    suggestionList;
    suggestionTimer;
    onClickItem;

    constructor(containerElement) {
        this.containerElement = containerElement;
        this.containerElement.classList.add('location-input');

        this.inputElement = document.createElement('input');
        this.suggestionList = new SuggestionList(document.createElement('ul'));

        this.containerElement.appendChild(this.inputElement);
        this.containerElement.appendChild(this.suggestionList.element);

        this.inputElement.addEventListener('input', this.handleInput.bind(this));
    }

    handleInput() {
        clearTimeout(this.suggestionTimer);
        this.suggestionList.hide();
        this.suggestionTimer = setTimeout(this.getSuggestions.bind(this), 500);
    }

    async getSuggestions() {
        const text = this.inputElement.value;
        const suggestions = await MapboxAPI.getPlace(text);
        this.suggestionList.show(suggestions, (event) => {
            this.inputElement.value = event.target.innerText;
            this.suggestionList.hide();
            this.onClickItem(event);
        });
    }
}
