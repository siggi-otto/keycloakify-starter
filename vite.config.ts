import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { buildEmailTheme } from "keycloakify-emails";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            postBuild: async buildContext => {
                await buildEmailTheme({
                    templatesSrcDirPath: import.meta.dirname + "/emails/templates",
                    assetsDirPath: import.meta.dirname + "/emails/templates/assets",
                    themeNames: buildContext.themeNames,
                    keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                    locales: ["de", "en"],
                    i18nSourceFile: import.meta.dirname + "/emails/i18n.ts",
                    cwd: import.meta.dirname,
                    esbuild: {} // optional esbuild options
                });
            }
        })
    ]
});
