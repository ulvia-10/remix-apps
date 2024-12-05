import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}


export default ({ mode }: { mode: string }) => {
    const env = loadEnv(mode, process.cwd(), '')
    process.env = { ...process.env, ...env }
    return defineConfig({
      envPrefix: 'REACT_APP_',
        plugins: [
            remix({
              future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
                v3_singleFetch: true,
                v3_lazyRouteDiscovery: true,
              },
        
            }),
            tsconfigPaths(),
            
        ],
    });
}


