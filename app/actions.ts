"use server";

export async function submitToGoogleSheet(formData: FormData) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.error("Missing GOOGLE_SCRIPT_URL in environment variables.");
    return { success: false };
  }

  // We convert the FormData into standard URL parameters so Google reads it instantly
  const data = new URLSearchParams();
  formData.forEach((value, key) => {
    data.append(key, value.toString());
  });

  try {
    // We send it without the 'no-cors' mode so the server doesn't hang!
    await fetch(scriptUrl, {
      method: "POST",
      body: data,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false };
  }
}
