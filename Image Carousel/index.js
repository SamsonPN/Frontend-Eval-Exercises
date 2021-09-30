class Carousel {
    constructor() {
        this._images = [...document.getElementsByClassName('image-carousel')];
        this._selectors = null;
        this._interval = null;
        this._index = 0;
    }

    displayImage() {
        this._images[this._index].style.display = 'block';
        this._selectors[this._index].src = './assets/image-selector-filled.svg';
    }

    resetImage() {
        this._images[this._index].style.display = 'none';
        this._selectors[this._index].src = './assets/image-selector-unfilled.svg';
    }

    resetInterval() {
        this.displayImage();
        clearInterval(this._interval);
        this.rotateImage();
    }

    rotateImage() {
        this._interval = setInterval(() => {
            this.moveCarouselRight();
        }, 3000)
    }

    moveCarouselLeft() {
        this.resetImage();
        if (this._index === 0 ) {
            this._index = 0;
        }
        else {
            this._index--;
        }

        this.resetInterval();
    }
    
    moveCarouselRight() {
        this.resetImage();
        if (this._index === this._images.length - 1) {
            this._index = 0;
        }
        else {
            this._index++;
        }

        this.resetInterval();
    }

    selectImage(new_index) {
        this.resetImage();
        this._index = new_index;
        this.resetInterval();
    }

    // getters/setters
    get index() {
        return this._index;
    }

    set index(new_index) {
        this._index = new_index;
    }

    get interval() {
        return this._interval;
    }

    set interval(new_interval) {
        this._interval = new_interval;
    }

    get selectors() {
        return this._selectors;
    }

    set selectors(new_selectors) {
        this._selectors = new_selectors;
    }
}

const generateImgSelectors = (num_images, carousel) => {
    const selector_container = document.getElementById('carousel-image-selector');
    const fragment = new DocumentFragment();

    for (let i = 0; i < num_images; i++) {
        let img_selector = document.createElement('img');
        img_selector.src = './assets/image-selector-unfilled.svg';
        img_selector.classList.add('image-circle');

        img_selector.addEventListener('click', () => {
            carousel.selectImage(i);
        })
        fragment.append(img_selector);
    }

    selector_container.append(fragment);
}

const preloadImages = (images) => {
    // create fragment and preload images
    const fragment = new DocumentFragment();
    const main = [...document.getElementsByTagName('main')][0];
    images.forEach(image => {
        let img = document.createElement('img');
        img.src = image.download_url;
        img.classList.add('image-carousel');
        img.alt = 'Image Carousel';
        fragment.append(img);
    })

    main.appendChild(fragment);

}

const main = async () => {
    // fetch images and start carousel
    const fetch_images = await fetch('https://picsum.photos/v2/list');
    const images = await fetch_images.json();

    // preload images
    preloadImages(images);
    
    // initiate and start the carousel
    const carousel = new Carousel();
    generateImgSelectors(images.length, carousel);
    carousel.selectors = [...document.getElementsByClassName('image-circle')];
    carousel.displayImage();
    carousel.rotateImage();

    // add event listeners to left/right arrows
    const left_arrow = document.getElementById('carousel-left-arrow');
    const right_arrow = document.getElementById('carousel-right-arrow');

    left_arrow.addEventListener('click', () => carousel.moveCarouselLeft())
    right_arrow.addEventListener('click', () => carousel.moveCarouselRight());
}

main();