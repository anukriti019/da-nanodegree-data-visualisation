var draw_data_viz = function () {
    var svg = dimple.newSvg("#data-viz", 1280, 800);
    d3.csv("/data/2001_proportional_cancellations_prefiltered.csv", function (data) {
        // Add a ititle to the chart.
        svg.append("text")
            .attr("x", 640)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text("The Day the FAA Stopped the World*");

        var chart = new dimple.chart(svg, data);
        chart.setBounds(100, 30, 1200, 725);

        // Set the 'Date' as the 'x' axis and format it appropriately.
        var x = chart.addCategoryAxis("x", "Date");
        x.dateParseFormat = "%m/%d/%y";
        x.timePeriod = d3.timeMonth;
        x.timeInterval = 1;
        x.timeField = "Date";
        x.tickShape = "%B";
        x.tickFormat = "%B";
        x.ticks = 6;
        x.fontSize = 16;

        // Set the 'ProportionalCancellations' as the 'y' axis and format it appropriately.
        var y = chart.addMeasureAxis("y", "ProportionalCancellations");
        y.fontSize = 16;
        y.title = "Cancellations (% of total flights for that day and carrier)";
        y.tickFormat = ".0%";

        // Add a series plot for each of the 12 carriers.
        var series = chart.addSeries("CarrierName", dimple.plot.line);

        series.getTooltipText = function (e) {
            return [
                e.aggField[0],
                e.x.toDateString(),
                "Cancellations: " + (e.y * 100).toFixed(2) + "%"
            ];
        };

        var colours = [
            "#66c2a5",
            "#fc8d62",
            "#8da0cb",
            "#e78ac3",
            "#a6d854",
            "#ffd92f"
        ];
        var carriers = [
            "American Airlines Inc.",
            "United Air Lines Inc.",
            "Delta Air Lines Inc.",
            "Continental Air Lines Inc.",
            "US Airways Inc.",
            "American Eagle Airlines Inc."
        ]
        // Set series colours.
        for (var i = 0; i < colours.length; i++) {
            chart.assignColor(carriers[i], colours[i]);
        }

        // Create the legend and draw the chart.
        var legend = chart.addLegend(100, 50, 250, 100, "right");
        legend.fontSize = 16;
        chart.draw();

        // Remove the x axis title as it is redundant.
        x.titleShape.remove();
        // Remove the 0.0 tick label for the y axis.
        svg.selectAll(".tick")
            .each(function (d) {
                if ( d === 0 ) {
                    this.remove();
                }
            });

        // Add a line to the chart indicating September 11th.
        svg.append("line")
            .attr("x1", 571)
            .attr("x2", 571)
            .attr("y1", chart._yPixels())
            .attr("y2", chart._yPixels() + chart._heightPixels())
            .style("stroke", "red")
            .style("stroke-dasharray", "10");
        svg.append("text")
            .attr("x", 455)
            .attr("y", 75)
            .style("font-family", "sans-serif")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .style("fill", "red")
            .text("September 11th");
    });
}
