#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
bubbleChart <- function(data,
                            xColumn = NULL,
                            yColumn = NULL,
                            aColumn = NULL,
                            cColumn = NULL,
                            
                            chartHeight = 560,
                            chartWidth = 900,
                            marginLeft = 30,
                            marginRight = 30,
                            marginTop = 15,
                            marginBottom = 15,
                            
                            legendWidth = 200,
                            legendBubbleArea = 150,
                            legendLabelFontFamily = "Lato",
                            legendLabelFontSize = "16px",
                            legendLabelFontColor = "black",
                            legendLabelFontWeight = "normal",
                            legendCaptionFontFamily = "Lato",
                            legendCaptionFontSize = "20px",
                            legendCaptionFontColor = "black",
                            legendCaptionFontWeight = "bold",
                            
                            fillColorFn = NULL,
                            
                            xAxisPosition = NULL,
                            xLabelText = NULL,
                            xLabelFontFamily = "Lato",
                            xLabelFontSize = "20px",
                            xLabelFontColor = "black",
                            xLabelFontWeight = "bold",
                            xTickLabelPosition = "bottom",
                            xTickLabelFontFamily = "Lato",
                            xTickLabelFontSize = "16px",
                            xTickTickLabelFontColor = "black",
                            xTickLabelFontWeight = "normal",
                            xTickCount = 5,
                            xCustomMaxValue = NULL,
                            xCustomMinValue = NULL,
                            
                            yAxisPosition = NULL,
                            yLabelText = NULL,
                            yLabelFontFamily = "Lato",
                            yLabelFontSize = "20px",
                            yLabelFontColor = "black",
                            yLabelFontWeight = "bold",
                            yTickLabelPosition = "left",
                            yTickLabelFontFamily = "Lato",
                            yTickLabelFontSize = "16px",
                            yTickLabelFontColor = "black",
                            yTickLabelFontWeight = "normal",
                            yTickCount = 5,
                            yCustomMaxValue = NULL,
                            yCustomMinValue = NULL,
                            
                            aCaptionText = NULL,
                            aCustomMaxArea = 1200,
                            aCustomMinArea = 75,
                            
                            cCaptionText = NULL,
                            
                            bubbleDefaultArea = 75,
                            bubbleDefaultColor = "#0194D3",
                            bubbleFillOpacity = 0.5,
                            bubbleEdgeThickness = 3,
                            bubbleEdgeColor = "white",
                            bubbleColorPalette = c("#0194D3", "#FFC525", "#49DEA4", "#F77552", "#86518D", "#BF8669", "#86CFEB", "#FCDC95", "#C5E5D4", "#FFCBC2", "#C9B2CE", "#E7CBA9"),  
                  
                               width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = data,
    xColumn = xColumn,
    yColumn = yColumn,
    aColumn = aColumn,
    cColumn = cColumn,
    
    chartHeight = chartHeight,
    chartWidth = chartWidth,
    marginLeft = marginLeft,
    marginRight = marginRight,
    marginTop = marginTop,
    marginBottom = marginBottom,
    
    legendWidth = legendWidth,
    legendBubbleArea = legendBubbleArea,
    legendLabelFontFamily = legendLabelFontFamily,
    legendLabelFontSize = legendLabelFontSize,
    legendLabelFontColor = legendLabelFontColor,
    legendLabelFontWeight = legendLabelFontWeight,
    legendCaptionFontFamily = legendCaptionFontFamily,
    legendCaptionFontSize = legendCaptionFontSize,
    legendCaptionFontColor = legendCaptionFontColor,
    legendCaptionFontWeight = legendCaptionFontWeight,
    
    fillColorFn = fillColorFn,
    
    xAxisPosition = xAxisPosition,
    xLabelText = xLabelText,
    xLabelFontFamily = xLabelFontFamily,
    xLabelFontSize = xLabelFontSize,
    xLabelFontColor = xLabelFontColor,
    xLabelFontWeight = xLabelFontWeight,
    xTickLabelPosition = xTickLabelPosition,
    xTickLabelFontFamily = xTickLabelFontFamily,
    xTickLabelFontSize = xTickLabelFontSize,
    xTickTickLabelFontColor = xTickTickLabelFontColor,
    xTickLabelFontWeight = xTickLabelFontWeight,
    xTickCount = xTickCount,
    xCustomMaxValue = xCustomMaxValue,
    xCustomMinValue = xCustomMinValue,
    
    yAxisPosition = yAxisPosition,
    yLabelText = yLabelText,
    yLabelFontFamily = yLabelFontFamily,
    yLabelFontSize = yLabelFontSize,
    yLabelFontColor = yLabelFontColor,
    yLabelFontWeight = yLabelFontWeight,
    yTickLabelPosition = yTickLabelPosition,
    yTickLabelFontFamily = yTickLabelFontFamily,
    yTickLabelFontSize = yTickLabelFontSize,
    yTickLabelFontColor = yTickLabelFontColor,
    yTickLabelFontWeight = yTickLabelFontWeight,
    yTickCount = yTickCount,
    yCustomMaxValue = yCustomMaxValue,
    yCustomMinValue = yCustomMinValue,
    
    aCaptionText = aCaptionText,
    aCustomMaxArea = aCustomMaxArea,
    aCustomMinArea = aCustomMinArea,
    
    cCaptionText = cCaptionText,
    
    bubbleDefaultArea = bubbleDefaultArea,
    bubbleDefaultColor = bubbleDefaultColor,
    bubbleFillOpacity = bubbleFillOpacity,
    bubbleEdgeThickness = bubbleEdgeThickness,
    bubbleEdgeColor = bubbleEdgeColor,
    bubbleColorPalette = bubbleColorPalette
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'bubbleChart',
    x,
    width = width,
    height = height,
    package = 'civis.visualizer',
    elementId = elementId
  )
}

#' Shiny bindings for bubbleChart
#'
#' Output and render functions for using bubbleChart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a bubbleChart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name bubbleChart-shiny
#'
#' @export
bubbleChartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'bubbleChart', width, height, package = 'civis.visualizer')
}

#' @rdname bubbleChart-shiny
#' @export
renderbubbleChart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, bubbleChartOutput, env, quoted = TRUE)
}
