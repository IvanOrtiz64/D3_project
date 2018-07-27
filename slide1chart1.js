/**
 *  Found Code example at https://bl.ocks.org/mbostock/3883245.
 *  https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915
 *  https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3
 */

function slide1chart1() {

    function tooltipHtml(n, d) {    /* function to create html content string in tooltip div. */
        return "<h4>" + n + "</h4><table class='w3-table w3-striped'>" +
            "<tr><td>Poverty</td><td>" + (d.poverty) + "</td></tr>" +
            "<tr><td>College</td><td>" + (d.college) + "</td></tr>" +
            "<tr><td>Poverty Diff</td><td>" + (d.povertydiff) + "</td></tr>" +
            "<tr><td>College Diff</td><td>" + (d.collegediff) + "</td></tr>" +
            "</table>";
    }


    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +(window.innerWidth*.75) - margin.left - margin.right,
        height = +(window.innerHeight*.6) - margin.top - margin.bottom;


    // Set up svg for graph  .attr('class','lineGraph')
    var svg = d3.select("#slide1chart1").append("svg")
            .attr("id","ChartOne")
            .attr("width", ((window.innerWidth*.8) - margin.left - margin.right))
            .attr("height",((window.innerHeight*.7) - margin.top - margin.bottom))
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Parser to format date
    var parseTime = d3.timeParse("%d/%m/%Y")
        bisectDate = d3.bisector(function(d) { return d.date; }).left;

    // Scales
    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);


    // Line graph
    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.price); });


    // Get the data
    d3.csv("btc2.csv", function(error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function(d) {
            d.date = parseTime(d.date);
            d.marketcap = +d.marketcap;
            d.price = +d.price;
          });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([d3.min(data, function(d) { return d.price; }) / 1.2, d3.max(data, function(d) { return d.price; }) * 1.125]);


        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);


        // Add the X Axis
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d3.timeFormat("%b %Y")))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(0)");


        // Add the Y Axis
        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(8).tickFormat(function(d) { return parseInt(d/1) + ""; }))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("fill", "#5D6971")
            .text("Price ($)");


        /* Code for tooltip and zoom in */

        // Circle Around line
        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height);

        focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width)
            .attr("x2", width);

        focus.append("circle")
            .attr("r", 7.5);

        focus.append("text")
            .attr("x", 15)
            .attr("dy", ".31em");

        // Tooltip
        svg.append("rect")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);


        // Function to handle mouse movement into graph
        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.price) + ")");
            focus.select("text").text(function() { return "Price: $" + d.price; });
            focus.append("text")
                .attr("dy","2em")
                .text(function() { return "Date: " + d.date; });
            focus.select(".x-hover-line").attr("y2", height - y(d.price));
            focus.select(".y-hover-line").attr("x2", width + width);
        }



    });

}