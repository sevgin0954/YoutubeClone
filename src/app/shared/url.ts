export class Url {
  readonly basePath: string;
  readonly paths: string[];
  readonly queryParams: any

  constructor(basePath: string, paths: string[], queryParams: any) {
    this.basePath = basePath;
    this.paths = paths;
    this.queryParams = queryParams;
  }

  private getWithPaths(): string {
    let fullPath = this.basePath;

    this.paths.forEach((currentPath) => {
      fullPath += `/${currentPath}`;
    });

    return fullPath;
  }

  private appendQueryParams(path: string): string {
    let fullPath = path;

    let isFirst = true;
    for (const prop of Object.keys(this.queryParams)) {
      let separator = '&';
      if (isFirst) {
        separator = '?';
        isFirst = false;
      }

      const queryKey = prop;
      const queryValue = this.queryParams[prop];
      fullPath += separator + queryKey + '=' + queryValue;
    }

    return fullPath;
  }

  toString() {
    // TODO: Think of a better name
    const pathWithPaths = this.getWithPaths();
    const fullPath = this.appendQueryParams(pathWithPaths);

    return fullPath;
  }
}
