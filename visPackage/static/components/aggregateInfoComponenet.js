class aggregateInfoComponenet extends baseComponent {
    constructor(uuid) {
        super(uuid);
        this.subscribeDatabyNames(["selection"], "paperList");

        this.setupUI();

    }

    setupUI() {
        this.container = select(this.div);
        let dropdown = this.container.append("div")
            .attr("class", "btn-group");
        dropdown.append("button")
            .attr("class", "btn btn-secondary btn-sm dropdown-toggle")
            .attr("type", "button")
            .attr("data-toggle", "dropdown")
            .attr("aria-haspopup", "true")
            .html("aggregate-by");
        let menu = dropdown.append("div")
            .attr("class", "dropdown-menu");
        menu.append("a")
            .attr("class", "dropdown-item")
            .on("click", d => {
                this.handleAggregateInfo("chemicals");
            })
            .html("chemicals");
    }

    parseDataUpdate(msg) {
        super.parseDataUpdate(msg);
        switch (msg['name']) {
            case "paperList":
                console.log("paperList updated");
                this.draw();
                break;
            case "selection":
                this.filter = this.data["selection"];
                // console.log("filter updated", this.filter);
                this.draw();
                break;

            case "highlight":
                this.highlight = this.data["highlight"];
                break;
        }
    }

    parseFunctionReturn(msg) {
        super.parseFunctionReturn(msg);

        switch (msg['name']) {
            case "aggregateByKeys":
                this.handleAggregateInfo(msg['data']);
        }

    }

    initSvg() {
        this.barChart = new barChart(this.div + "barChart");
        this.scatterplot = new simpleScatterPlot(this.div + "scatterplot");
    }

    handleAggregateInfo(data) {
        console.log(data);

    }

    /*
    Half scatterplot / half bar chat
    */
    draw() {
        this.initSvg();
        // bar char
        this.barChart.draw();
        // scatterplot
        this.scatterplot.draw();
    }

}
