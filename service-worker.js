const webeep_url = "https://webeep.polimi.it";

chrome.action.onClicked.addListener(() => {
	chrome.tabs.create({ url: webeep_url });
});

chrome.webNavigation.onBeforeNavigate.addListener(
	async () => {
		await extendCookie(webeep_url, "MoodleSession");
		chrome.tabs.update({
			url: `${webeep_url}/auth/shibboleth/index.php`,
		});
	},
	{ url: [{ urlEquals: `${webeep_url}/login/index.php` }] },
);

/**
 * Extend the expiration date of a cookie by 400 days.
 * @param {string} url the URL in which the cookie to extend is stored.
 * @param {string} name the name of the cookie to extend.
 */
async function extendCookie(url, name) {
	const cookie = await chrome.cookies.get({
		url: url,
		name: name,
	});

	if (cookie == null) {
		return;
	}

	const in400days = new Date(Date.now() + 400 * 24 * 60 * 60 * 1000);

	await chrome.cookies.set({
		url: url,
		name: name,
		value: cookie.value,
		sameSite: cookie.sameSite,
		secure: cookie.secure,
		expirationDate: in400days.getTime() / 1000,
	});

	console.log(
		chrome.i18n.getMessage("cookie_extended", [name, in400days.toISOString()]),
	);
}
