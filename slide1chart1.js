/**
 * 
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



    var statesData = {};
    d3.csv("dataset.csv", function(data) {

        console.log(data);

       // console.log(data.length);
       // data.forEach(function(d)
       for(var i = 0; i < data.length; i++) {

                statesData[data[i].State] = {
                    poverty: data[i].Poverty,
                    unemployment: data[i].Unemployment,
                    college: data[i].College,
                    collegediff: data[i].College_Diff,
                    povertydiff: data[i].Poverty_Diff,

//                    low: 50, high: 100,
//                    avg: 75, color: "rgb(162, 172, 187)"
                };

                var state = statesData[data[i].State];
                if(state.collegediff > 0 && state.povertydiff < 0){
                    state.color = "rgb(70, 135, 76)";
                }else if(state.collegediff < 0 && state.povertydiff > 0){
                    state.color = "rgb(70, 135, 76)";
                }else{
                    state.color = "rgb(211, 16, 52)";
                }

                //red - rgb(211, 16, 52)
                //green - rgb(45, 147, 54)
        }
        // );
        // console.log(statesData);

        /* draw states on id #statesvg */
        var
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        var tmp = d3.select("#slide1chart1").append("svg").attr("id","statesvg1");

        d3.select("#statesvg1").append("rect").attr("x",400).attr("width",20).attr("height",20).style("fill","rgb(211, 16, 52)");
        d3.select("#statesvg1").append("text").attr("x",380).attr("y",8).attr("dy", ".55em")
            .text("No").attr("width",20).attr("height",20).attr("color","black");

        d3.select("#statesvg1").append("rect").attr("x",450).attr("width",20).attr("height",20).style("fill","rgb(70, 135, 76)");
        d3.select("#statesvg1").append("text").attr("x",430).attr("y",8).attr("dy", ".55em")
            .text("Yes").attr("width",20).attr("height",20).attr("color","black");

        tmp.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);

        uStates.draw("#statesvg1", statesData, tooltipHtml);
    });

    //ABOUT VIZ POP UP

    d3.select("#aboutpara").style("opacity",0).text("hi there you guys!!!");;

    d3.select("#aboutbutton")
        .on("click",function()
            {
                var active   = aboutpara.active ? false : true,
                    newOpacity = active ? 1 : 0;
                // Hide or show the elements
                d3.select("#aboutpara").style("opacity", newOpacity);
                aboutpara.active = active;

            });


}