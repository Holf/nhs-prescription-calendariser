import { test, type Page, expect } from "@playwright/test";
import config from "../reportGeneration/src/config.json";

const { username, password, memorable } = config;

const doRandomWait = async (page: Page) => {
    const waitTimeInMs = (Math.random() * 2 + 1) * 1000;
    await page.waitForTimeout(waitTimeInMs);
};

const fieldPrefixes = ["first", "second", "third"];

const populateCharacter = async (page: Page, prefix: string) => {
    const characterLabel = page.locator(`#${prefix}-memword-label`);

    const ordinalCharacterIndex = (await characterLabel.textContent()) ?? "";
    const characterIndex =
        Number.parseInt(ordinalCharacterIndex.slice(0, -2)) - 1;

    const character = memorable[characterIndex];

    const characterInput = page.locator(`#${prefix}-memword-text`);
    await characterInput.fill(character);
};

test("should retrieve AccessToken", async ({ page }) => {
    await page.goto("https://app.patientaccess.com/");

    const usernameInput = page.getByPlaceholder("Enter your email or User ID");
    const passwordInput = page.getByPlaceholder("Enter your password");

    await doRandomWait(page);
    await usernameInput.fill(username);

    await doRandomWait(page);
    await passwordInput.fill(password);

    await doRandomWait(page);
    await passwordInput.press("Enter");

    await page.waitForURL(
        "https://account.patientaccess.com/MultiFactorAuth/Verify**"
    );

    for (const prefix of fieldPrefixes) {
        await doRandomWait(page);
        await populateCharacter(page, prefix);
    }

    await doRandomWait(page);
    await page.getByText("Continue").click({ timeout: 20000 });

    const tokenResponse = await page.waitForResponse(
        "https://account.patientaccess.com/connect/token",
        { timeout: 20000 }
    );
    const tokenData = await tokenResponse.json();

    const token = tokenData.access_token;

    console.log(token);

    // await page.waitForURL("https://app.patientaccess.com/dashboard");

    // const locator = page.locator("#next-appointment");
    // await expect(locator).toBeVisible({ timeout: 20000 });

    // const accessToken = await getAccessTokenFromSessionStorage(page);

    // console.log(accessToken);
});

async function getAccessTokenFromSessionStorage(page: Page) {
    return await page.waitForFunction((e) => {
        const authDataString =
            sessionStorage.getItem(
                "oidc.user:https://account.patientaccess.com:pkce_patientaccess_web"
            ) ?? "";
        const authData = JSON.parse(authDataString);

        return authData.access_token;
    });
}
