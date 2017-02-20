#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
normalDistributionFunctions <- function(data,
                                            dv = NULL,
                                            subgroup = NULL,
                                            treatmentColumn = NULL,
                                            toplineColumn = NULL,
                                            toplineErrorColumn = NULL,
                                            
                                            chartHeight= 560,
                                            chartWidth = 900,
                                        
                                            marginLeft = 0,
                                            marginRight = 0,
                                            marginTop = 0,
                                            marginBottom = 0,
                                            
                                            xLabelText = "Likelihood to Purchase",
                                            xLabelFontFamily = "Lato",
                                            xLabelFontSize = "20px",
                                            xLabelFontColor = "black",
                                            xLabelFontWeight = "normal",
                                            xTickLabelFontFamily = "Lato",
                                            xTickLabelFontSize = "16px",
                                            xTickLabelFontColor = "black",
                                            xTickLabelFontWeight = "normal",

                                            yLabelText = "Probability Density",
                                            yLabelFontFamily = "Lato",
                                            yLabelFontSize = "20px",
                                            yLabelFontColor = "blacj",
                                            yLabelFontWeight = "bold",
                                            yTickLabelFontFamily = "Lato",
                                            yTickLabelFontSize = "16px",
                                            yTickLabelFontColor = "black",
                                            yTickLabelFontWeight = "normal",

                                            lineStrokeColor = c("#0194D3","#F77552","#86518D","#49DEA4","#BF8669","#555555","#FFC425"),
                                            lineStrokeWidth = 3,
                                        
                                            intervalColor = c("#4DC0E8","#FFCBC2","#C9B2CE","#C5E5D4","#E7C8A9","#929292","#FFE180"),
                                        
                                            legendWidth = 150,
                                            legendBubbleArea = 150,
                                            legendLabelFontFamily = 'Lato',
                                            legendLabelFontSize = '16px',
                                            legendLabelFontColor = 'black',
                                            legendLabelFontWeight = 'normal', 
                                            legendCaptionText = 'Trends', 
                                            legendCaptionFontFamily = 'Lato',
                                            legendCaptionFontSize = '20px',
                                            legendCaptionFontColor = 'black',
                                            legendCaptionFontWeight = 'bold',   
                      
                               width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = data,
    dv = dv,
    subgroup = subgroup,
    treatmentColumn = treatmentColumn,
    toplineColumn = toplineColumn,
    toplineErrorColumn = toplineErrorColumn,
    
    chartHeight= chartHeight,
    chartWidth = chartWidth,
    marginLeft = marginLeft,
    marginRight = marginRight,
    marginTop = marginTop,
    marginBottom = marginBottom,
    
    xLabelText = xLabelText,
    xLabelFontFamily = xLabelFontFamily,
    xLabelFontSize = xLabelFontSize,
    xLabelFontColor = xLabelFontColor,
    xLabelFontWeight = xLabelFontWeight,
    xTickLabelFontFamily = xTickLabelFontFamily,
    xTickLabelFontSize = xTickLabelFontSize,
    xTickLabelFontColor = xTickLabelFontColor,
    xTickLabelFontWeight = xTickLabelFontWeight,

    yLabelText = yLabelText,
    yLabelFontFamily = yLabelFontFamily,
    yLabelFontSize = yLabelFontSize,
    yLabelFontColor = yLabelFontColor,
    yLabelFontWeight = yLabelFontWeight,
    yTickLabelFontFamily = yTickLabelFontFamily,
    yTickLabelFontSize = yTickLabelFontSize,
    yTickLabelFontColor = yTickLabelFontColor,
    yTickLabelFontWeight = yTickLabelFontWeight,

    lineStrokeColor = lineStrokeColor,
    lineStrokeWidth = lineStrokeWidth,
    
    intervalColor = intervalColor,

    legendWidth = legendWidth,
    legendBubbleArea = legendBubbleArea,
    legendLabelFontFamily = legendLabelFontFamily,
    legendLabelFontSize = legendLabelFontSize,
    legendLabelFontColor = legendLabelFontColor,
    legendLabelFontWeight = legendLabelFontWeight,
    legendCaptionText = legendCaptionText,  
    legendCaptionFontFamily = legendCaptionFontFamily,
    legendCaptionFontSize = legendCaptionFontSize,
    legendCaptionFontColor = legendCaptionFontColor,
    legendCaptionFontWeight = legendCaptionFontWeight
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'normalDistributionFunctions',
    x,
    width = width,
    height = height,
    package = 'civis.visualizer',
    elementId = elementId
  )
}

#' Shiny bindings for normalDistributionFunctions
#'
#' Output and render functions for using normalDistributionFunctions within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a normalDistributionFunctions
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name normalDistributionFunctions-shiny
#'
#' @export
normalDistributionFunctionsOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'normalDistributionFunctions', width, height, package = 'civis.visualizer')
}

#' @rdname normalDistributionFunctions-shiny
#' @export
rendernormalDistributionFunctions <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, normalDistributionFunctionsOutput, env, quoted = TRUE)
}
