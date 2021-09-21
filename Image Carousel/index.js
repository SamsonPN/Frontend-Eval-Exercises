class Carousel {
    constructor(images) {
        this._images = images;
        this._index = 0;
    }

    setImage() {
        const image_carousel = document.getElementById('image-carousel');
        image_carousel.src = this._images[this._index].download_url;
    }

    rotateImage() {
        this.setImage();
        setInterval(() => {
            this._index++;
            this.setImage();
        }, 3000)
    }
    
    get index() {
        return this._index;
    }

    set index(new_index) {
        this._index = new_index;
    }

    // get images() {
    //     return this._images;
    // }

    // set images(new_images) {
    //     this._images = new_images;
    // }
}

const main = async () => {
    // fetch images and start carousel
    const fetch_images = await fetch('https://picsum.photos/v2/list');
    const images = await fetch_images.json();
    const carousel = new Carousel(images);
    carousel.rotateImage();

    // add event listeners to left/right arrows
    const left_arrow = document.getElementById('carousel-left-arrow');
    const right_arrow = document.getElementById('carousel-right-arrow');

    left_arrow.addEventListener('click', () => {
        alert('Move left');
        // carousel.index--;
        // carousel.setImage();
    })

    right_arrow.addEventListener('click', () => {
        alert('Move right');
        // carousel.index++;
        // carousel.setImage();
    })
}

main();