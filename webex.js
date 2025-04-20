window.addEventListener("load", () => {
	userEmail = localStorage.getItem("userEmail");

	if (!userEmail) {
		userEmail = prompt(
			"Please enter your email. It will be stored locally for future use.",
		);
		localStorage.setItem("userEmail", userEmail);
	}

	document.querySelector("#email").value = userEmail;
	document.querySelector("#GlobalEmailLookupForm").submit();
});
