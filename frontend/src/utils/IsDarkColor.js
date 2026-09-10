
const isDarkColor = (hexColor) => {
  if (!hexColor || typeof hexColor !== "string") return false;

  let hex = hexColor.replace("#", "").trim();

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) return false;

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return false;

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq < 140;
};

export { isDarkColor };
export default isDarkColor;