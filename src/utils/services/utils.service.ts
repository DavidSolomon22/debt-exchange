export class UtilsService {
  static getCookie(cookies: string, name: string): string {
    const value = `; ${cookies}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  static extractCookiesFromHeaders(headers: any): string {
    const cookiesArray: Array<string> = headers['set-cookie'].map(
      (cookieHeader: string): string => {
        return cookieHeader.split(';')[0];
      },
    );
    return cookiesArray.join('; ');
  }
}
