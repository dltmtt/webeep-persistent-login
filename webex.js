const hiddenEmailInput = document.querySelector("#email");
const form = document.querySelector("#GlobalEmailLookupForm");

chrome.storage.sync.get("email", (data) => {
	let email = data.email;

	if (email) {
		hiddenEmailInput.value = email;
		form.submit();
	}

	// If no email is found, get it from the input field and save it.
	// Note that the form is submitted when the user clicks the button.
	const loginButton = document.querySelector("#IDButton2");
	loginButton.addEventListener("click", () => {
		email = document.querySelector("#IDToken1").value;
		chrome.storage.sync.set({ email });
	});
});
