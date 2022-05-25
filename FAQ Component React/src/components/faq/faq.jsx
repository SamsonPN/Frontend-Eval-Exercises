import React from 'react';
import FaqItem from './faq-item';
import './faq.css';

const faq = (props) => {
    const {qa} = props;
    const qaItems = qa.map(item => {
        return <FaqItem qa={item} key={item.question}/>
    })
    return (
    <main className="faq">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-container">
            {qaItems}
        </div>
    </main>
    )
}

export default faq;