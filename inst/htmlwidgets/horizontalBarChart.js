HTMLWidgets.widget({

  name: 'horizontalBarChart',
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

    var xMax = d3.max([0,d3.max(x.data, function(d)  { return parseFloat(d[x.xColumn]);})]);
    if (x.xCustomMaxValue !== null) {
      xMax = x.xCustomMaxValue;
    }
    var xMin = d3.min([0,d3.min(x.data, function(d) { return parseFloat(d[x.xColumn]);})]);
    if (x.xCustomMinValue !== null) {
      xMin = x.xCustomMinValue; 
    }    

    var xScale = d3.scaleLinear()
        .range([x.marginLeft, width - x.marginRight])
        .domain([xMin, xMax]);

    var yScale = d3.scaleBand()
        .rangeRound([height - x.marginBottom, x.marginTop])
        .domain(data.map(function (d) {
            return d[x.yColumn];
        }))
        .paddingInner(0.05)
        .paddingOuter(0);
        
    if (x.xTickLabelPosition == 'top') {
      yScale
        .rangeRound([x.marginTop + parseFloat(x.xTickLabelFontSize) + 10 + parseFloat(x.xLabelFontSize), 
        height-x.marginBottom]);
    } else {
      yScale
        .rangeRound([x.marginTop, 
        height-x.marginBottom - parseFloat(x.xTickLabelFontSize) - 10 - parseFloat(x.xLabelFontSize)]);
    }
    
  var yAxis = d3.axisLeft()
    .scale(yScale);  

  if (x.yTickLabelPosition == 'right') {
    yAxis = d3.axisRight()
      .scale(yScale);   
  }

  var xAxis = d3.axisTop()
    .scale(xScale) 
    .ticks(x.xTickCount);

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
    .attr("x", xScale(xMin))
    .style("fill", x.backgroundBarColor)
    .attr("width", xScale(xMax) - xScale(xMin));
  
  svg.selectAll(".bar")
    .data(data)
   .enter()
    .append("g")
    .append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
      return yScale(d[x.yColumn]);
    })
    .attr("height", yScale.bandwidth())
    .attr("x", function(d) {
      return parseFloat(d[x.xColumn]) >= 0 ? 
        xScale(0):
        xScale(parseFloat(d[x.xColumn]));
    })
    .attr("width", function(d) {
      return parseFloat(d[x.xColumn]) >= 0 ? 
        xScale(parseFloat(d[x.xColumn])) - xScale(0) :
        xScale(0)-xScale(parseFloat(d[x.xColumn]));
    })
    .style("fill", function(d) {
      return parseFloat(d[x.xColumn]) > 0 ? 
        x.fillColorPos :
        x.fillColorNeg;
    });
    
  svg.selectAll(".tooltips")
    .data(data)
   .enter()
    .append("g")
    .append("text")
    .attr("class","tooltips")
    .text( function(d) { return parseFloat(d[x.xColumn]);})
    .style("fill", x.tooltipFontColor)
    .style("font-size", x.tooltipFontSize)
    .style("font-weight", x.tooltipFontWeight)
    .style("font-family", x.tooltipFontFamily)
    .attr("text-anchor", function(d) {
        if (parseFloat(d[x.xColumn]) >= 0) {
        return 'end';
        } else {
        return 'start';
        }
    })
    .attr("y", function(d) { return yScale(d[x.yColumn]) + yScale.bandwidth() / 2.0 + parseFloat(x.tooltipFontSize) / 2.0;})
    .attr("x", function(d) {
        if (parseFloat(d[x.xColumn]) >= 0) {
            return -3 + xScale(parseFloat(d[x.xColumn]));
        } else {
              return 3 + xScale(parseFloat(d[x.xColumn]));
        }
    });
    
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

  d3.selectAll(".tick line").remove();
  
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
    .style("font-family", x.xLabelFontFamily)
  },
  
  resize: function(el, width, height, instance) {
   // var x = width + 50;
  //  var y = height + 50;
  //  d3.select(el).selectAll("svg").attr("width", x).attr("height", y);
  //  d3.select(el).selectAll("svg").select("g")
  //    .attr("transform", "translate(" + x / 2 + "," + y / 2 + ")");
  },
})
