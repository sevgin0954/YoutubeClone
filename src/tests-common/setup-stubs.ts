export class SetupStubs {
  public static setupElementGetBoundingClientRect(
    element: Element,
    elementXStartPosition: number,
    elementYStartPosition: number,
    elementSize: number
  ): void {

    const newRect = new DOMRect(elementXStartPosition, elementYStartPosition, elementSize, elementSize);
    spyOn(element, 'getBoundingClientRect').and.returnValue(newRect);
  }

  public static setupPredicateStub(predicateFunc: any, ...elementsToMatchOnce: Element[]): void {
    predicateFunc.and.callFake((elementInput: Element) => {
      let result = false;

      if (elementsToMatchOnce.find((e) => e === elementInput)) {
        const elementInputIndex = elementsToMatchOnce.findIndex(e => e === elementInput);
        elementsToMatchOnce.splice(elementInputIndex, 1);
        result = true;
      }

      return result;
    });
  }

  public static setupWindowIsOverflowingFunc(windowService, element: Element, returnResult: boolean): void {
    windowService.isElementOverflowing.and.callFake((elementInput) => {
      if (elementInput === element) {
        return returnResult;
      }
    });
  }
}
