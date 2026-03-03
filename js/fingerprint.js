export async function getFingerprint() {

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("GadisQS", 2, 2);

  const fingerprint = canvas.toDataURL() +
    navigator.userAgent +
    navigator.language +
    screen.colorDepth +
    screen.width +
    screen.height +
    new Date().getTimezoneOffset();

  return btoa(fingerprint);
}
