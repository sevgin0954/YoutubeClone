export class HttpClientStubUtilities {
  public static getUrlArgument(httpClientFunction: any): string {
    const path: string = this.getArgument(httpClientFunction, 0);

    return path;
  }

  public static getBodyArgument(httpClientFunction: any): any {
    const body: any = this.getArgument(httpClientFunction, 1);

    return body;
  }

  private static getArgument(httpClientFunction: any, argumentIndex: number): any {
    const mostRecentArguments = httpClientFunction.calls.mostRecent();
    const argument: any = mostRecentArguments.args[argumentIndex];

    return argument;
  }
}
