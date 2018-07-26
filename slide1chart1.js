/**
 *  Found Code example at https://bl.ocks.org/mbostock/3883245.
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


    // // Read Data and store in bitcoinData var
    // var bitcoinData = {};
    // d3.csv("btc.csv", function(data) {
    //     bitcoinData = data;
    //     // console.log(bitcoinData);
    // });


    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +(window.innerWidth*.75) - margin.left - margin.right,
        height = +(window.innerHeight*.6) - margin.top - margin.bottom;

    // Set up svg for graph
    var g = d3.select("#slide1chart1").append("svg")
            .attr("id","ChartOne")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("width",((window.innerWidth*.8) - margin.left - margin.right) + 'px')
            .style("height",((window.innerHeight*.7) - margin.top - margin.bottom) + 'px');


    // Parser to format date
    var parseTime = d3.timeParse("%e/%m/%Y");

    // Scales
    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    // Line graph
    var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.price); });


    // Read and parse data
    d3.tsv("btc.csv", function(d) {
        console.log("parsing Date " + parseTime(d.date));
        console.log("Price " + d.price);
        d.date = parseTime(d.date);
        d.price = +d.price;

        console.log("d " + d);
        return d;
    }, function(error, data) {
        if (error) throw error;

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.price; }));

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);


    });








}