window.addEventListener("load", () => {
	userEmail = localStorage.getItem("userEmail");

	if (!userEmail) {
		userEmail = prompt(
			"Please enter your email. It will be stored locally for future use.",
		);
		localStorage.setItem("userEmail", userEmail);
	}

	document.querySelector("#IDToken1").value = userEmail;

	loginButton = document.querySelector("#IDButton2");
	loginButton.disabled = false;
	loginButton.click();
});
