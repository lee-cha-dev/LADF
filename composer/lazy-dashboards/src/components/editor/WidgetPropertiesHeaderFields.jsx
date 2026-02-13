/**
 * WidgetPropertiesHeaderFields
 * ----------------------------
 * Renders the core widget fields (title, subtitle, datasource, viz type)
 * and any manifest support alerts.
 */

/**
 * @typedef {Object} WidgetPropertiesHeaderFieldsProps
 * @property {Object} activeWidget
 * @property {string|null} resolvedDatasourceId
 * @property {Object[]} datasources
 * @property {Object[]} vizManifests
 * @property {Object|null} activeVizManifest
 * @property {(widgetId: string, key: string, value: *) => void} onWidgetFieldChange
 */

/**
 * Header fields for the active widget.
 *
 * @param {WidgetPropertiesHeaderFieldsProps} props
 * @returns {JSX.Element|null}
 */
const WidgetPropertiesHeaderFields = ({
  activeWidget,
  resolvedDatasourceId,
  datasources,
  vizManifests,
  activeVizManifest,
  onWidgetFieldChange,
}) => {
  if (!activeWidget) {
    return null;
  }

  return (
    <>
      <label className="lazy-form__field">
        <span className="lazy-input__label">Title</span>
        <input
          className="lazy-input__field"
          type="text"
          value={activeWidget.title}
          onChange={(event) =>
            onWidgetFieldChange(
              activeWidget.id,
              'title',
              event.target.value
            )
          }
        />
      </label>
      <label className="lazy-form__field">
        <span className="lazy-input__label">Subtitle</span>
        <input
          className="lazy-input__field"
          type="text"
          value={activeWidget.subtitle}
          onChange={(event) =>
            onWidgetFieldChange(
              activeWidget.id,
              'subtitle',
              event.target.value
            )
          }
        />
      </label>
      <label className="lazy-form__field">
        <span className="lazy-input__label">Datasource</span>
        <select
          className="lazy-input__field"
          value={resolvedDatasourceId || ''}
          onChange={(event) =>
            onWidgetFieldChange(
              activeWidget.id,
              'datasourceId',
              event.target.value
            )
          }
          disabled={(datasources || []).length <= 1}
        >
          {(datasources || []).map((datasource) => (
            <option key={datasource.id} value={datasource.id}>
              {datasource.name || datasource.id}
            </option>
          ))}
        </select>
      </label>
      <label className="lazy-form__field">
        <span className="lazy-input__label">Viz Type</span>
        <select
          className="lazy-input__field"
          value={activeWidget.vizType}
          onChange={(event) =>
            onWidgetFieldChange(
              activeWidget.id,
              'vizType',
              event.target.value
            )
          }
        >
          {vizManifests.map((manifest) => (
            <option
              key={manifest.id}
              value={manifest.id}
              disabled={manifest.supportLevel === 'deferred'}
            >
              {manifest.label}
            </option>
          ))}
        </select>
      </label>
      {activeVizManifest?.supportLevel === 'partial' ? (
        <div className="lazy-alert warning">
          <strong>Partial support.</strong>
          <span>
            Some options for this widget are only editable in Expert mode.
          </span>
        </div>
      ) : null}
      {activeVizManifest?.supportLevel === 'deferred' ? (
        <div className="lazy-alert danger">
          <strong>Deferred widget.</strong>
          <span>
            This widget is not fully supported yet. Preview output may be
            incomplete.
          </span>
        </div>
      ) : null}
    </>
  );
};

export default WidgetPropertiesHeaderFields;
