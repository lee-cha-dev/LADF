# Viz Catalog and Authoring Guidance

This catalog reflects the LADF runtime in this repo. Only options listed here are
supported in authoring. Legacy aliases intentionally omitted.

## Authoring Rules (One Page)
- Use the vizType string exactly as documented below.
- Provide required encodings; optional encodings are listed per viz.
- Use option paths exactly as listed (for example, `options.tooltip`), or authoring will
  not resolve them correctly.
- When multiple measure keys are supported, you can pass an array in `encodings.y` or rely
  on `options.seriesKeys` when available.
- If a viz needs structured input (for example, Sankey nodes + links), authoring must
  provide that structure directly; LADF does not infer it.

Status legend:
- supported: available in authoring UI and runtime
- planned: documented but not implemented yet
- deferred: runtime supports it, authoring UI does not expose it

## bar (vizType: bar)
Intended use: Compare categorical values or multiple series per category.
Required data shape: Rows with a category field and one or more numeric measures.
Encodings: `encodings.x` (category), `encodings.y` (measure or array of measures).
Options (supported): `options.tooltip`, `options.stacked`, `options.stackedKeys`
(array present enables stacking for all series), `options.seriesKeys`,
`options.colorBy` (use `"category"` to force categorical coloring),
`options.diverging`, `options.filterZeroRows`,
`options.legend`, `options.legendMode`, `options.legendPosition`,
`options.xAxis.enabled`, `options.yAxis.enabled`,
`options.xAxis.tickRotation`, `options.xAxis.interval`,
`options.yAxis.tickFormatter`, `options.yAxis.interval`.

## line (vizType: line)
Intended use: Trends over ordered categories or time.
Required data shape: Rows with an x field and one or more numeric measures.
Encodings: `encodings.x` (category/time), `encodings.y` (measure or array),
`encodings.group` (optional series grouping).
Options (supported): `options.tooltip`, `options.brush.enabled`,
`options.brush.startIndex`, `options.brush.endIndex`, `options.filterZeroRows`,
`options.seriesKeys`, `options.seriesBy` (fallback grouping key),
`options.legend`, `options.legendMode`, `options.legendPosition`,
`options.xAxis.enabled`, `options.yAxis.enabled`,
`options.xAxis.tickRotation`, `options.xAxis.interval`,
`options.yAxis.tickFormatter`, `options.yAxis.interval`.

## area (vizType: area)
Intended use: Filled trends over ordered categories or time.
Required data shape: Rows with an x field and one or more numeric measures.
Encodings: `encodings.x` (category/time), `encodings.y` (measure or array),
`encodings.group` (optional series grouping).
Options (supported): `options.tooltip`, `options.brush.enabled`,
`options.brush.startIndex`, `options.brush.endIndex`, `options.seriesKeys`,
`options.seriesBy` (fallback grouping key),
`options.legend`, `options.legendMode`, `options.legendPosition`,
`options.xAxis.enabled`, `options.yAxis.enabled`,
`options.xAxis.tickRotation`, `options.xAxis.interval`,
`options.yAxis.tickFormatter`, `options.yAxis.interval`.

## barWithConditionalColoring (vizType: barWithConditionalColoring)
Intended use: Categorical bars with per-row conditional color rules.
Required data shape: Rows with a category field and a numeric measure. Optional flag
field for conditional color.
Encodings: `encodings.x` (category), `encodings.y` (measure), `encodings.color`
(optional flag or condition field).
Options (supported): `options.tooltip`, `options.orientation` (`"horizontal"` or
`"vertical"`), `options.colorFn` (custom row -> color function),
`options.legendItems` (array of `{ label, color }` for custom legend),
`options.xAxis.enabled`, `options.yAxis.enabled`,
`options.xAxis.tickRotation`, `options.xAxis.interval`,
`options.yAxis.tickFormatter`, `options.yAxis.interval`.

## bulletChart (vizType: bulletChart)
Intended use: Compare categories with inline targets and percent column.
Required data shape: Rows with a category field, a primary numeric value, and optional
marker/threshold fields. Percent column is optional.
Encodings: `encodings.x` and `encodings.y` (category/value; swapped by orientation),
`encodings.color` (optional category field for palette grouping).
Options (supported): `options.orientation` (set to `"vertical"` to swap axes),
`options.tooltip`, `options.colorBy`, `options.leftAnnotations.enabled`,
`options.leftAnnotations.type`, `options.leftAnnotations.colorBy`,
`options.showPercentColumn`, `options.percentKey`,
`options.markerLines.enabled`, `options.markerLines.valueKey`,
`options.markerLines.label`, `options.markerLines.color`,
`options.thresholdMarkers.enabled`, `options.thresholdMarkers.valueKey`,
`options.thresholdMarkers.label`, `options.thresholdMarkers.color`,
`options.outlierRule.valueKey`, `options.iqrValueKey`, `options.outlierValueKey`,
`options.averageKey`, `options.headerTitles.xTitle`, `options.headerTitles.yTitle`,
`options.headerTitles.percentTitle`.

## kpi (vizType: kpi)
Intended use: Single metric headline value.
Required data shape: Single row with a numeric value.
Encodings: `encodings.value` or `encodings.y` (value), `encodings.label` (optional),
`encodings.sparkline` (optional sparkline field key),
`encodings.trendValue` (optional),
`encodings.trendChipValue` (optional),
`encodings.trendLabel` (optional),
`encodings.trendChipLabel` (optional),
`encodings.numerator`/`encodings.denominator` (optional for ratio format),
`encodings.ratioNumerator`/`encodings.ratioDenominator` (optional for ratio format).
Options (supported): `options.variant` (clean, accent, gradient, icon, compact),
`options.subvariant`, `options.format`, `options.currency`, `options.decimals`,
`options.compact`, `options.compactThreshold`, `options.valueFrom`,
`options.title`, `options.label`, `options.caption`, `options.subtitle`,
`options.value`, `options.valueSuffix`,
`options.valueTone`, `options.icon`, `options.iconTone`,
`options.badgeText`, `options.badgeTone`, `options.badgeIcon`,
`options.trendValue`, `options.trendValueKey`,
`options.trendLabel`, `options.trendLabelKey`,
`options.trendTone`, `options.trendDirection`, `options.trendIcon`,
`options.trendDecimals`,
`options.trendChipValue`, `options.trendChipValueKey`,
`options.trendChipLabel`, `options.trendChipLabelKey`,
`options.trendChipTone`, `options.trendChipIcon`,
`options.sparkline`, `options.sparklineKey`, `options.sparklineValueKey`,
`options.sparklineFromData`, `options.sparklineTone`, `options.showSparkline`,
`options.ratioDenominator`, `options.ratioNumeratorKey`, `options.ratioDenominatorKey`,
`options.formatter`, `options.customFormat`.

## pie (vizType: pie)
Intended use: Part-to-whole across categories.
Required data shape: Rows with a category field and a numeric value.
Encodings: `encodings.category` (category), `encodings.value` (value).
Options (supported): `options.tooltip`, `options.donut`, `options.labels`,
`options.legend`, `options.legendMode`, `options.legendPosition`.

## scatter (vizType: scatter)
Intended use: Correlation and outlier detection.
Required data shape: Rows with numeric x and y values; optional grouping field.
Encodings: `encodings.x` (x value), `encodings.y` (y value), `encodings.group`
(optional series grouping).
Options (supported): `options.tooltip`, `options.pointSize`,
`options.legend`, `options.legendMode`, `options.legendPosition`,
`options.seriesKeys`, `options.xAxis.enabled`, `options.yAxis.enabled`,
`options.xAxis.tickRotation`, `options.xAxis.interval`,
`options.yAxis.tickFormatter`, `options.yAxis.interval`.

## composed (vizType: composed)
Intended use: Combine bar and line measures on one categorical axis.
Required data shape: Rows with a category field and multiple numeric measures.
Encodings: `encodings.x` (category), `encodings.y` (measure or array).
Options (supported): `options.tooltip`, `options.legend`, `options.legendMode`,
`options.legendPosition`, `options.seriesKeys`, `options.barKeys`, `options.lineKeys`,
`options.xAxis.enabled`, `options.yAxis.enabled`,
`options.xAxis.tickRotation`, `options.xAxis.interval`,
`options.yAxis.tickFormatter`, `options.yAxis.interval`.

## radar (vizType: radar)
Intended use: Compare multiple measures across a shared dimension.
Required data shape: Rows with a category field and one or more numeric measures.
Encodings: `encodings.x` (category), `encodings.y` (measure or array).
Options (supported): `options.tooltip`, `options.legend`, `options.legendMode`,
`options.legendPosition`, `options.seriesKeys`, `options.fillOpacity`.

## treemap (vizType: treemap)
Intended use: Hierarchical or grouped proportional comparisons.
Required data shape: Either a hierarchy with `children` arrays or a flat list with
category and value fields.
Encodings: `encodings.category` or `encodings.x` (category), `encodings.value` or
`encodings.y` (value).
Options (supported): `options.tooltip`, `options.legend`, `options.legendMode`,
`options.legendPosition`, `options.colorBy` (use `"depth"` for depth coloring),
`options.labels`.

## funnel (vizType: funnel)
Intended use: Stage drop-off and conversion funnels.
Required data shape: Rows with a stage name and numeric value.
Encodings: `encodings.category` or `encodings.x` (stage name),
`encodings.value` or `encodings.y` (value).
Options (supported): `options.tooltip`, `options.legend`, `options.legendMode`,
`options.legendPosition`, `options.labelMode` (`"name"`, `"value"`, `"percent"`, `"none"`),
`options.sort` (`"input"`, `"asc"`, `"desc"`).

## sankey (vizType: sankey)
Intended use: Flow between nodes with weighted links.
Required data shape: Sankey object with `nodes` and `links` arrays. Links must reference
source and target nodes and provide a numeric value.
Encodings: None (data is structured).
Options (supported): `options.tooltip`, `options.legend`, `options.legendMode`,
`options.legendPosition`, `options.colorBy` (`"node"`, `"source"`, `"target"`).

## radialBar (vizType: radialBar)
Intended use: Circular ranked/category comparisons.
Required data shape: Rows with a category field and one or more numeric measures.
Encodings: `encodings.category` or `encodings.x` (category),
`encodings.value` or `encodings.y` (measure or array).
Options (supported): `options.tooltip`, `options.legend`, `options.legendMode`,
`options.legendPosition`, `options.seriesKeys`, `options.innerRadius`,
`options.outerRadius`, `options.labels`.
