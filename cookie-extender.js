const COOKIE_NAME = "MoodleSession";
const COOKIE_URL = "https://webeep.polimi.it/";

chrome.runtime.onInstalled.addListener(() => {
	extendCookie(COOKIE_NAME, COOKIE_URL);
});

chrome.runtime.onStartup.addListener(() => {
	extendCookie(COOKIE_NAME, COOKIE_URL);
});

/**
 * Extends the expiration date of the specified cookie by 400 days.
 *
 * @async
 * @function extendCookie
 * @param {string} name - The name of the cookie to extend.
 * @param {string} url - The URL associated with the cookie.
 * @returns {Promise<void>} Resolves when the cookie has been updated or does nothing if the cookie does not exist.
 */
async function extendCookie(name, url) {
	// Get the current cookie
	const cookie = await chrome.cookies.get({ name, url });

	// If the cookie doesn't exist, do nothing
	if (!cookie) {
		return;
	}

	// Set the expiration date to 400 days from now
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + 400);

	// Update the cookie with the new expiration date
	chrome.cookies.set({
		name,
		url,
		value: cookie.value,
		expirationDate: Math.floor(expirationDate.getTime() / 1000),
	});

	console.log(
		chrome.i18n.getMessage("cookie_extended", [
			name,
			expirationDate.toISOString(),
		]),
	);
}
