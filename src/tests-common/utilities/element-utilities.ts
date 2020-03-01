export class ElementUtilities {
  public static createHiddenElement(): Element {
    const hiddenElement = document.createElement('div');
    hiddenElement.setAttribute('hidden', 'hidden');

    return hiddenElement;
  }

  public static getShownElements(): Element[] {
    const firstShownElement = document.createElement('div');
    const lastShownElement = document.createElement('div');
    const elements = [firstShownElement, lastShownElement];

    return elements;
  }
}
