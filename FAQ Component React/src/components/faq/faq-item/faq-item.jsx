import React, {useState} from 'react';
import DownArrow from '../../../assets/down-arrow.svg';
import RightArrow from '../../../assets/right-arrow.svg';
import './faq-item.css';


const FaqItem = (props) => {
    const {question, answer, open} = props.qa;
    const [display, setDisplay] = useState(open);

    const displayAnswer = () => {
        setDisplay(display => !display);
    }
    return (
        <div className="qa-item" onClick={() => displayAnswer()}>
            <div className="img-wrapper">
                <img src={display ? DownArrow : RightArrow} alt="FAQ Item Arrow" />
            </div>
            <div className="qa-wrapper">
                <p className="question">{question}</p>
                <p className={`answer ${display ? "display" : "hide"}`} >{answer}</p>
            </div>
        </div>
    )
}

export default FaqItem;