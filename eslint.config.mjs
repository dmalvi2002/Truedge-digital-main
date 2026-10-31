import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // These inputs run in standalone Sanity and cannot use Next's image component.
  { files: ["sanity-admin/**/*.tsx"], rules: { "@next/next/no-img-element": "off" } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".next-sanity-test/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "sanity.types.ts",
    "public/admin/**",
    ".claude/worktrees/**",
  ]),
]);

export default eslintConfig;
