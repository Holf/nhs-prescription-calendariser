import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: ".",
    fullyParallel: true,

    reporter: "html",
    use: {
        trace: "retain-on-failure",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
