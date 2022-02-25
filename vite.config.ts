import { UserConfigExport, defineConfig } from 'vite';

import reactJsx from 'vite-react-jsx';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: UserConfigExport = {
  plugins: [
    tsconfigPaths({
      projects: ['../../tsconfig.json'],
    }),
    reactJsx(),
    reactRefresh(),
  ],
};

export default defineConfig(config);
