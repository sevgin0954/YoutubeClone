export class HttpClientUtilities {
  public static getHttpClientUrlArgument(httpClientFunction): string {
    const mostRecentArguments = httpClientFunction.calls.mostRecent();
    const path: string = mostRecentArguments.args[0];

    return path;
  }
}
