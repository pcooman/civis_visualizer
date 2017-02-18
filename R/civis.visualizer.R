#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
civis.visualizer <- function(message, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'civis.visualizer',
    x,
    width = width,
    height = height,
    package = 'civis.visualizer',
    elementId = elementId
  )
}

#' Shiny bindings for civis.visualizer
#'
#' Output and render functions for using civis.visualizer within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a civis.visualizer
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name civis.visualizer-shiny
#'
#' @export
civis.visualizerOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'civis.visualizer', width, height, package = 'civis.visualizer')
}

#' @rdname civis.visualizer-shiny
#' @export
renderCivis.visualizer <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, civis.visualizerOutput, env, quoted = TRUE)
}
