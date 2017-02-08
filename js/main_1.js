var draw_data_viz = function () {
    var svg = dimple.newSvg("body", 1800, 1200);
    d3.csv("/data/2001_proportional_cancellations.csv", function (data) {
        // Add a ititle to the chart.
        svg.append("text")
            .attr("x", 900)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text("The Reliability of US Flights in 2001");

        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 1700, 1000);

        // Set the 'Date' as the 'x' axis and format it appropriately.
        var x = myChart.addCategoryAxis("x", "Date");
        x.dateParseFormat = "%m/%d/%y";
        x.timeField = "Date";
        x.tickFormat = "%B %e";
        x.fontSize = 12;

        // Set the 'ProportionalCancellations' as the 'y' axis and format it appropriately.
        var y = myChart.addMeasureAxis("y", "ProportionalCancellations");
        y.fontSize = 12;
        y.title = "Proportion of Cancelled Flights to Total Flights";

        // Add a series plot for each of the 12 carriers.
        myChart.addSeries("CarrierName", dimple.plot.line);

        myChart.addLegend(60, 40, 500, 60, "right");
        myChart.draw();
    });
}
