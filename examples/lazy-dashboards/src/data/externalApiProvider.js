const normalizeKeyValuePairs = (pairs = []) =>
  (Array.isArray(pairs) ? pairs : []).filter((pair) => pair?.key);

export const generateExternalApiProviderModule = (config = {}) => {
  const payload = {
    baseUrl: config.baseUrl || '',
    method: config.method || 'GET',
    headers: normalizeKeyValuePairs(config.headers),
    queryParams: normalizeKeyValuePairs(config.queryParams),
    responsePath: config.responsePath || '',
    refreshInterval: config.refreshInterval || null,
  };
  const serializedConfig = JSON.stringify(payload, null, 2);
  return `import { createDataProvider } from 'radf';

const apiConfig = ${serializedConfig};

const normalizeKeyValuePairs = (pairs = []) =>
  (Array.isArray(pairs) ? pairs : []).filter((pair) => pair?.key);

const buildRequestUrl = (baseUrl, queryParams = []) => {
  if (!baseUrl) {
    return '';
  }
  const origin =
    typeof window === 'undefined' ? 'http://localhost' : window.location.origin;
  const url = new URL(baseUrl, origin);
  normalizeKeyValuePairs(queryParams).forEach((param) => {
    url.searchParams.set(param.key, param.value ?? '');
  });
  return url.toString();
};

const toHeaders = (pairs = []) =>
  normalizeKeyValuePairs(pairs).reduce((acc, pair) => {
    acc[pair.key] = pair.value ?? '';
    return acc;
  }, {});

const parsePathSegments = (path) => {
  if (!path) {
    return [];
  }
  return path.split('.').flatMap((segment) => {
    const parts = [];
    const matcher = /([^\\[\\]]+)|\\[(\\d+)\\]/g;
    let match = matcher.exec(segment);
    while (match) {
      if (match[1]) {
        parts.push(match[1]);
      }
      if (match[2]) {
        parts.push(Number(match[2]));
      }
      match = matcher.exec(segment);
    }
    return parts;
  });
};

const resolveResponsePath = (payload, path) => {
  const segments = parsePathSegments(path);
  if (segments.length === 0) {
    return payload;
  }
  return segments.reduce((acc, segment) => {
    if (acc === null || acc === undefined) {
      return null;
    }
    return acc[segment];
  }, payload);
};

const extractApiRows = (payload, responsePath) => {
  const resolved = resolveResponsePath(payload, responsePath);
  const array = Array.isArray(resolved)
    ? resolved
    : resolved
      ? [resolved]
      : [];
  return array.map((row) => {
    if (row && typeof row === 'object' && !Array.isArray(row)) {
      return row;
    }
    return { value: row };
  });
};

const fetchApiRows = async (config) => {
  const url = buildRequestUrl(config.baseUrl, config.queryParams);
  if (!url) {
    throw new Error('Base URL is required to fetch data.');
  }
  const response = await fetch(url, {
    method: config.method || 'GET',
    headers: toHeaders(config.headers),
  });
  if (!response.ok) {
    throw new Error(\`Request failed (\${response.status}).\`);
  }
  const payload = await response.json();
  return extractApiRows(payload, config.responsePath);
};

const createExternalApiProvider = (config = apiConfig) => {
  const refreshSeconds = Number(config.refreshInterval || 0);
  const refreshMs = Number.isFinite(refreshSeconds)
    ? refreshSeconds * 1000
    : 0;
  let cached = null;
  let cachedAt = 0;

  return createDataProvider(async () => {
    const now = Date.now();
    if (refreshMs > 0 && cached && now - cachedAt < refreshMs) {
      return cached;
    }
    const rows = await fetchApiRows(config);
    const result = {
      rows,
      meta: {
        rowCount: rows.length,
      },
    };
    cached = result;
    cachedAt = now;
    return result;
  });
};

export default createExternalApiProvider;
`;
};
