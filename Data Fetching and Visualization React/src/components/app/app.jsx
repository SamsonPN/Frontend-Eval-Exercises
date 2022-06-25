import {useState, useEffect, useRef} from 'react';
import Chart from '../chart';
import DataForm from '../dataForm';
import RefetchBtn from '../refetchBtn';
import './app.css';

function App() {
  const chartRef = useRef({
    "totalNum": 200,
    "minNum": 1,
    "maxNum": 10
  });
  const {totalNum, minNum, maxNum} = chartRef.current;
  const [occurrences, setOccurrences] = useState([]);
  const [maxFreq, setMaxFreq] = useState(1);
  const [endpoint, setEndpoint] = useState([`https://www.random.org/integers/?num=${totalNum}&min=${minNum}&max=${maxNum}&col=1&base=10&format=plain&rnd=new`]);

  const inputHandler = (e) => {
    let {name, value} = e.target;
    value = Number(value);
    const refNames = {
      "num": "totalNum",
      "min": "minNum",
      "max": "maxNum"
    }
    chartRef.current[refNames[name]] = value;
  }

  const refetchHandler = () => {
    const {totalNum, minNum, maxNum} = chartRef.current;
    const newEndpoint = [`https://www.random.org/integers/?num=${totalNum}&min=${minNum}&max=${maxNum}&col=1&base=10&format=plain&rnd=new`];
    setEndpoint(newEndpoint);
  }

  useEffect(() => {
    fetch(endpoint[0])
      .then(res => res.text())
      .then(data => {
        data = data.split('\n');

        let occ = {};
        data.forEach(num => {
          if (num !== "") {
            if (num !== "" && occ[num] === undefined) occ[num] = 0;
            occ[num]++;
          }
        })

        setOccurrences(occ);
        setMaxFreq(Math.max(...Object.values(occ)));

        const root = document.documentElement;
        const width = (`${((document.body.clientWidth / 2) / (Object.keys(occ).length))}px`);
        root.style.setProperty("--chart-bar-width", width);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
      });

  }, [endpoint, fetch])

  return (
    <div id="App">
      <main>
        <div id="chart-wrapper">
          <Chart minNum={minNum} maxNum={maxNum} occ={occurrences} maxFreq={maxFreq}/>
        </div>
        <h2>Dataset Options</h2>
        <DataForm handler={inputHandler}/>
        <RefetchBtn handler={refetchHandler} />
      </main>
    </div>
  );
}

export default App;
