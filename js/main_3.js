var draw_data_viz = function () {
    var svg = dimple.newSvg("body", 1800, 1200);
    d3.csv("/data/2001_proportional_cancellations_delays_and_flights.csv", function (data) {
        // Add a ititle to the chart.
        svg.append("text")
            .attr("x", 900)
            .attr("y", 14)
            .attr("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text("The Reliability of US Flights around September 11th 2001");

        // Filter the data to only Include August September and October
        data = data.filter(function(d) {
            var date = new Date(d.Date);
            var lower_boundary = new Date(2001, 7, 1);
            var upper_boundary = new Date(2001, 10, 1);
            return date >= lower_boundary && date < upper_boundary;
        });

        // Draw the main chart
        var bubbles = new dimple.chart(svg, data);
        bubbles.setBounds(60, 30, 1700, 1000)
        var x = bubbles.addMeasureAxis("x", "ProportionalDelays");
        var y = bubbles.addMeasureAxis("y", "ProportionalCancellations");
        var z = bubbles.addMeasureAxis("z", "NumFlights");
        bubbles.addSeries("CarrierName", dimple.plot.bubble)
        bubbles.addLegend(1200, 40, 500, 60, "right");

        // Fix the axis so they don't move during the animation.
        x.overrideMin = -0.1;
        x.overrideMax = 1.1;
        y.overrideMin = -0.1;
        y.overrideMax = 1.1;

        // Add a storyboard to the main chart and set the tick event
        var story = bubbles.setStoryboard("Date");
        story.frameDuration = 500;
        // Order the storyboard by date
        story.addOrderRule("Date");
        // Draw the bubble chart
        bubbles.draw();

        // Position the story label near the legend.
        story.storyLabel.attr("y", 50);
        story.storyLabel.attr("x", 1075);
        story.storyLabel.style("font-size", "14px");
    });
}
