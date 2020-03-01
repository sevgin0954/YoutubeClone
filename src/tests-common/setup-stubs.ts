export class SetupStubs {
  public static setupPredicateStub(predicateFunc: any, elementToMatch: any): void {
    predicateFunc.and.callFake((element) => {
      let result = false;

      if (element === elementToMatch) {
        result = true;
      }

      return result;
    });
  }

  public static setupWindowIsOverflowingFunc(windowService, element: Element, returnResult: boolean): void {
    windowService.isElementOverflowing.and.callFake(() => {
      if (element === element) {
        return returnResult;
      }
    });
  }
}
