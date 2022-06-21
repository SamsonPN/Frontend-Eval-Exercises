class Chart {
    constructor() {
        this.occurrences = {};
        this.totalNum = 200;
        this.minNum = 1;
        this.maxNum = 10;
        this.maxFreq = null;
        this.maxHeight = 100;
        this.width = "0px";
    }

    /**
     * Generates random color for bars in bar chart
     * @returns {String} - Random color
     */
    generateBarColor() {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            let random = Math.floor(Math.random() * 16);
            let hexValue = random.toString(16);
            color = color.concat(hexValue);
        }
        return color;
    }

    createBarLabel(num, freq) {
        const label = document.createElement("div");
        label.classList.add("bar-label");

        const labelValue = document.createElement("p");
        labelValue.textContent = `Number: ${num}\nFrequency: ${freq}`;

        label.append(labelValue);

        return label;
    }

    /**
     * Creates the bars for the chart
     * @returns {HTMLELement} - Container with bar elements
     */
    createBars() {
        const barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");
        
        for (let num in this.occurrences) {
            let occ = this.occurrences[num];
            const barWrapper = document.createElement("div");
            barWrapper.classList.add("bar-wrapper");
            barWrapper.style.width = this.width;
    
            const label = this.createBarLabel(num, occ);
    
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.minHeight = `${100 * (occ / this.maxFreq)}%`;
            bar.style.width = this.width;
            bar.style.backgroundColor = this.generateBarColor();
    
            barWrapper.append(label, bar);
            barContainer.append(barWrapper);
        }

        return barContainer;
    }

    /**
     * Creates the x-axis for the chart
     */
    createXAxis() {
        const xAxis = document.createElement("div");
        xAxis.classList.add("x-axis");
        
        let axes = [];
        if (this.maxNum > 30) {
            let offset = Math.floor(this.maxNum / 100) * 10;
            if (offset <= 10) {
                offset = (10 - offset) + offset;
            }
            else if (offset < 100) {
                offset = (100 - offset) + offset;
            }
            for (let i = 0; i < this.maxNum + offset; i += offset) {
                axes.push(i);
            }
        }
        else {
            axes = Object.keys(this.occurrences);
        }

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

        const chartWrapper = document.getElementById("chart-wrapper");
        if (chartWrapper.children.length > 0) {
            chartWrapper.removeChild(chartWrapper.children[0]);
        }
        chartWrapper.append(chart);
    }

    /**
     * Fetches random numbers and organizes them into readable data for the chart
     * 
     */
    async fetchNumbers(){
        const {totalNum, minNum, maxNum} = this;
        const endpoint = `https://www.random.org/integers/?num=${totalNum}&min=${minNum}&max=${maxNum}&col=1&base=10&format=plain&rnd=new`;

        const fetchData = await fetch(endpoint);
        const data = (await fetchData.text()).split('\n');
        let occurrences = {};
        data.forEach(num => {
            if (num !== "") {
                if (num !== "" && occurrences[num] === undefined) occurrences[num] = 0;
                occurrences[num]++;
            }
        })

        this.occurrences = occurrences;
        this.maxFreq = Math.max(...Object.values(occurrences));
        this.width = `${((document.body.clientWidth / 2) / (Object.keys(occurrences).length))}px`;

        this.createChart();
    }
}


/**
 * Fetches data and creates the chart
 */
const main = async () => {
    const charts = new Chart();
    charts.fetchNumbers();

    const totalNum = document.getElementById("dataset-form-num");
    const min = document.getElementById("dataset-form-min");
    const max = document.getElementById("dataset-form-max");
    [totalNum, min, max].forEach(el => {
        el.addEventListener("input", () => {
            let {name, value} = el;
            value = Number(value);
            switch(name) {
                case "num":
                    charts.totalNum = value;
                    break;
                case "min":
                    charts.minNum = value;
                    break;
                case "max":
                    charts.maxNum = value;
                    break;
            }
        })
    })

    const refetchBtn = document.getElementById("refetch-btn");
    refetchBtn.addEventListener("click", () => {
        charts.fetchNumbers();
    })
}

main();