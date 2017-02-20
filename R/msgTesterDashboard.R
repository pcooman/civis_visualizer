#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
msgTesterDashboard <- function(data, dv_in, subgroup_in) {

  # Normal Distribution Functions
  p1 <- normalDistributionFunctions(toJSON(data),
                                    dv = dv_in,
                                    subgroup = subgroup_in,
                                    treatmentColumn = 'treatment',
                                    toplineColumn = 'topline',
                                    toplineErrorColumn = 'topline_error',
                                    legendWidth = 175,
                                    chartHeight = 360,
                                    chartWidth = 900)
  
  # Best treatment horizontal bar chart
  data_filt <- data %>%
    filter(dvs == dv_in,subgroup == subgroup_in)
  
  p2 <- horizontalBarChart(toJSON(data_filt), 
                           xColumn = "best_treatment", 
                           yColumn = "treatment",
                           chartHeight = 200,
                           chartWidth = 380,
                           marginLeft = 120,
                           marginRight = 20,
                           fillDivergingColor = "blue",
                           tooltipFontColor = "none",
                           yTickLabelFontColor = "grey",
                           xTickLabelPosition = "top",
                           xTickLabelFormat = ".0%",
                           xTickCount = 3,
                           xLabelText = "Best Message Probability",
                           xLabelFontSize = '16px',
                           xCustomMaxValue = max(data$best_treatment))
  
  # Backlash horizontal bar chart
  p3 <- horizontalBarChart(toJSON(data_filt), 
                           xColumn = "backlash", 
                           yColumn = "treatment",
                           chartHeight = 200,
                           chartWidth = 260,
                           marginLeft = 0,
                           marginRight = 20,
                           scheme = "backlash",
                           fillDivergingColor = "red",
                           tooltipFontColor = "none",
                           yTickLabelFontColor = "none",
                           xTickLabelPosition = "top",
                           xTickLabelFormat = ".0%",
                           xTickCount = 3,
                           xLabelText = "Probability of Backlash",
                           xLabelFontSize = '16px',
                           xCustomMaxValue = max(data$backlash))
  
  # Confidence Interval
  p4 <- horizontalConfidenceIntervals(toJSON(data_filt),
                                      xColumn = 'treatment_effect',
                                      yColumn = 'treatment',
                                      lColumn = 'treatment_effect_lower',
                                      uColumn = 'treatment_effect_upper',
                                      chartHeight = 200,
                                      chartWidth = 260,
                                      marginLeft = 0,
                                      marginTop = 15,
                                      marginBottom = 15,
                                      xCustomMinValue = min(data$treatment_effect_lower),
                                      xCustomMaxValue = max(data$treatment_effect_upper),
                                      xTickCount = 3,
                                      xTickLabelFormat = ".0%",
                                      xLabelText = "Average Treatment Effects",
                                      xLabelFontSize = '16px',
                                      yTickLabelFontColor = "grey")
  
  # Combine all widgets
  pc <- combineWidgets(
    nrow = 2, rowsize = c(360,200),
    p1,
    combineWidgets (
      ncol = 3, colsize = c(380,260,260),
      p2,p3,p4,
      width = 900,
      height = 200
    ),
    width = 900,
    height = 560
  )
  
  pc
}