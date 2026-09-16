10:53:46.857 Running build in Washington, D.C., USA (East) – iad1
10:53:46.858 Build machine configuration: 4 cores, 8 GB
10:53:47.011 Cloning github.com/hahzterry/waffle-hahz-training-game (Branch: main, Commit: 7505644)
10:53:47.894 Cloning completed: 883.000ms
10:53:48.053 Restored build cache from previous deployment (9cHpAH3pwHbPCX9tCBDWbHeQYZMn)
10:53:48.315 Running "vercel build"
10:53:48.369 Vercel CLI 59.16.0
10:53:48.969 Installing dependencies...
10:53:49.772 
10:53:49.772 up to date in 638ms
10:53:49.773 
10:53:49.773 5 packages are looking for funding
10:53:49.773   run `npm fund` for details
10:53:49.774 npm warn allow-scripts 1 package has install scripts not yet covered by allowScripts:
10:53:49.774 npm warn allow-scripts   esbuild@0.25.2 (postinstall: node install.js)
10:53:49.774 npm warn allow-scripts
10:53:49.774 npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.
10:53:49.822 Running "npm run build"
10:53:49.957 
10:53:49.957 > template-vite@1.4.0 build
10:53:49.958 > node log.js build & vite build --config vite/config.prod.mjs
10:53:49.958 
10:53:50.303 Building for production...
10:53:50.358 ---------------------------------------------------------
10:53:50.358 ❤️❤️❤️ Tell us about your game! - games@phaser.io ❤️❤️❤️
10:53:50.358 ---------------------------------------------------------
10:53:50.358 ✨ Done ✨
10:53:50.360 ✗ Build failed in 61ms
10:53:50.361 error during build:
10:53:50.361 Could not resolve "./game/scenes/Results.js" from "src/main.js"
10:53:50.361 file: /vercel/path0/src/main.js
10:53:50.362     at getRollupError (file:///vercel/path0/node_modules/rollup/dist/es/shared/parseAst.js:397:41)
10:53:50.362     at error (file:///vercel/path0/node_modules/rollup/dist/es/shared/parseAst.js:393:42)
10:53:50.362     at ModuleLoader.handleInvalidResolvedId (file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:21328:24)
10:53:50.362     at file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:21288:26
10:53:50.385 Error: Command "npm run build" exited with 1
