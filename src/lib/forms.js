const SHEETS_ENDPOINT = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export async function submitLead(payload) {
  await new Promise((resolve) => setTimeout(resolve, 750));

  if (!SHEETS_ENDPOINT) {
    return { simulated: true };
  }

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  await fetch(SHEETS_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });

  return { simulated: false };
}
