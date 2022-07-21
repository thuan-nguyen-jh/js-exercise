const images = [
    'https://via.placeholder.com/400x250?text=1',
    'https://via.placeholder.com/400x250?text=2',
    'https://via.placeholder.com/400x250?text=3',
    'https://via.placeholder.com/400x250?text=4',
    'https://via.placeholder.com/400x250?text=5',
    'https://via.placeholder.com/400x250?text=6'
];
let currentIndex = 0;
let thumbnailElements = [];

const imageReview = document.querySelector('.image');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const thumbnailPanel = document.querySelector('.thumbnail-panel');

function loadImage(index) {
    updateThumbnail(index);
    currentIndex = index;
    imageReview.style.backgroundImage = `url(${images[index]})`;
}

function updateThumbnail(index) {
    thumbnailElements[currentIndex].classList.remove('active');
    thumbnailElements[index].classList.add('active');
    thumbnailElements[index].scrollIntoView({behavior: 'smooth'});
}

function loadNextImage() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
        nextIndex = 0;
    }
    loadImage(nextIndex);
}

function loadPrevImage() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = images.length - 1;
    }
    loadImage(prevIndex);
}

function loadThumbnails(images) {
    images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        thumbnail.style.backgroundImage = `url(${image})`;
        thumbnail.addEventListener('click', () => {loadImage(index)});

        thumbnailPanel.appendChild(thumbnail);
        thumbnailElements.push(thumbnail);
    });
}

nextButton.addEventListener('click', loadNextImage);
prevButton.addEventListener('click', loadPrevImage);

loadThumbnails(images);
loadImage(currentIndex);