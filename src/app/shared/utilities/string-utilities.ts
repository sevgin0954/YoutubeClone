export class StringUtilities {
  public static nameof<T>(name: keyof T): string {
    return name.toString();
  }
}
