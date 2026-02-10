import DatasetImporter from '../DatasetImporter.jsx';

/**
 * @typedef {Object} DatasetPanelProps
 * @property {Object[]} datasources
 * @property {string|null} activeDatasourceId
 * @property {(nextId: string) => void} onActiveDatasourceChange
 * @property {() => void} onAddDatasource
 * @property {(datasourceId: string) => void} onRemoveDatasource
 * @property {(datasourceId: string, nextName: string) => void} onDatasourceNameChange
 * @property {(datasourceId: string, nextId: string) => void} onDatasourceIdChange
 * @property {Object|null} datasetBinding
 * @property {(nextBinding: Object) => void} onDatasetUpdate
 */

/**
 * Wraps the dataset importer inside a labeled editor panel.
 *
 * @param {DatasetPanelProps} props
 * @returns {JSX.Element}
 */
const DatasetPanel = ({
  datasources,
  activeDatasourceId,
  onActiveDatasourceChange,
  onAddDatasource,
  onRemoveDatasource,
  onDatasourceNameChange,
  onDatasourceIdChange,
  datasetBinding,
  onDatasetUpdate,
}) => {
  const activeDatasource =
    (datasources || []).find((datasource) => datasource.id === activeDatasourceId) ||
    datasources?.[0] ||
    null;
  const canRemove = (datasources || []).length > 1;

  return (
    <section className="lazy-panel">
      <h2 className="lazy-panel__title">Datasources</h2>
      <p className="lazy-panel__body">
        Add endpoints, set ids, and switch the datasource you want to edit.
      </p>
      <div className="lazy-form">
        <label className="lazy-form__field">
          <span className="lazy-input__label">Active datasource</span>
          <select
            className="lazy-input__field"
            value={activeDatasourceId || ''}
            onChange={(event) => onActiveDatasourceChange?.(event.target.value)}
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
          <span className="lazy-input__label">Datasource name</span>
          <input
            className="lazy-input__field"
            type="text"
            value={activeDatasource?.name || ''}
            onChange={(event) =>
              activeDatasource
                ? onDatasourceNameChange?.(
                    activeDatasource.id,
                    event.target.value
                  )
                : null
            }
          />
        </label>
        <label className="lazy-form__field">
          <span className="lazy-input__label">Datasource id</span>
          <input
            className="lazy-input__field"
            type="text"
            value={activeDatasource?.id || ''}
            onChange={(event) =>
              activeDatasource
                ? onDatasourceIdChange?.(
                    activeDatasource.id,
                    event.target.value
                  )
                : null
            }
          />
        </label>
        <div className="lazy-form__actions">
          <button
            className="lazy-button ghost"
            type="button"
            onClick={() => onAddDatasource?.()}
          >
            Add datasource
          </button>
          <button
            className="lazy-button ghost"
            type="button"
            onClick={() =>
              activeDatasource && canRemove
                ? onRemoveDatasource?.(activeDatasource.id)
                : null
            }
            disabled={!canRemove}
          >
            Remove datasource
          </button>
        </div>
      </div>
      <DatasetImporter
        datasetBinding={datasetBinding}
        onUpdate={onDatasetUpdate}
      />
    </section>
  );
};

export default DatasetPanel;
