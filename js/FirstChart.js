/**
 *  Found Code example at https://bl.ocks.org/mbostock/3883245.
 *  https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915
 *  https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3
 *  https://beta.observablehq.com/@hydrosquall/d3-annotation-with-d3-line-chart
 *  https://bl.ocks.org/susielu/63269cf8ec84497920f2b7ef1ac85039
 *  http://vallandingham.me/stepper_steps.html
 */

function FirstChart(startDate, endDate) {

    //Margin and sizes for chart
    var margin = {top: 40, right: 30, bottom: 50, left: 40},
        width = +(window.innerWidth*.8) - margin.left - margin.right,
        height = +(window.innerHeight*.675) - margin.top - margin.bottom;


    // Set up svg for graph  .attr('class','lineGraph')
    var svg = d3.select("#slide1chart1").append("svg")
            .attr("id","ChartOne")
            .attr("width", width + margin.left + margin.right )
            .attr("height",height + margin.top + margin.bottom )
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Parser to convert date into date object
    var parseTime = d3.timeParse("%m/%d/%Y")
        bisectDate = d3.bisector(function(d) { return d.date; }).left;


    // Scales
    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);


    // // Line graph
    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.price); });


    // Read and format data
    d3.csv("data/btc.csv", function(error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function(d) {
            d.date = parseTime(d.date);
            d.price = +d.price;
        });

        // Filter Date
        data = data.filter(function(d) {
            return d.date >= startDate &&  d.date <= endDate;
        })

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.price; }) * 1.1] );

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis timeFormat("%b %Y")))
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x)
               .ticks(width/85)
               .tickSizeOuter(0)
               .tickFormat(d3.timeFormat("%b %y")))
            .selectAll("text")
            .style("text-anchor", "middle")
            .attr("dx", "-2.25em")
            .attr("dy", ".65em")
            .attr("transform", "rotate(-45)");

        // Add the Y Axis
        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10).tickFormat(function(d) { return parseInt(d/1) + ""; }))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("fill", "#5D6971")
            .text("Price ($)");

    });
}