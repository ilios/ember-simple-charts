function sliceColor(data, color, reverse = false) {
  const rgb = color(data);
  const parts = rgb.substr(4).split(')')[0].split(',');
  const r = parseInt(parts[0], 16);
  const g = parseInt(parts[1], 16);
  const b = parseInt(parts[2], 16);
  // Thanks to https://24ways.org/2010/calculating-color-contrast for this formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  if (reverse) {
    return yiq >= 256 ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
  } else {
    return yiq >= 256 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
  }
}

export { sliceColor as default };
//# sourceMappingURL=slice-color.js.map
