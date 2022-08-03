import Carousel from "./carousel.js";

const images = [
    'https://images.unsplash.com/photo-1655379460199-4625c811fcb6?ixlib=rb-1.2.1&dl=dimitar-krastev-5eK29aH8Gcs-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1655508342579-d139e8d74bbf?ixlib=rb-1.2.1&dl=lucas-hoang-tlT0AQPOUU0-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1655422701837-c1b86521c1b4?ixlib=rb-1.2.1&dl=lance-reis-uTk8R1JFe94-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1645583918683-39fd75293e80?ixlib=rb-1.2.1&dl=adrian-mag-_aN7C5gfn8k-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1655386283686-fc82a1864a10?ixlib=rb-1.2.1&dl=cassiano-psomas-se9wjNgMa-I-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1655372501819-4c1261a50c55?ixlib=rb-1.2.1&dl=jalil-saeidi-hHRby8ihaOo-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
];

const carousel = new Carousel(document.querySelector('.carousel'), images); 