export function startFileDownload(content, contentType, fileName) {
  const blob = new Blob([content], {type: contentType});
  const link = document.createElement('a');
  link.download = fileName;
  link.href = URL.createObjectURL(blob);
  link.click();
}

export function createPropertyLine(heading, text) {
  const propertyLine = document.createElement('property-line');
  return populatePropertyElement(propertyLine, heading, text);
}

export function createPropertyBlock(heading, text) {
  const propertyBlock = document.createElement('property-block');
  return populatePropertyElement(propertyBlock, `${heading}.`, text);
}

function populatePropertyElement(element, heading, text) {
  const headingElement = document.createElement('h4');
  const textElement = document.createElement('p');

  headingElement.textContent = heading;
  textElement.innerHTML = text;

  element.appendChild(headingElement);
  element.appendChild(textElement);

  return element;
}