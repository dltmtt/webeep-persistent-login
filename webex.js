const emailInput = document.querySelector("#email");
const form = document.querySelector("#GlobalEmailLookupForm");

let userEmail = localStorage.getItem("userEmail");

if (!userEmail) {
	userEmail = prompt(
		"Please enter your email. It will be stored locally for future use.",
	);
	localStorage.setItem("userEmail", userEmail);
}

emailInput.value = userEmail;
form.submit();
