const fs = require("fs/promises");

const { chromium } = require("@playwright/test");

const sessionStorageKey =
    "oidc.user:https://account.patientaccess.com:pkce_patientaccess_web";

const loginTimeoutInMs = 180 * 1000;

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ bypassCSP: true });
    const page = await context.newPage();
    await page.goto("https://app.patientaccess.com/");
    // Wait for user to log in
    await page.waitForFunction(
        `sessionStorage.getItem("oidc.user:https://account.patientaccess.com:pkce_patientaccess_web") !== null`,
        null,
        { timeout: loginTimeoutInMs }
    );
    // Retrieve value from local storage
    const value = await page.evaluate(() =>
        sessionStorage.getItem(
            "oidc.user:https://account.patientaccess.com:pkce_patientaccess_web"
        )
    );

    const accessToken = JSON.parse(value).access_token;
    await fs.writeFile("accessToken.json", JSON.stringify({ accessToken }));

    await browser.close();
})();
