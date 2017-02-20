#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
horizontalConfidenceIntervals <- function(data,
                                          xColumn = NULL,
                                          yColumn = NULL,
                                          lColumn = NULL,
                                          uColumn = NULL,
                                              
                                          chartHeight = 560,
                                          chartWidth = 900,
                                          
                                          marginLeft = 60,
                                          marginRight = 0,
                                          marginTop = 0,
                                          marginBottom = 0,
                                              
                                          backgroundBarColor = "#F4F4F4",
                                          
                                          outerPadding = 0,
                                          innerPadding = 0.05,
                                              
                                          fillColorBar = "#4DC0E8",
                                          fillColorFn = NULL,
                                              
                                          bubbleFillColor = '#0194D3',
                                          bubbleEdgeColor = '#0194D3',
                                          bubbleEdgeThickness = 3,
                                          
                                          yTickLabelPosition = 'left',
                                          yTickLabelFontFamily = 'Lato',
                                          yTickLabelFontSize = '16px',
                                          yTickLabelFontColor = 'black',
                                          yTickLabelFontWeight = 'normal',
                                          
                                          xCustomMaxValue = NULL,
                                          xCustomMinValue = NULL,
                                          xLabelText = NULL,
                                          xLabelFontFamily = 'Lato',
                                          xLabelFontSize = '20px',
                                          xLabelFontColor = 'black',
                                          xLabelFontWeight = 'bold',
                                          xTickLabelPosition = 'top',
                                          xTickLabelFontFamily = 'Lato',
                                          xTickLabelFontSize = '16px',
                                          xTickLabelFontColor = 'black',
                                          xTickLabelFontWeight = 'normal',
                                          xTickLabelFormat = ".1f",
                                          xTickCount = 5,  
                  
                               width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = data,
    xColumn = xColumn,
    yColumn = yColumn,
    lColumn = lColumn,
    uColumn = uColumn,
    
    chartHeight = chartHeight,
    chartWidth = chartWidth,
    
    marginLeft = marginLeft,
    marginRight = marginRight,
    marginTop = marginTop,
    marginBottom = marginBottom,
    
    backgroundBarColor = backgroundBarColor,
    
    outerPadding = outerPadding,
    innerPadding = innerPadding,
    
    fillColorBar = fillColorBar,
    fillColorFn = fillColorFn,
    
    bubbleFillColor = bubbleFillColor,
    bubbleEdgeColor = bubbleEdgeColor,
    bubbleEdgeThickness = bubbleEdgeThickness,
    
    yTickLabelPosition = yTickLabelPosition,
    yTickLabelFontFamily = yTickLabelFontFamily,
    yTickLabelFontSize = yTickLabelFontSize,
    yTickLabelFontColor = yTickLabelFontColor,
    yTickLabelFontWeight = yTickLabelFontWeight,
    
    xCustomMaxValue = xCustomMaxValue,
    xCustomMinValue = xCustomMinValue,
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
    xTickLabelFormat = xTickLabelFormat,
    xTickCount = xTickCount
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'horizontalConfidenceIntervals',
    x,
    width = width,
    height = height,
    package = 'civis.visualizer',
    elementId = elementId
  )
}

#' Shiny bindings for horizontalConfidenceIntervals
#'
#' Output and render functions for using horizontalConfidenceIntervals within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a horizontalConfidenceIntervals
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name horizontalConfidenceIntervals-shiny
#'
#' @export
horizontalConfidenceIntervalsOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'horizontalConfidenceIntervals', width, height, package = 'civis.visualizer')
}

#' @rdname horizontalConfidenceIntervals-shiny
#' @export
renderHorizontalConfidenceIntervals <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, horizontalConfidenceIntervalsOutput, env, quoted = TRUE)
}
