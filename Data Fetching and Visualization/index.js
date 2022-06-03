class Chart {
    constructor(occ, maxNum) {
        this.occurrences = occ;
        this.maxNum = maxNum;
        this.maxFreq = Math.max(...Object.values(occ));
        this.maxHeight = 100;
        this.width = `${Math.floor( (document.body.clientWidth / 2) / (Object.keys(occ).length))}px`;
    }

    /**
     * Creates the bars for the chart
     */
    createBars() {
        const barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");
    
        Object.values(this.occurrences).forEach(occ => {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${100 * (occ / this.maxFreq)}%`;
            bar.style.width = this.width;

            barContainer.append(bar);
        });

        return barContainer;
    }

    /**
     * Creates the x-axis for the chart
     */
    createXAxis() {
        const xAxis = document.createElement("div");
        xAxis.classList.add("x-axis");
        
        let axes = [];
        console.log({m: this.maxNum, g: this.maxNum > 30})
        if (this.maxNum > 30) {
            const offset = Math.floor(this.maxNum / 10);
            for (let i = 0; i < this.maxNum + offset; i += offset) {
                axes.push(i);
            }
        }
        else {
            axes = Object.keys(this.occurrences);
        }

        axes.forEach(val => {
            console.log({val, v: typeof val})
            const axis = document.createElement("p");
            axis.classList.add("x-axis-value");
            axis.style.width = this.width;
            axis.style.textAlign = "center";
            axis.textContent = val;

            xAxis.append(axis);
        })

        return xAxis;
    }

    /**
     * Creates the y-axis for the chart
     */
    createYAxis() {
        const yAxis = document.createElement("div");
        yAxis.classList.add("y-axis");

        const offset = Math.ceil(this.maxFreq / 10);
        for (let i = 0; i <= this.maxFreq; i += offset) {
            const axis = document.createElement("p");
            axis.classList.add("y-axis-value");
            axis.style.textAlign = "center";
            axis.textContent = i;
    
            yAxis.append(axis);
        }

        return yAxis;
    }

    /**
     * Creates the chart
     */
    createChart() {
        const bars = this.createBars();
        const xAxis = this.createXAxis();
        const yAxis = this.createYAxis();
        const chart = document.createElement("div");
        chart.classList.add("chart");

        const chartContainer = document.createElement("div");
        chartContainer.classList.add("chart-container");
        chartContainer.append(yAxis, bars);

        chart.append(chartContainer, xAxis);

        document.getElementById("app").append(chart);
    }
}

/**
 * Fetches data and creates the chart
 */
const main = async () => {
    const endpoint = "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";

    const fetchData = await fetch(endpoint);
    const data = (await fetchData.text()).split('\n');
    let occurrences = {};
    data.forEach(num => {
        if (num !== "") {
            if (num !== "" && occurrences[num] === undefined) occurrences[num] = 0;
            occurrences[num]++;
        }
    })

    const max = Number(endpoint.split("max=")[1].split("&")[0]);
    const charts = new Chart(occurrences, max);
    charts.createChart();
}

main();