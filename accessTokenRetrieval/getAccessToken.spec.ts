import { test, type Page } from "@playwright/test";
import config from "../reportGeneration/src/config.json";

const { username, password, memorable } = config;

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

    await usernameInput.fill(username);
    await passwordInput.fill(password);

    await passwordInput.press("Enter");

    await page.waitForURL(
        "https://account.patientaccess.com/MultiFactorAuth/Verify**"
    );

    for (const prefix of fieldPrefixes) {
        await populateCharacter(page, prefix);
    }

    await page.getByText("Continue").click();

    await page.waitForURL("https://app.patientaccess.com/dashboard");

    const accessToken = await getAccessTokenFromSessionStorage(page);

    console.log(accessToken);
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
