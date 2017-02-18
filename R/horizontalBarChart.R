#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
horizontalBarChart <- function(data,
                               xColumn =  NULL,
                               yColumn = NULL,
                               
                               chartHeight = 300,
                               chartWidth = 300,
                               
                               marginLeft = 60,
                               marginRight = 35,
                               marginTop = 15,
                               marginBottom = 15,
                               
                               backgroundBarColor = "#F4F4F4",
                               
                               outerPadding = 0,
                               innerPadding = 0.05,
                               
                               fillColorPos = "#0194D3",
                               fillColorNeg = "#F4A800",
                               fillColorFn = NULL,
                               
                               tooltipFontFamily = "Lato",
                               tooltipFontSize = "13px",
                               tooltipFontColor = "white",
                               tooltipFontWeight = "bold", 
                               
                               xLabelText = "Value",
                               xLabelFontFamily = "Lato",
                               xLabelFontSize = "11px",
                               xLabelFontColor = "black",
                               xLabelFontWeight = "bold",
                               
                               xTickLabelPosition = "bottom",
                               xTickLabelFontFamily = "Lato",
                               xTickLabelFontSize = "11px",
                               xTickLabelFontColor = "black",
                               xTickLabelFontWeight = "normal",
                               xTickCount = 5,
                               xCustomMaxValue = NULL,
                               xCustomMinValue = NULL,
                               
                               yTickLabelFontFamily = "Lato",
                               yTickLabelFontSize = "11px",
                               yTickLabelFontColor = "black",
                               yTickLabelFontWeight = "normal",

                               width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = data,
    xColumn =  xColumn,
    yColumn = yColumn,
    chartHeight = chartHeight,
    chartWidth = chartWidth,
    marginLeft = marginLeft,
    marginRight = marginRight,
    marginTop = marginTop,
    marginBottom = marginBottom,
    
    backgroundBarColor = backgroundBarColor,
    
    outerPadding = outerPadding,
    innerPadding = innerPadding,
    
    fillColorPos = fillColorPos,
    fillColorNeg = fillColorNeg,
    fillColorFn = fillColorFn,
    
    tooltipFontFamily = tooltipFontFamily,
    tooltipFontSize = tooltipFontSize,
    tooltipFontColor = tooltipFontColor,
    tooltipFontWeight = tooltipFontWeight, 
    
    xLabelText = xLabelText,
    xLabelFontFamily = xLabelFontFamily,
    xLabelFontSize = xLabelFontSize,
    xLabelFontColor = xLabelFontColor,
    xLabelFontWeight = xLabelFontWeight,
    
    xTickLabelPosition = xTickLabelPosition,
    xTickLabelFontFamily = xTickLabelFontFamily,
    xTickLabelFontSize = xTickLabelFontSize,
    xTickLabelFontColor = xTickLabelFontColor,
    xTickLabelFontWeight = xTickLabelFontWeight,
    xTickCount = xTickCount,
    xCustomMaxValue = xCustomMaxValue,
    xCustomMinValue = xCustomMinValue,
    
    yTickLabelFontFamily = yTickLabelFontFamily,
    yTickLabelFontSize = yTickLabelFontSize,
    yTickLabelFontColor = yTickLabelFontColor,
    yTickLabelFontWeight = yTickLabelFontWeight
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'horizontalBarChart',
    x,
    width = width,
    height = height,
    package = 'civis.visualizer',
    elementId = elementId
  )
}

#' Shiny bindings for horizontalBarChart
#'
#' Output and render functions for using horizontalBarChart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a horizontalBarChart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name horizontalBarChart-shiny
#'
#' @export
horizontalBarChartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'horizontalBarChart', width, height, package = 'horizontalBarChart')
}

#' @rdname horizontalBarChart-shiny
#' @export
renderHorizontalBarChart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, horizontalBarChartOutput, env, quoted = TRUE)
}
