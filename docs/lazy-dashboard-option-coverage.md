# Lazy Dashboards Option Coverage Matrix

This table tracks LADF option parity for Lazy Dashboards. "Supported" options are editable
in the visual editor. "Deferred" options are preserved but only editable via Expert mode.
Lazy Dashboards source paths are relative to the Lazy Dashboards repo root.

| Viz | Option Path | Type | Default | Enum | Control | Status | Notes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| kpi | options.variant | enum | clean | clean\|accent\|gradient\|icon\|compact | select | supported | Layout style preset. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.subvariant | string | standard |  | text | supported | Formatting preset slug (ex: currency, percentage, negative). | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.format | enum | number | number\|currency\|percent\|compact\|duration\|hours\|ratio\|custom | select | supported | Formats KPI value output. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.currency | string | USD |  | text | supported | Currency code when format is currency. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.decimals | number | null |  | number | supported | Fixed decimal precision override. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.compact | boolean\|enum | null | auto\|true\|false | toggle | supported | Enables compact number formatting. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.compactThreshold | number | 1000000 |  | number | supported | Threshold for compact currency in auto mode. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.value | string\|number | null |  | text | supported | Explicit KPI value override. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.valueSuffix | string | "" |  | text | deferred | Suffix appended to the formatted KPI value (ex: GB). | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.ratioNumeratorKey | string | "" |  | text | deferred | Field to use as the ratio numerator. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.ratioDenominatorKey | string | "" |  | text | deferred | Field to use as the ratio denominator. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.valueFrom | enum | auto | first\|last | select | supported | Choose first or last row when multiple values are supplied. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.label | string | "" |  | text | supported | Overrides label displayed above KPI. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.caption | string | "" |  | text | supported | Optional caption under KPI value. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.subtitle | string | "" |  | text | supported | Alias for caption in KPI cards. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.valueTone | enum | null | success\|warning\|danger\|accent | select | supported | Color emphasis for the value. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.icon | string | "" |  | text | supported | Icon key for the icon variant. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.iconTone | enum | null | success\|warning\|danger\|accent | select | supported | Icon color tone for icon variant. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.badgeText | string | "" |  | text | supported | Badge copy for compact variant. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.badgeTone | enum | neutral | neutral\|success\|warning\|danger | select | supported | Badge tone for compact variant. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.badgeIcon | string | "" |  | text | supported | Badge icon key for compact variant. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.trendValue | string\|number | null |  | text | supported | Trend chip value (ex: +23.4%). | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.trendValueKey | string | "" |  | text | supported | Data field that supplies the trend chip value. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.trendLabel | string | "" |  | text | supported | Manual context label beside the trend chip (recommended default when labels are not part of the data payload). | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.trendLabelKey | string | "" |  | text | supported | Optional data field override for the trend label. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.trendTone | enum | auto | positive\|negative\|neutral\|accent\|success\|warning\|danger | select | supported | Chip color tone for trend values. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.trendDirection | enum | auto | up\|down\|flat | select | supported | Forces the trend direction icon. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.trendIcon | string | "" |  | text | supported | Explicit icon key for the trend chip. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.trendDecimals | number | 1 |  | number | supported | Decimal precision when trend value is numeric. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.sparkline | array | null |  | json | supported | Sparkline data values array. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.sparklineKey | string | "" |  | text | supported | Data field with sparkline array. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.sparklineValueKey | string | "" |  | text | supported | Value key for sparkline object arrays. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.sparklineFromData | boolean | false |  | toggle | supported | Build sparkline from the KPI data rows. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.sparklineTone | enum | auto | positive\|negative\|neutral\|accent\|success\|warning\|danger | select | supported | Sparkline color tone. | src/framework/core/viz/charts/KpiVariant.jsx |
| kpi | options.showSparkline | boolean | null |  | toggle | supported | Force sparkline visibility regardless of variant. | src/framework/core/viz/charts/KpiVariant.jsx |
| bar | options.tooltip | boolean | true |  | toggle | supported | Toggle the Recharts tooltip. | src/framework/core/viz/charts/BarChartPanel.jsx |
| bar | options.stacked | boolean | false |  | toggle | supported | Enable stacked rendering for series. | src/framework/core/viz/charts/BarChartPanel.jsx |
| bar | options.stackedKeys | stringList | [] |  | list | supported | Explicit series list for stacking/palette. | src/framework/core/viz/palettes/colorAssignment.js |
| bar | options.seriesKeys | stringList | [] |  | list | supported | Explicit series list for palette/legend. | src/framework/core/viz/palettes/colorAssignment.js |
| bar | options.colorBy | enum | series | series\|category | select | supported | Force category coloring for single-series bars. | src/framework/core/viz/palettes/colorAssignment.js |
| bar | options.diverging | boolean | false |  | toggle | supported | Use diverging palette for single-series values. | src/framework/core/viz/palettes/colorAssignment.js |
| bar | options.filterZeroRows | boolean | false |  | toggle | deferred | Drops rows where all series values are zero. | src/framework/core/viz/charts/BarChartPanel.jsx |
| bar | options.legend | boolean | true |  | toggle | supported | Show/hide legend container. | src/framework/core/viz/VizRenderer.jsx |
| bar | options.legendMode | enum | auto | auto\|series\|category | select | supported | Legend visibility logic and palette mode. | src/framework/core/viz/VizRenderer.jsx |
| bar | options.legendPosition | enum | bottom | bottom\|top\|right | select | supported | Legend placement around the chart. | src/framework/core/viz/VizRenderer.jsx |
| line | options.tooltip | boolean | true |  | toggle | supported | Toggle the Recharts tooltip. | src/framework/core/viz/charts/LineChartPanel.jsx |
| line | options.brush.enabled | boolean | false |  | toggle | supported | Enable the brush interaction. | src/framework/core/viz/charts/LineChartPanel.jsx |
| line | options.brush.startIndex | number | null |  | number | supported | Initial brush start index. | src/framework/core/viz/charts/LineChartPanel.jsx |
| line | options.brush.endIndex | number | null |  | number | supported | Initial brush end index. | src/framework/core/viz/charts/LineChartPanel.jsx |
| line | options.filterZeroRows | boolean | false |  | toggle | deferred | Drops rows where all series values are zero. | src/framework/core/viz/charts/LineChartPanel.jsx |
| line | options.seriesKeys | stringList | [] |  | list | supported | Explicit series list for palette/legend. | src/framework/core/viz/palettes/colorAssignment.js |
| line | options.legend | boolean | true |  | toggle | supported | Show/hide legend container. | src/framework/core/viz/VizRenderer.jsx |
| line | options.legendMode | enum | auto | auto\|series\|category | select | supported | Legend visibility logic. | src/framework/core/viz/VizRenderer.jsx |
| line | options.legendPosition | enum | bottom | bottom\|top\|right | select | supported | Legend placement around the chart. | src/framework/core/viz/VizRenderer.jsx |
| barWithConditionalColoring | options.tooltip | boolean | true |  | toggle | supported | Toggle the Recharts tooltip. | src/framework/core/viz/charts/BarWithConditionalColoringPanel.jsx |
| barWithConditionalColoring | options.orientation | enum | vertical | vertical\|horizontal | select | deferred | Switches between vertical and horizontal bars. | src/framework/core/viz/charts/BarWithConditionalColoringPanel.jsx |
| barWithConditionalColoring | options.colorFn | function | null |  | code | deferred | Requires a runtime function; not editable in UI. | src/framework/core/viz/charts/BarWithConditionalColoringPanel.jsx |
| barWithConditionalColoring | options.legendItems | array | [] |  | json | deferred | Legend items list not exposed yet. | src/framework/core/viz/charts/BarWithConditionalColoringPanel.jsx |
| bulletChart | options.orientation | enum | horizontal | horizontal\|vertical | select | supported | Switches axes between horizontal/vertical. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.colorBy | string | "" |  | text | supported | Overrides the color encoding field. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.leftAnnotations.enabled | boolean | true |  | toggle | supported | Show dots beside labels. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.leftAnnotations.type | enum | dot | dot\|none | select | supported | Annotation display style. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.leftAnnotations.colorBy | string | "" |  | text | supported | Field to color left annotations. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.showPercentColumn | boolean | true |  | toggle | supported | Show percent column. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.percentKey | string | "" |  | text | supported | Percent field for the right column. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.markerLines.enabled | boolean | true |  | toggle | supported | Enable marker line overlay. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.markerLines.valueKey | string | dept_average |  | text | supported | Field used for marker line values. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.markerLines.label | string | Dept average |  | text | supported | Label for marker line legend entry. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.markerLines.color | color | #E0E000 |  | color | supported | Marker line color. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.outlierRule.valueKey | string | dept_threshold |  | text | supported | Field for outlier threshold values. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.iqrValueKey | string | "" |  | text | supported | Legacy IQR value key override. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.outlierValueKey | string | "" |  | text | supported | Legacy outlier value key override. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.averageKey | string | "" |  | text | supported | Fallback average key for marker lines. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.headerTitles.xTitle | string | "" |  | text | supported | Header label for value column. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.headerTitles.yTitle | string | "" |  | text | supported | Header label for category column. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.headerTitles.percentTitle | string | "" |  | text | supported | Header label for percent column. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.thresholdMarkers.valueKey | string | "" |  | text | deferred | Legacy marker key preserved for backward compatibility. | src/framework/core/viz/charts/BulletChart.jsx |
| bulletChart | options.thresholdMarkers.label | string | "" |  | text | deferred | Legacy marker label preserved for backward compatibility. | src/framework/core/viz/charts/BulletChart.jsx |
| filterBar | options.allowMultiSelect | boolean | true |  | toggle | supported | Allow multi-select filters. | lazy-dashboards/src/components/LazyFilterBar.jsx |
| filterBar | options.showSearch | boolean | true |  | toggle | supported | Show search input on filter selections. | lazy-dashboards/src/components/LazyFilterBar.jsx |
| filterBar | options.showClear | boolean | true |  | toggle | supported | Show clear button for filters. | lazy-dashboards/src/components/LazyFilterBar.jsx |
| filterBar | options.layout | enum | inline | inline\|stacked | select | supported | Layout of filter bar controls. | lazy-dashboards/src/components/LazyFilterBar.jsx |
