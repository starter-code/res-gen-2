export type CssProperties = {
  [key: string]: string;
};

export function toJsObject(cssText: string) {
  const styles: { [key: string]: string } = {};

  cssText
    .replaceAll('{', '')
    .replaceAll('}', '')
    .split(';')
    .forEach(style => {
      const parts = style.split(':');
      if (parts.length === 2) {
        const property = parts[0].trim();
        const value = parts[1].trim();
        styles[property] = value;
      }
    });

  return styles;
}

export function toCamel(str: string): string {
  return str.replace(/-([a-z])/g, function (match: string, letter: string) {
    return letter.toUpperCase();
  });
}

function filterObjectByPrefix(obj: CssProperties, prefix = '--') {
  const filteredObj: CssProperties = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key.startsWith(prefix)) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}

function filterObjectWithoutPrefix(obj: CssProperties, prefix = '--') {
  const filteredObj: CssProperties = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !key.startsWith(prefix)) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}

export function replaceCSSVariables(cssRule: CssProperties): CssProperties {
  const variables = filterObjectByPrefix(cssRule);
  const replacement = filterObjectWithoutPrefix(cssRule);

  const replacedRule = JSON.stringify(replacement).replace(/var\((.*?)\)/g, (match, varName) => {
    // Extract the variable name
    const trimmedVarName = varName.trim();

    // Check if the variable exists in the provided variables object
    if (variables.hasOwnProperty(trimmedVarName)) {
      return variables[trimmedVarName];
    }

    // If the variable doesn't exist, keep it as it is
    return match;
  });

  return JSON.parse(replacedRule);
}

export function toHex(rgbString: string) {
  // Extract RGB values and alpha value
  const matches = rgbString.match(/rgba?\((\d+)\s+(\d+)\s+(\d+)(?:\s+\/\s+([\d.]+))?\)/);
  if (!matches) {
    return rgbString; // leave as is
  }

  const [, red, green, blue, alpha] = matches.map(Number);

  // Convert RGB values to hexadecimal
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Combine the hexadecimal RGB values
  const hexColor = `#${redHex}${greenHex}${blueHex}`.toUpperCase();

  return hexColor;
}

export function getComputedRemFontSize() {
  // TODO this is unusable inside the iframe
  // Create a temporary div element
  const div = document.createElement('div');

  // Set the font size of the div to 1 rem
  div.style.fontSize = '1rem';

  // Append the div to the document body (so it becomes part of the rendering)
  document.body.appendChild(div);

  // Get the computed font size of the div
  const computedFontSize = window.getComputedStyle(div).fontSize;

  // Remove the temporary div from the document
  document.body.removeChild(div);

  return computedFontSize;
}

function toPx(remValue: string, baseFontSizeInPixels = '16px'): string {
  if (!remValue.endsWith('rem')) {
    return remValue;
  }

  const pxValue = Number(remValue.replace('rem', '')) * Number(baseFontSizeInPixels.replace('px', ''));
  return pxValue.toString() + 'px';
}

export function toPdfCssFormat(string: string): string {
  string = toHex(string);
  string = toPx(string);

  return string;
}
