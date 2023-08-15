import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: ".",
    fullyParallel: true,

    reporter: "html",
    use: {
        trace: "on-first-retry",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
