/*
Code samples used from: https://github.com/vlandham/stepper_example/blob/gh-pages/final/js/stepper.js
 */

function switchStep(newStep)
{
    d3.selectAll(".step-link").classed("active", false);
    d3.select("#" + newStep).classed("active", true);

    // Reset the chart based on the select step
    if(newStep == "PatentApplication" || newStep == "WebRegistered"  || newStep == "WhitePaper" ||  newStep == "BetaReleased"  ){
        d3.select("#slide1chart1").selectAll("svg").remove().transition().delay(300).duration(500);
        FirstChart(new Date("2010-07-01"), new Date("2011-01-01"));

    } else if( newStep == "RetailTransaction" || newStep == "BitPay"  ) {
        d3.select("#slide1chart1").selectAll("svg").remove().transition().delay(300).duration(500);
        FirstChart(new Date("2010-07-01"), new Date("2012-01-01") );

    } else if( newStep == "theSurge"  ) {
        d3.select("#slide1chart1").selectAll("svg").remove().transition().delay(300).duration(500);
        FirstChart(new Date("2013-01-01"), new Date("2013-12-12") );

    } else if( newStep == "MtGox"  ) {
        d3.select("#slide1chart1").selectAll("svg").remove().transition().delay(300).duration(500);
        FirstChart(new Date("2013-12-01"), new Date("2015-10-15") );

     } else if( newStep == "BlockChain"  ) {
        d3.select("#slide1chart1").selectAll("svg").remove().transition().delay(300).duration(500);
        FirstChart(new Date("2015-01-01"), new Date("2017-01-01") );
    } else if( newStep == "Futures"  ) {
        d3.select("#slide1chart1").selectAll("svg").remove().transition().delay(300).duration(500);
        FirstChart(new Date("2017-01-01"), new Date("2018-01-01") );
    } else if( newStep == "ETF"  ) {
        d3.select("#slide1chart1").selectAll("svg").remove().transition().delay(300).duration(500);
        FirstChart(new Date("2017-12-01"), new Date("2018-07-27") );

        reset(10000);
    }
}


function switchAnnotation(newStep)
{
    d3.selectAll(".annotation-step")
        .style("display", "none")
        .style("opacity", 0.0);

    d3.select("#" + newStep + "-annotation")
        .style("display", "block")
        .transition().delay(300).duration(500)
        .style("opacity", 1);
}

d3.selectAll("a.step-link").on("click", function(d) {
    var clickedStep = d3.select(this).attr("id");
    switchStep(clickedStep);
    switchAnnotation(clickedStep);
    return false;
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function reset(time) {
    await sleep(time);
    d3.select("#slide1chart1").selectAll("svg").remove().transition().delay(300).duration(500);
    FirstChart(new Date("2011-07-01"), new Date("2018-07-27"));
    d3.selectAll(".annotation-step")
        .style("display", "none")
        .style("opacity", 0.0);
}