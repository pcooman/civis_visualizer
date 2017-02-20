HTMLWidgets.widget({

  name: 'normalDistributionFunctions',
  type: 'output',

  initialize: function(el, width, height) {
  
  // return an instance (tob used in the renderValue function)
  // it's cool to return an empty object!
  return {};  
  },
  
  renderValue: function(el, x, instance) {
    // put pretty much all d3 code here!
    
    // clear out contents in case of dynamic/Shiny situation
    el.innerHTML = "";
    
    var my_data = _.filter(x.data, function(d) {return d.dvs == x.dv && d.subgroup == x.subgroup;});
    var treatments = _.uniq(my_data.map(function(d) { return d[x.treatmentColumn];}));
    var treatmentCount = treatments.length; 
    
    var chartWidth = el.getBoundingClientRect().width;
    var chartHeight = el.getBoundingClientRect().height;

    var width = x.chartWidth; // - x.marginLeft - x.marginRight,
    var height = x.chartHeight; // - x.marginTop - x.marginTop;

    var svg = d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
    
    var xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([x.marginLeft + 30 + parseFloat(x.yLabelFontSize), width - x.marginRight - x.legendWidth]);

    var yMax = d3.max(my_data.map(function(d) {return 1/Math.sqrt(2*Math.pow(parseFloat(d[x.toplineErrorColumn]),2)*Math.PI);}));
    
    var yScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([height-x.marginBottom-parseFloat(x.xTickLabelFontSize)-parseFloat(x.xLabelFontSize)-10, 
            x.marginTop]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(10)
    .tickFormat(d3.format(".0%")); 

  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(0)
    .tickFormat('');
    
   svg.selectAll(".markers")
    .data(_.range(0,1.1,0.1))
   .enter()
    .append("g")
    .append("line")
    .attr("class", "markers")
    .attr("y1", yScale(0))
    .attr("x1", function(d) { return xScale(d);})
    .attr("x2", function(d) { return xScale(d);})
    .attr("y2", yMax)
    .style("stroke", "whitesmoke");
    
  var pdf_data = _.range(treatmentCount).map(function(id) {
    var mu = parseFloat(my_data[id][x.toplineColumn]);
    var sigma = parseFloat(my_data[id][x.toplineErrorColumn]);
    return {
      id: my_data[id][x.treatmentColumn],
      values: _.range(0,1.01,0.01).map(function(d) {
        return {x: d, y: (Math.exp(-Math.pow(d - mu,2)/(2*Math.pow(sigma,2))))/Math.sqrt(2*Math.pow(sigma,2)*Math.PI)};
      })
    };
  });

  var area = d3.area()
    .curve(d3.curveBasis)
    .x(function(d) { return xScale(d.x);})
    .y1(function(d) {return yScale(d.y);})
    .y0(yScale(0));

  var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return xScale(d.x);})
    .y(function(d) { return yScale(d.y);});
    
  console.log(pdf_data);
    
  for (var i = 0; i < treatmentCount; i++) {
    svg
      .append("path")
      .datum(pdf_data[i].values)
      .attr("class","area")
      .attr("d", area)
      .style("stroke-width", x.lineStrokeWidth)
      .style("fill", x.lineStrokeColor[i])
      .style("fill-opacity",0.4);

    svg
      .append("path")
      .datum(pdf_data[i].values)
      .attr("class","line")
      .attr("d", line)
      .style("stroke", x.lineStrokeColor[i])
      .style("fill","none")
      .style("stroke-width", x.lineStrokeWidth);
    }
    
  svg.append("g")
    .attr("class","x axis")
    .attr("transform", "translate(0,"+yScale(0)+")")
    .call(xAxis);

  svg.select(".x.axis")
    .selectAll("text")
    .style("fill", x.xTickLabelFontColor)
    .style("font-size", x.xTickLabelFontSize)
    .style("font-weight", x.xTickLabelFontWeight)
    .style("font-family", x.xTickLabelFontFamily);

  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", (xScale(1)+xScale(0))/2.0)
    .attr("y", yScale(0) + 10 + parseFloat(x.xTickLabelFontSize) + parseFloat(x.xLabelFontSize))
    .text(x.xLabelText)
    .style("fill", x.xLabelFontColor)
    .style("font-size", x.xLabelFontSize)
    .style("font-weight", x.xLabelFontWeight)
    .style("font-family", x.xLabelFontFamily);

  svg.append("g")
    .attr("class","y axis")
    .attr("transform", "translate("+xScale(0)+",0)")
    .call(yAxis);

  svg.select(".y.axis")
    .selectAll("text")
    .style("fill", x.yTickLabelFontColor)
    .style("font-size", x.yTickLabelFontSize)
    .style("font-weight", x.yTickLabelFontWeight)
    .style("font-family", x.yTickLabelFontFamily);

  d3.select(".y.axis path").remove();
  
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform","rotate(-90)")
    .attr("y", xScale(0) - 15)
    .attr("x", -(yScale(yMax)+yScale(0))/2.0)
    .text(x.yLabelText)
    .style("fill", x.yLabelFontColor)
    .style("font-size", x.yLabelFontSize)
    .style("font-weight", x.yLabelFontWeight)
    .style("font-family", x.yLabelFontFamily);
    
  svg
    .append("text")
    .attr("x", xScale(1) + 50 - parseFloat(x.legendLabelFontSize)/2.0)
    .attr("y", yScale(yMax) + parseFloat(x.legendCaptionFontSize))
    .text("Legend")
    .style("fill", x.legendCaptionFontColor)
    .style("font-size", x.legendCaptionFontSize)
    .style("font-weight", x.legendCaptionFontWeight)
    .style("font-family", x.legendCaptionFontFamily);
    
  svg
    .selectAll(".legendBubbles")
    .data(treatments)
   .enter()
    .append("circle")
    .attr("class","legendBubbles")
    .attr("cx", xScale(1) + 50)
    .attr("cy", function(d,i) { return yScale(yMax) + parseFloat(x.legendCaptionFontSize) + 20 + i*(10+parseFloat(x.legendLabelFontSize));})
    .attr("r", parseFloat(x.legendLabelFontSize)/2.0)
    .style("fill", function(d,i) {return x.lineStrokeColor[i];});
    
  svg
    .selectAll(".legendLabels")
    .data(treatments)
   .enter()
    .append("text")
    .attr("class","legendLabels")
    .attr("text-anchor","start")
    .attr("x", xScale(1) + 50 + 5 + parseFloat(x.legendLabelFontSize)/2.0)
    .attr("y", function(d,i) { return yScale(yMax) + parseFloat(x.legendCaptionFontSize) + 20 + i*(10+parseFloat(x.legendLabelFontSize)) + parseFloat(x.legendLabelFontSize)/4.0;})
    .text(function(d) { return d;})
    .style("fill", x.legendLabelFontColor)
    .style("font-size", x.legendLabelFontSize)
    .style("font-weight", x.legendLabelFontWeight)
    .style("font-family", x.legendLabelFontFamily);
  },
  
  resize: function(el, width, height, instance) {
   // var x = width + 50;
  //  var y = height + 50;
  //  d3.select(el).selectAll("svg").attr("width", x).attr("height", y);
  //  d3.select(el).selectAll("svg").select("g")
  //    .attr("transform", "translate(" + x / 2 + "," + y / 2 + ")");
  },
});
