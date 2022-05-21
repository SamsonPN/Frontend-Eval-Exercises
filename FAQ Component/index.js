// works on Chrome but not on Firefox!
const sheets = new CSSStyleSheet();
sheets.replaceSync(`
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
    }
    .faq {
        display: flex;
        flex-direction: column;
        justify-contents: center;
        align-items: center;
        border-radius: 10%;
    }

    h1 {
        margin-bottom: 2.5vw;
    }

    .qa-item {
        width: 50vw;
        display: flex;
        align-items: flex-start;
        padding: 7.5%;
        border: 1px solid black;
        margin-bottom: 2.5vw;
    }
    
    .qa-item:hover {
        opacity: 0.75;
        cursor: pointer;
    }

    .qa-wrapper {
        display: flex;
        flex-direction: column;
    }

    .img-wrapper {
        display: flex;
        align-items: center;
        margin-right: 1vw;
    }

    img {
        width: 1.5rem;
        margin-top: 5px;
    }

    .question {
        font-size: 1.5rem;
        margin-bottom: 0.5vh;
    }

    .answer {
        display: none;
        font-size: 1.5rem;
        color: gray;
    }
`);

class FAQ extends HTMLElement {
    #faq;
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.adoptedStyleSheets = [sheets];

        this.#faq = document.createElement("main");
        this.#faq.classList.add('faq');

        const header = document.createElement('h1');
        header.textContent = 'Frequently Asked Questions';

        this.#faq.append(header);

        this.shadowRoot.append(this.#faq);
    }

    static get observedAttributes() {
        return ['data-qa'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let data;
        try {
            data = JSON.parse(newValue);
        }
        catch(e) {
            console.error(e);
            console.log({name, oldValue, newValue});
        }

        this.render(data);
    }

    displayAnswer(answer) {
        const isDisplayed = answer.style.display === "block";
        answer.style.display = isDisplayed ? "none" : "block";
    }

    toggleArrow(arrow, display) {
        arrow.src = display === "block" ? "./assets/down-arrow.svg" : "./assets/right-arrow.svg";
    }


    render(data) {
        const faqContainer = document.createElement("div");
        faqContainer.classList.add("faq-container");
        
        data.forEach((item, i) => {
            // create the question/answer item
            const qaItem = document.createElement("div");
            qaItem.classList.add("qa-item");

            // wrapper around image
            const imgWrapper = document.createElement("div");
            imgWrapper.classList.add("img-wrapper");

            // arrow image next to question/answer
            const arrow = document.createElement("img");
            arrow.src = i === 0 ? "./assets/down-arrow.svg" : "./assets/right-arrow.svg";
            imgWrapper.append(arrow);
            
            // wrapper around question/answer paragraphs
            const qaWrapper = document.createElement("div");
            qaWrapper.classList.add("qa-wrapper");

            const question = document.createElement("p");
            question.classList.add("question");
            question.textContent = item.question;
            
            const answer = document.createElement("p");
            answer.classList.add("answer");
            answer.textContent = item.answer;
            // first q/a item displays the answer
            if (i === 0) {
                answer.style.display = "block";
            }
            
            qaWrapper.append(question, answer);

            qaItem.append(imgWrapper, qaWrapper);   
            
            // event listener to toggle answer/arrow
            qaItem.onclick = () => {
                this.displayAnswer(answer);
                this.toggleArrow(arrow, answer.style.display);
            }

            faqContainer.append(qaItem); 
        })

        this.#faq.append(faqContainer);
    }
}

customElements.define('faq-component', FAQ);