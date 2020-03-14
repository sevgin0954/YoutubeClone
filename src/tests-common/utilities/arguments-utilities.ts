export class ArgumentsUtilities {
  public static getMostRecentArgument(spiedFunc: any, argumentIndex: number): any {
    const mostRecentArguments = spiedFunc.calls.mostRecent().args;
    const argument: any = mostRecentArguments[argumentIndex];

    return argument;
  }
}
