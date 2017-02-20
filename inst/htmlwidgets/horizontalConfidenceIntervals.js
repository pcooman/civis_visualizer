HTMLWidgets.widget({

  name: 'horizontalConfidenceIntervals',
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
    
    var data = x.data;
        
    var chartWidth = el.getBoundingClientRect().width;
    var chartHeight = el.getBoundingClientRect().height;

    var width = x.chartWidth; // - x.marginLeft - x.marginRight,
    var height = x.chartHeight; // - x.marginTop - x.marginTop;

    var svg = d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
    
    var xMax = d3.max(x.data, function(d) { return parseFloat(d[x.uColumn]);});
    if (x.xCustomMaxValue !== null) {
      xMax = x.xCustomMaxValue;   
    }

    var xMin = d3.min(x.data, function(d) { return parseFloat(d[x.lColumn]);});
    if (x.xCustomMinValue !== null) {
      xMin = x.xCustomMinValue; 
    }

    const xScale = d3.scaleLinear()
    .domain([xMin,xMax])
    .range([x.marginLeft, width - x.marginRight]);
    
    var yScale = d3.scaleBand()
    .domain(x.data.map(function(d)  {return d[x.yColumn];}))
    .rangeRound([x.marginTop, height-x.marginBottom])
    .paddingInner(x.innerPadding)
    .paddingOuter(x.outerPadding);

    if (x.xTickLabelPosition == 'top') {
      yScale
        .rangeRound([x.marginTop + parseFloat(x.xTickLabelFontSize) + 10 + parseFloat(x.xLabelFontSize), height-x.marginBottom]);
    } else {
      yScale
        .rangeRound([x.marginTop, height-x.marginBottom - parseFloat(x.xTickLabelFontSize) - 10 - parseFloat(x.xLabelFontSize)]);
    }

  var yAxis = d3.axisLeft()
    .scale(yScale) ; 

  if (x.yTickLabelPosition == 'right') {
    yAxis = d3.axisRight()
        .scale(yScale);   
  }

  var xAxis = d3.axisTop()
    .scale(xScale) 
    .ticks(x.xTickCount)
    .tickFormat(d3.format(x.xTickLabelFormat));

  if (x.xTickLabelPosition == 'bottom') {
      xAxis = d3.axisBottom()
        .scale(xScale) 
        .ticks(x.xTickCount);
  }

  svg.selectAll(".background-bars")
    .data(data)
   .enter()
    .append("rect")
    .attr("class","background_bars")
    .attr("height", yScale.bandwidth())
    .attr("y", function(d) { return yScale(d[x.yColumn]);})
    .attr("x", function(d) { return  xScale(xMin);})
    .attr("width", function(d) { return xScale(xMax) - xScale(xMin);})
    .style("fill", x.backgroundBarColor);

  svg.selectAll(".bar")
    .data(data)
   .enter()
    .append("g")
    .append("rect")
    .attr("class", "bar")
    .attr("height", yScale.bandwidth())
    .attr("y", function(d) { return yScale(d[x.yColumn]);})
    .attr("x", function(d) { return xScale(parseFloat(d[x.lColumn]));})
    .attr("width",function(d) { return xScale(parseFloat(d[x.uColumn])) - xScale(parseFloat(d[x.lColumn]));})
    .style("fill-opacity", 0.4)
    .style("fill", x.fillColorBar);
  
  svg.selectAll(".bubbles")
    .data(x.data)
   .enter()
    .append("g")
    .append("circle")
    .attr("class","bubbles")
    .style("fill", x.bubbleFillColor)
    .style("stroke", x.bubbleEdgeColor)
    .style("stroke-width", x.bubbleEdgeThickness)
    .attr("cx", function(d) { return xScale(parseFloat(d[x.xColumn]));})
    .attr("r", yScale.bandwidth()/4.0)
    .attr("cy", function(d) { return yScale(d[x.yColumn]) + yScale.bandwidth()/2.0;});
    
  svg.append("g")
    .attr("class","y axis")
    .attr("transform", "translate("+xScale(xMin)+",0)")
    .call(yAxis);

  svg.select(".y.axis")
    .selectAll("text")
    .style("fill", x.yTickLabelFontColor)
    .style("font-size", x.yTickLabelFontSize)
    .style("font-weight", x.yTickLabelFontWeight)
    .style("font-family", x.yTickLabelFontFamily);

  d3.selectAll(".tick line").remove();
  d3.select(".y.axis path").remove();
  
  svg.append("g")
    .attr("class","x axis")
    .attr("transform", x.xTickLabelPosition == 'top' ? 
            "translate(0,"+(x.marginTop+parseFloat(x.xTickLabelFontSize) + 10 + parseFloat(x.xLabelFontSize))+")" :
            "translate(0,"+(height-x.marginBottom - parseFloat(x.xTickLabelFontSize) - 10 - parseFloat(x.xLabelFontSize))+")")
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
    .attr("x", (xScale(xMax) + xScale(xMin))/2.0)
    .attr("y", x.xTickLabelPosition == 'top' ?
        x.marginTop + parseFloat(x.xTickLabelFontSize) :
        height - x.marginBottom)
    .text( (x.xLabelText === null) ? 
        x.xColumn :
        x.xLabelText)
    .style("fill", x.xLabelFontColor)
    .style("font-size", x.xLabelFontSize)
    .style("font-weight", x.xLabelFontWeight)
    .style("font-family", x.xLabelFontFamily);
    
  svg.selectAll(".marker_left")
    .data(x.data)
   .enter()
    .append("g")
    .append("line")
    .attr("class", "marker_left")
    .attr("y1", function(d) { return yScale(d[x.yColumn]);})
    .attr("x1", function(d) { return xScale(parseFloat(d[x.lColumn]));})
    .attr("x2", function(d) { return xScale(parseFloat(d[x.lColumn]));})
    .attr("y2", function(d) { return yScale(d[x.yColumn]) + yScale.bandwidth();})
    .style("stroke", x.bubbleFillColor);

  svg.selectAll(".marker_right") 
    .data(x.data)
   .enter()
    .append("g")
    .append("line")
    .attr("class", "marker_right")
    .attr("y1", function(d) { return yScale(d[x.yColumn]);})
    .attr("x1", function(d) { return xScale(parseFloat(d[x.uColumn]));})
    .attr("x2", function(d) { return xScale(parseFloat(d[x.uColumn]));})
    .attr("y2", function(d) { return yScale(d[x.yColumn]) + yScale.bandwidth();})
    .style("stroke", x.bubbleFillColor);
    
      canvas.select(".y.axis")
    .attr("transform", "translate("+xScale(0)+",0)")
    .call(yAxis);

  svg.select(".y.axis")
    .selectAll("text")
    .style("fill", x.yTickLabelFontColor)
    .style("font-size", x.yTickLabelFontSize)
    .style("font-weight", x.yTickLabelFontWeight)
    .style("font-family", x.yTickLabelFontFamily);

  d3.selectAll(".tick line").remove();
  d3.select(".y.axis path").remove();
  
  svg.select(".x.axis")
    .attr("transform", x.xTickLabelPosition == 'top' ? 
            "translate(0,"+(x.marginTop+parseFloat(x.xTickLabelFontSize) + 10 + parseFloat(x.xLabelFontSize))+")" :
            "translate(0,"+(height-x.marginBottom - parseFloat(x.xTickLabelFontSize) - 10 - parseFloat(x.xLabelFontSize))+")")
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
    .attr("x", (xScale(xMax) + xScale(xMin))/2.0)
    .attr("y", x.xTickLabelPosition == 'top' ?
        options.marginTop + parseFloat(options.xTickLabelFontSize) :
        height - x.marginBottom)
    .text( (x.xLabelText === null) ? 
        x.xColumn :
        x.xLabelText)
    .style("fill", x.xLabelFontColor)
    .style("font-size", x.xLabelFontSize)
    .style("font-weight", x.xLabelFontWeight)
    .style("font-family", x.xLabelFontFamily);
  },
  
  resize: function(el, width, height, instance) {
   // var x = width + 50;
  //  var y = height + 50;
  //  d3.select(el).selectAll("svg").attr("width", x).attr("height", y);
  //  d3.select(el).selectAll("svg").select("g")
  //    .attr("transform", "translate(" + x / 2 + "," + y / 2 + ")");
  },
});
