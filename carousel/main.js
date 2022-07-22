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

let imageContainer = document.querySelector('.image');
const previewPanel = document.querySelector('.preview-panel');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const thumbnailPanel = document.querySelector('.thumbnail-panel');

function imageContainerElement(imageLink, inLeft = false) {
    const element = document.createElement('div');
    element.style.backgroundImage = `url(${imageLink})`;
    element.classList.add('image', inLeft ? 'left-container' : 'right-container');
    return element;
}

function loadImage(index) {
    if (index === currentIndex) {
        return;
    }

    const isMoveFromLeft = index < currentIndex;
    const newImageContainer = imageContainerElement(images[index], isMoveFromLeft);
    previewPanel.appendChild(newImageContainer);
    
    setTimeout(() => {
        imageContainer.classList.add(isMoveFromLeft? 'right-container' : 'left-container');
        newImageContainer.classList.remove('left-container', 'right-container');
    })

    setTimeout(() => {
        imageContainer.remove();
        imageContainer = newImageContainer;
        updateThumbnail(index);
    }, 1000);
}

function updateThumbnail(index) {
    thumbnailElements[currentIndex]?.classList.remove('active');
    thumbnailElements[index].classList.add('active');
    thumbnailElements[index].scrollIntoView({behavior: 'smooth'});
    currentIndex = index;
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
loadImage(0);