"use server";

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn("TURNSTILE_SECRET_KEY is not defined. Skipping token verification.");
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const outcome = await res.json();
    return Boolean(outcome.success);
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

export async function submitToGoogleSheet(formData: FormData) {
  const turnstileToken = formData.get("cf-turnstile-response")?.toString();

  if (!turnstileToken) {
    return { success: false, error: "Please complete the security check." };
  }

  const isValid = await verifyTurnstileToken(turnstileToken);
  if (!isValid) {
    return { success: false, error: "Security check failed. Please refresh and try again." };
  }

  // Server-side field validation & anti-spam sanitization
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const business = String(formData.get("business") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const details = String(formData.get("details") || "").trim();

  // Validate Name (2-60 chars)
  if (!fullName || fullName.length < 2 || fullName.length > 60 || !/^[a-zA-Z\u00C0-\u024F\s'.\-_]+$/.test(fullName)) {
    return { success: false, error: "Invalid name format." };
  }

  // Validate Email (max 100 chars, strict email check)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email || email.length > 100 || !emailRegex.test(email) || !email.includes(".")) {
    return { success: false, error: "Invalid email address format." };
  }

  // Validate Business (if provided, max 80 chars)
  if (business && (business.length > 80 || !/^[a-zA-Z0-9\u00C0-\u024F\s'.\-&,/()]+$/.test(business))) {
    return { success: false, error: "Invalid business name format." };
  }

  // Validate Phone (if provided, 7-18 digits, max 25 chars, at most one leading +)
  if (phone && phone !== "Not provided") {
    const cleanPhone = phone.replace(/^'/, "");
    const digitsOnly = cleanPhone.replace(/\D/g, "");
    if (cleanPhone.length > 25 || digitsOnly.length < 7 || digitsOnly.length > 16 || !/^\+?[0-9\s\-()]+$/.test(cleanPhone) || (cleanPhone.match(/\+/g) || []).length > 1) {
      return { success: false, error: "Invalid phone number." };
    }
  }

  // Check details for spam URLs or excessive length
  const urlPattern = /(https?:\/\/|www\.|\.com|\.ru|\.xyz|\.top|\.online|\.site|\.cn|\.info|\.net|\.org|t\.me|wa\.me)/i;
  if (details && details !== "No details provided") {
    if (details.length > 600) {
      return { success: false, error: "Message exceeds allowed length." };
    }
    if (urlPattern.test(details)) {
      return { success: false, error: "Website URLs or links are not permitted in the enquiry message." };
    }
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.error("Missing GOOGLE_SCRIPT_URL in environment variables.");
    return { success: false, error: "Configuration error." };
  }

  // We convert the FormData into standard URL parameters so Google reads it instantly
  const data = new URLSearchParams();
  formData.forEach((value, key) => {
    // Exclude the turnstile response token from being appended to Google Sheet
    if (key !== "cf-turnstile-response") {
      data.append(key, value.toString());
    }
  });

  try {
    // We send it without the 'no-cors' mode so the server doesn't hang!
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: data,
    });

    return { success: response.ok };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false };
  }
}
