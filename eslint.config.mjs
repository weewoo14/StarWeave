import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

import perfectionist from "eslint-plugin-perfectionist";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      perfectionist,
      "unused-imports": unusedImports,
    },

    rules: {
      // ==========================
      // isort equivalent
      // ==========================

      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",

          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "side-effect",
            "style",
          ],

          newlinesBetween: 1,
        },
      ],

      // Remove unused imports
      "unused-imports/no-unused-imports": "error",
    },
  },

  // Let Prettier handle formatting
  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
]);

export default eslintConfig;
