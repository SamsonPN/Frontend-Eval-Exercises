class Carousel {
    constructor() {
        this._subreddit = "Maplestory";
        this._query = "Day";
        this._images = null;
        this._selectors =  null;
        this._num_images = 0;
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

    generateImgSelectors() {
        const selector_container = document.getElementById('carousel-image-selector');
        selector_container.innerHTML = "";
        const fragment = new DocumentFragment();

        for (let i = 0; i < this._num_images; i++) {
            let img_selector = document.createElement('img');
            img_selector.src = './assets/image-selector-unfilled.svg';
            img_selector.classList.add('image-circle');
    
            img_selector.addEventListener('click', () => {
                this.selectImage(i);
            })
            fragment.append(img_selector);
        }
    
        selector_container.append(fragment);
        this._selectors = [...document.getElementsByClassName('image-circle')];
    }

    preloadImages (images) {
        // create fragment and preload images
        const fragment = new DocumentFragment();
        const image_carousel = document.getElementById('image-carousel-wrapper');
        image_carousel.innerHTML = "";
        let i = 0;
        let num_images = 0;
    
        while ((i < images.length && i < 100) && fragment.childElementCount < 10) {
            let image = images[i].data.url_overridden_by_dest;
            if (image && (image.indexOf('.jpg') !== -1 || image.indexOf('.png') !== -1)) {
                let img = document.createElement('img');
                img.src = image;
                img.classList.add('image-carousel');
                img.alt = 'Image Carousel';
                fragment.append(img);
                num_images++;
            }
            i++;
        }
    
        image_carousel.appendChild(fragment);

        this._images = [...document.getElementsByClassName('image-carousel')];
        this._num_images = num_images;
    }
    
    async fetchImages() {
        const url = `https://www.reddit.com/r/${this._subreddit}/top/.json?t=${this._query}`;
        const fetch_images = await fetch(url);
        const images = await fetch_images.json();
    
        return images;
    }

    async start() {
        // fetch images and start carousel
        const fetch_images = await this.fetchImages();
        const images = fetch_images.data.children;

        // preload images
        this.preloadImages(images);
        
        // initiate and start the carousel
        this.generateImgSelectors();
        this.selectImage(0);
    }

    // getters/setters
    get subreddit() {
        return this._subreddit;
    }

    set subreddit(new_sub) {
        this._subreddit = new_sub;
        return this._subreddit;
    }

    get query() {
        return this._query;
    }

    set query(new_query) {
        this._query = new_query;
        return this._query
    }
}

const resetElementHighlights = (elements) => {
    elements.forEach(element => {
        element.classList.remove('highlighted');
    })
}

const main = async () => {
    const carousel = new Carousel();
    carousel.start();

    // add event listeners to left/right arrows
    const left_arrow = document.getElementById('carousel-left-arrow');
    const right_arrow = document.getElementById('carousel-right-arrow');

    left_arrow.addEventListener('click', () => carousel.moveCarouselLeft())
    right_arrow.addEventListener('click', () => carousel.moveCarouselRight());

    // add event listeners to subreddit buttons
    const subreddit_btns = [...document.getElementsByClassName('subreddit-btn')];
    const subreddit_queries = [...document.getElementsByClassName('subreddit-query')];

    subreddit_btns.forEach(btn => {
        btn.addEventListener('click', async () => {
            resetElementHighlights(subreddit_btns);
            btn.classList.add('highlighted');
            carousel.subreddit = btn.textContent;
            carousel.start();
        })
    })

    subreddit_queries.forEach(query => {
        query.addEventListener('click', () => {
            resetElementHighlights(subreddit_queries);
            query.classList.add('highlighted');
            carousel.query = query.textContent.toLowerCase();
            carousel.start();
        })
    })
}

main();