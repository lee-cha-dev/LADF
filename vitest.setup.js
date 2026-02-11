import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock(
  'xlsx',
  () => ({
    read: () => ({ SheetNames: [], Sheets: {} }),
    utils: { sheet_to_json: () => [] },
  }),
  { virtual: true }
);
