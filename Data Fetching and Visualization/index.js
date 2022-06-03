class Chart {
    constructor(occ) {
        this.occurrences = occ;
        this.heightOffset = 10;
        this.width = `${Math.floor( (document.body.clientWidth / 2) / (Object.keys(this.occurrences).length + 1))}px`;
    }

    /**
     * Creates the bars for the chart
     */
    createBars() {
        const barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");
    
        for(let occ in this.occurrences) {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${this.occurrences[occ] * this.heightOffset}px`;
            bar.style.width = this.width;

            barContainer.append(bar);
        }
    
        return barContainer;
    }

    /**
     * Creates the x-axis for the chart
     */
    createXAxis() {
        const axes = Object.keys(this.occurrences);
        const xAxis = document.createElement("div");
        xAxis.classList.add("x-axis");
        axes.forEach(val => {
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

        const max = Math.max(...Object.values(this.occurrences));
        const offset = Math.ceil(max / 10);

        for (let i = 0; i <= max + offset; i += offset) {
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
    const occurrences = {};
    data.forEach(num => {
        if (num !== "") {
            if (num !== "" && occurrences[num] === undefined) occurrences[num] = 0;
            occurrences[num]++;
        }
    })

    const charts = new Chart(occurrences);
    charts.createChart();
}

main();