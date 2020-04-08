export class SetupStubs {
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

  public static setupWindowIsElementOverflowingHorizontaly(windowService, element: Element, returnResult: boolean): void {
    windowService.isElementOverflowingHorizontaly.and.callFake((elementInput) => {
      if (elementInput === element) {
        return returnResult;
      }
    });
  }
}
