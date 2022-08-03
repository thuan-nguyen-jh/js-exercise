export default class Carousel {
  #images;
  #currentIndex;
  #isInAnimation;

  #carouselContainer;

  #previewPanel;
  #previewElement;
  #nextButton;
  #prevButton;

  #thumbnailPanel;
  #thumbnailElements;

  constructor(carouselContainer, image) {
    this.#carouselContainer = carouselContainer;
    this.#carouselContainer.classList.add('carousel');
    this.#carouselContainer.innerHTML = `
        <div class="preview-panel">
            <div class="preview"></div>
            <div class="navigation">
                <div class="button prev"></div>
                <div class="button next"></div>
            </div>
        </div>
        <div class="thumbnail-panel"></div>
        `;
    this.#previewPanel = this.#carouselContainer.querySelector('.preview-panel');
    this.#previewElement = this.#previewPanel.querySelector('.preview');
    this.#nextButton = this.#previewPanel.querySelector('.button.next');
    this.#prevButton = this.#previewPanel.querySelector('.button.prev');
    this.#thumbnailPanel = this.#carouselContainer.querySelector('.thumbnail-panel');

    this.#nextButton.addEventListener('click', this.loadNextImage.bind(this));
    this.#prevButton.addEventListener('click', this.loadPrevImage.bind(this));

    this.#images = image;
    this.#isInAnimation = false;
    this.#loadThumbnail();
    this.loadImage(0);
  }

  #loadThumbnail() {
    this.#thumbnailElements = this.#images.map((image, index) => {
      const thumbnailElement = document.createElement('div');
      thumbnailElement.classList.add('thumbnail');
      thumbnailElement.style.backgroundImage = `url(${image})`;
      thumbnailElement.addEventListener('click', () => {
        this.loadImage(index);
      });
      this.#thumbnailPanel.appendChild(thumbnailElement);
      return thumbnailElement;
    });
  }

  #updateThumbnail(index) {
    this.#thumbnailElements[this.#currentIndex]?.classList.remove('active');
    this.#thumbnailElements[index].classList.add('active');
    this.#thumbnailElements[index].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }

  #createPreviewElement(imageLink, isInLeftSide) {
    const element = document.createElement('div');
    element.style.backgroundImage = `url(${imageLink})`;
    element.classList.add('preview', isInLeftSide ? 'left-container' : 'right-container');
    return element;
  }

  loadImage(index) {
    if (index === this.#currentIndex) {
      return;
    }

    if (this.#isInAnimation) {
      return;
    }

    this.#isInAnimation = true;
    const isMoveFromLeft = index < this.#currentIndex;
    const newPreviewElement = this.#createPreviewElement(this.#images[index], isMoveFromLeft);
    this.#previewPanel.appendChild(newPreviewElement);

    // set timeout to make sure the new element is added to the DOM
    setTimeout(() => {
      this.#previewElement.classList.add(isMoveFromLeft ? 'right-container' : 'left-container');
      newPreviewElement.classList.remove('left-container', 'right-container');
      
      this.#updateThumbnail(index);
    }, 50);

    setTimeout(() => {
      this.#previewElement.remove();
      this.#previewElement = newPreviewElement;
      this.#isInAnimation = false;
      this.#currentIndex = index;
    }, this.#ANIMATION_INTERVAL);
  }

  loadNextImage() {
    const nextIndex = this.#currentIndex + 1 < this.#images.length ? this.#currentIndex + 1 : 0;
    this.loadImage(nextIndex);
  }

  loadPrevImage() {
    const prevIndex = this.#currentIndex - 1 >= 0 ? this.#currentIndex - 1 : this.#images.length - 1;
    this.loadImage(prevIndex);
  }

  get #ANIMATION_INTERVAL() {
    return 500;
  }
}