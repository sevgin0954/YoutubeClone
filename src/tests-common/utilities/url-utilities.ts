export class UrlUtilities {

  public static getQueryParam(url: string): string {
    const queryParamsString = url.split('?')[1];
    const queryParams = queryParamsString.split('&');
    const resultQueryParam = queryParams.find(p => p.includes('part'));

    return resultQueryParam;
  }
}
