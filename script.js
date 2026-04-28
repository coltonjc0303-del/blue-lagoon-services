const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const quoteForm = document.querySelector(".quote-form");
const formNote = document.querySelector(".form-note");

if (window.lucide) {
  window.lucide.createIcons();
}

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle?.classList.remove("is-active");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  });
});

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const businessPhone = quoteForm.dataset.businessPhone || "+13524768287";
  const lines = [
    "Blue Lagoon Services quote request",
    `Name: ${formData.get("name") || ""}`,
    `Phone: ${formData.get("phone") || ""}`,
    `Email: ${formData.get("email") || ""}`,
    `Service location: ${formData.get("address") || ""}`,
    `Number of bins: ${formData.get("bins") || ""}`,
    `Service frequency: ${formData.get("frequency") || ""}`,
    `Trash pickup day: ${formData.get("pickupDay") || ""}`,
    `Preferred cleaning date: ${formData.get("preferredDate") || ""}`,
    `Message: ${formData.get("message") || ""}`,
  ].filter((line) => !line.endsWith(": "));

  const smsUrl = `sms:${businessPhone}?body=${encodeURIComponent(lines.join("\n"))}`;

  // Opens the customer's text app with a prefilled message they can review and send.
  window.location.href = smsUrl;
  formNote.textContent = "Your text app should open with the quote request ready to review and send.";
});
