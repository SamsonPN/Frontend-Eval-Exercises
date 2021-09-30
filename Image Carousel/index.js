class Carousel {
    constructor() {
        this._images = [...document.getElementsByClassName('image-carousel')];
        this._index = 0;
        this._interval = null;
    }

    setImage() {
        this._images[this._index].style.display = 'block';
    }

    resetImage() {
        this._images[this._index].style.display = 'none';
    }

    rotateImage() {
        this.setImage();
        this._interval = setInterval(() => {
            this.moveCarouselRight();
        }, 3000)
    }

    moveCarouselLeft() {
        this.resetImage();
        this._index--;
        this.setImage();
        clearInterval(this._interval);
        this.rotateImage();
    }
    
    moveCarouselRight() {
        this.resetImage();
        this._index++;
        this.setImage();
        clearInterval(this._interval);
        this.rotateImage();
    }
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
}

const preloadImgages = (images) => {
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

    preloadImgages(images);

    const carousel = new Carousel();
    carousel.rotateImage();

    // add event listeners to left/right arrows
    const left_arrow = document.getElementById('carousel-left-arrow');
    const right_arrow = document.getElementById('carousel-right-arrow');

    left_arrow.addEventListener('click', () => carousel.moveCarouselLeft())
    right_arrow.addEventListener('click', () => carousel.moveCarouselRight());
}

main();