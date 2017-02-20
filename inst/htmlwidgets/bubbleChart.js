HTMLWidgets.widget({

  name: 'bubbleChart',
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
    
    var xMax = d3.max(x.data.map(function(d) { return parseFloat(d[x.xColumn]);}));   
    if (x.xCustomMaxValue !== null) {
      xMax = x.xCustomMaxValue;
    }
    var xMin = d3.min(x.data.map(function(d) { return parseFloat(d[x.xColumn]);}));
    if (x.xCustomMinValue !== null) {
      xMin = x.xCustomMinValue;
    }

    var xScale = d3.scaleLinear()
      .domain([xMin,xMax])
      .range([x.marginLeft + 30 + parseFloat(x.yLabelFontSize), width - x.marginRight]);

    var yMax = d3.max(x.data.map(function(d) { return parseFloat(d[x.yColumn]);}));
    if (x.yCustomMaxValue !== null) {
      yMax = x.yCustomMaxValue;   
    }
    var yMin = d3.min(x.data.map(function(d) { return parseFloat(d[x.yColumn]);}));
    if (x.yCustomMinValue !== null) {
      yMin = x.yCustomMinValue; 
    }
    var yScale = d3.scaleLinear()
    .domain([yMin,yMax])
    .range([height-x.marginBottom-parseFloat(x.xTickLabelFontSize)-parseFloat(x.xLabelFontSize)-10, 
            x.marginTop]);
            
    var aMax = d3.max(x.data.map(function(d) { return parseFloat(d[x.aColumn]);}));
    var aMin = d3.min(x.data.map(function(d) { return parseFloat(d[x.aColumn]);}));

    var aScale = d3.scaleLinear()
      .domain([aMin,aMax])
      .range([x.aCustomMinArea, x.aCustomMaxArea]);

    var classes = (x.cColumn === null) ? 
    [] :
    _.uniq(x.data.map(function(d) { return d[x.cColumn];}));

    var cScale = d3.scaleOrdinal()
      .domain(classes)
      .range(x.bubbleColorPalette.slice(0,classes.length));

    if (x.cColumn !== null || x.aColumn !== null) {
      xScale
        .range([x.marginLeft + 30 + parseFloat(x.yLabelFontSize), 
          width - x.marginRight - x.legendWidth]);    
    }
    
    var xAxis = d3.axisBottom()
      .scale(xScale) 
      .ticks(x.xTickCount) ;

    if (x.xTickLabelPosition == 'top') {
      xAxis = d3.axisTop()
        .scale(xScale);   
    }

    var yAxis = d3.axisLeft()
      .scale(yScale) 
      .ticks(x.yTickCount);

    if (x.yTickLabelPosition == 'right') {
      yAxis = d3.axisRight()
        .scale(yScale);   
    }
    
    svg.selectAll(".bubbles")
      .data(x.data)
     .enter()
      .append("circle")
      .attr("class","bubbles")
      .style("fill", function(d) { 
        return x.cColumn === null ? 
              x.bubbleDefaultColor :
              cScale(d[x.cColumn]);})
      .style("fill-opacity", x.bubbleFillOpacity)
      .style("stroke", x.bubbleEdgeColor)
      .style("stroke-width", x.bubbleEdgeThickness)
      .attr("cx", function(d) { return xScale(parseFloat(d[x.xColumn]));})
      .attr("cy", function(d) { return yScale(parseFloat(d[x.yColumn]));})
      .attr("r", function(d) { 
        return x.aColumn === null ? 
              Math.sqrt(x.bubbleDefaultArea/Math.PI) :
              Math.sqrt(aScale(parseFloat(d[x.aColumn]))/Math.PI);});
              
    svg
      .append("g")
      .attr("class","x axis")
      .attr("transform", x.xAxisPosition === null ? 
              "translate(0,"+yScale(yMin)+")" :
              "translate(0,"+yScale(x.xAxisPosition)+")")
      .call(xAxis);
  
    svg.select(".x.axis")
      .selectAll("text")
      .style("fill", x.xTickLabelFontColor)
      .style("font-size", x.xTickLabelFontSize)
      .style("font-weight", x.xTickLabelFontWeight)
      .style("font-family", x.xTickLabelFontFamily);
  
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", xScale(xMax))
      .attr("y", x.xAxisPosition === null ?
          yScale(yMin) + 10 + parseFloat(x.xTickLabelFontSize) + parseFloat(x .xLabelFontSize) :
          yScale(x.xAxisPosition) + 10 + parseFloat(x.xTickLabelFontSize) + parseFloat(x.xLabelFontSize))
      .text( (x.xLabelText === null) ? 
          x.xColumn :
          x.xLabelText)
      .style("fill", x.xLabelFontColor)
      .style("font-size", x.xLabelFontSize)
      .style("font-weight", x.xLabelFontWeight)
      .style("font-family", x.xLabelFontFamily);
      
    svg
      .append("g")
      .attr("class","y axis")
      .attr("transform", x.yAxisPosition === null ?
              "translate("+xScale(xMin)+",0)" :
              "translate("+xScale(x.yAxisPosition)+",0)")
      .call(yAxis);
  
    svg.select(".y.axis")
      .selectAll("text")
      .style("fill", x.yTickLabelFontColor)
      .style("font-size", x.yTickLabelFontSize)
      .style("font-weight", x.yTickLabelFontWeight)
      .style("font-family", x.yTickLabelFontFamily);
  
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform","rotate(-90)")
      .attr("y", x.yAxisPosition === null ?
          xScale(xMin) - 35:
          xScale(x.yAxisPosition) - 35 )
      .attr("x", -x.marginTop)
      .text( (x.yLabelText === null) ?
          x.yColumn :
          x.yLabelText)
      .style("fill", x.yLabelFontColor)
      .style("font-size", x.yLabelFontSize)
      .style("font-weight", x.yLabelFontWeight)
      .style("font-family", x.yLabelFontFamily);
      
    if (x.cColumn !== null) {
      svg
        .append("text")
        .attr("x", xScale(xMax) + 50 - parseFloat(x.legendLabelFontSize)/2.0)
        .attr("y", yScale(yMax) + parseFloat(x.legendCaptionFontSize))
        .text(x.cCaptionText === null ? 
            "Color: " + x.cColumn :
            "Color: " + x.cCaptionText)
        .style("fill", x.legendCaptionFontColor)
        .style("font-size", x.legendCaptionFontSize)
        .style("font-weight", x.legendCaptionFontWeight)
        .style("font-family", x.legendCaptionFontFamily);
    
      svg
        .selectAll(".colorLegendBubbles")
        .data(classes)
       .enter()
        .append("circle")
        .attr("class","colorLegendBubbles")
        .attr("cx", xScale(xMax) + 50)
        .attr("cy", function(d,i) { return yScale(yMax) + parseFloat(x.legendCaptionFontSize) + 20 + i*(10+parseFloat(x.legendLabelFontSize));})
        .attr("r", parseFloat(x.legendLabelFontSize)/2.0)
        .style("fill", function(d) { return cScale(d);})
        .style("fill-opacity", x.bubbleFillOpacity);
    
      svg
        .selectAll(".colorLegendLabels")
        .data(classes)
       .enter()
        .append("text")
        .attr("class","colorLegendLabels")
        .attr("text-anchor","start")
        .attr("x", xScale(xMax) + 50 + 5 + parseFloat(x.legendLabelFontSize)/2.0)
        .attr("y", function(d,i) { return yScale(yMax) + parseFloat(x.legendCaptionFontSize) + 20 + i*(10+parseFloat(x.legendLabelFontSize)) + parseFloat(x.legendLabelFontSize)/4.0;})
        .text(function(d) {return d;})
        .style("fill", x.legendLabelFontColor)
        .style("font-size", x.legendLabelFontSize)
        .style("font-weight", x.legendLabelFontWeight)
        .style("font-family", x.legendLabelFontFamily);
    }
    
    if (x.aColumn !== null) {
      var colorLegendHeight = (x.cColumn === null) ?
        0 :
        parseFloat(x.legendCaptionFontSize) + classes.length*(10+parseFloat(x.legendLabelFontSize) + 10);
    
      var areas = [{area: x.aCustomMinArea, value: aMin},
                    {area: x.aCustomMaxArea, value: aMax}];
      console.log(areas);

      svg
        .append("text")
        .attr("x", xScale(xMax) + 50 - parseFloat(x.legendLabelFontSize)/2.0)
        .attr("y", yScale(yMax) + colorLegendHeight + parseFloat(x.legendCaptionFontSize))
        .text(x.aCaptionText === null ? 
            "Area: " + x.aColumn :
            "Area: " + x.aCaptionText)
        .style("fill", x.legendCaptionFontColor)
        .style("font-size", x.legendCaptionFontSize)
        .style("font-weight", x.legendCaptionFontWeight)
        .style("font-family", x.legendCaptionFontFamily);
    
      svg
        .selectAll(".areaLegendBubbles")
        .data(areas)
       .enter()
        .append("circle")
        .attr("class","areaLegendBubbles")
        .attr("cx", function(d) { return xScale(xMax) + 50 - parseFloat(x.legendLabelFontSize)/2.0 + Math.sqrt(x.aCustomMaxArea/Math.PI);})
        .attr("cy", function(d,i) { return yScale(yMax) + colorLegendHeight + parseFloat(x.legendCaptionFontSize) + 10 + Math.sqrt(x.aCustomMinArea/Math.PI) + i*(Math.sqrt(x.aCustomMaxArea/Math.PI) + 5 + Math.sqrt(x.aCustomMaxArea/Math.PI));})
        .attr("r", function(d) { return Math.sqrt(d.area/Math.PI);})
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", x.bubbleEdgeThickness);
    
      svg
        .selectAll(".areaLegendLabels")
        .data(areas)
       .enter()
        .append("text")
        .attr("class","areaLegendLabels")
        .attr("text-anchor","start")
        .attr("x", xScale(xMax) + 50 + 20 + Math.sqrt(x.aCustomMaxArea/Math.PI))
        .attr("y", function(d,i) { return yScale(yMax) + colorLegendHeight + parseFloat(x.legendCaptionFontSize) + 10 + Math.sqrt(x.aCustomMinArea/Math.PI) + i*(Math.sqrt(x.aCustomMaxArea/Math.PI) + 5 + Math.sqrt(x.aCustomMaxArea/Math.PI)) + parseFloat(x.legendLabelFontSize)/2.0;})
        .text(function(d) { return +d.value;})
        .style("fill", x.legendLabelFontColor)
        .style("font-size", x.legendLabelFontSize)
        .style("font-weight", x.legendLabelFontWeight)
        .style("font-family", x.legendLabelFontFamily);
    }
  },
  
  resize: function(el, width, height, instance) {
   // var x = width + 50;
  //  var y = height + 50;
  //  d3.select(el).selectAll("svg").attr("width", x).attr("height", y);
  //  d3.select(el).selectAll("svg").select("g")
  //    .attr("transform", "translate(" + x / 2 + "," + y / 2 + ")");
  },
});
