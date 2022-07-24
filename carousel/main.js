const images = [
    'https://images.unsplash.com/photo-1655379460199-4625c811fcb6?ixlib=rb-1.2.1&dl=dimitar-krastev-5eK29aH8Gcs-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1655508342579-d139e8d74bbf?ixlib=rb-1.2.1&dl=lucas-hoang-tlT0AQPOUU0-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1655422701837-c1b86521c1b4?ixlib=rb-1.2.1&dl=lance-reis-uTk8R1JFe94-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1645583918683-39fd75293e80?ixlib=rb-1.2.1&dl=adrian-mag-_aN7C5gfn8k-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1655386283686-fc82a1864a10?ixlib=rb-1.2.1&dl=cassiano-psomas-se9wjNgMa-I-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1655372501819-4c1261a50c55?ixlib=rb-1.2.1&dl=jalil-saeidi-hHRby8ihaOo-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
];
let currentIndex = undefined;
let thumbnailElements = [];
let inAnimation = false;

let imageContainer = document.querySelector('.image');
const previewPanel = document.querySelector('.preview-panel');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const thumbnailPanel = document.querySelector('.thumbnail-panel');

function createImageContainerElement(imageLink, inLeftSide) {
    const element = document.createElement('div');
    element.style.backgroundImage = `url(${imageLink})`;
    element.classList.add('image', inLeftSide ? 'left-container' : 'right-container');
    return element;
}

function loadImage(index) {
    if (index === currentIndex) {
        return;
    }
    
    if (inAnimation) {
        return;
    } else {
        inAnimation = true;
    }

    const isMoveFromLeft = index < currentIndex;
    const newImageContainer = createImageContainerElement(images[index], isMoveFromLeft);
    previewPanel.appendChild(newImageContainer);
    
    setTimeout(() => {
        imageContainer.classList.add(isMoveFromLeft? 'right-container' : 'left-container');
        newImageContainer.classList.remove('left-container', 'right-container');
    }, 50);

    setTimeout(() => {
        imageContainer.remove();
        imageContainer = newImageContainer;
        updateThumbnail(index);
        inAnimation = false;
    }, 500);
}

function updateThumbnail(index) {
    thumbnailElements[currentIndex]?.classList.remove('active');
    thumbnailElements[index].classList.add('active');
    thumbnailElements[index].scrollIntoView({behavior: 'smooth'});
    currentIndex = index;
}

function loadNextImage() {
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    loadImage(nextIndex);
}

function loadPrevImage() {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
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
loadImage(0);