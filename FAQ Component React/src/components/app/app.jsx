import './app.css';
import FAQ from '../faq';

function App() {
    const data = [
      {
          question: "How many bones does a cat have?",
          answer: "A cat has 230 bones - 6 more than a human",
          open: true
      },
      {
          question: "How much do cats sleep?",
          answer: "The average cat sleeps 12-16 hours per day",
          open: false
      },
      {
          question: "How long do cats live?",
          answer: "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
          open: true
      }
  ];
  
  return (
    <div id="App">
      <FAQ qa={data}/>
    </div>
  );
}

export default App;
