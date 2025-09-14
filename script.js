const qrText = document.getElementById("qr-text");
const sizes = document.getElementById("sizes");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");
const qrContainer = document.getElementById("qr-body");

let size = sizes.value;

sizes.addEventListener("change", (e) => {
  size = e.target.value;
  generateQRCode();
});

qrText.addEventListener("input", () => {
  generateQRCode();
});

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  generateQRCode();
});

function generateQRCode() {
  const value = qrText.value.trim();
  if (!value) return alert("Please enter text or a URL!");

  qrContainer.innerHTML = "";
  const qrCode = new QRCode(qrContainer, {
    text: value,
    width: size,
    height: size,
    colorDark: "#000",
    colorLight: "#fff",
  });

  setTimeout(() => {
    qrContainer.classList.add("show");
    const img = qrContainer.querySelector("img");
    if (img) {
      downloadBtn.href = img.src;
    } else {
      const canvas = document.querySelector("canvas");
      if (canvas) downloadBtn.href = canvas.toDataURL();
    }
  }, 300);
}

copyBtn.addEventListener("click", () => {
  if (!qrText.value.trim()) return alert("Nothing to copy!");
  navigator.clipboard.writeText(qrText.value);
  alert("Link copied to clipboard!");
});

resetBtn.addEventListener("click", () => {
  qrText.value = "";
  qrContainer.innerHTML = "";
  qrContainer.classList.remove("show");
});
