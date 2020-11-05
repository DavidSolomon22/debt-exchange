export class UtilsService {
  static getCookie(cookies: string, name: string): string {
    const value = `; ${cookies}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return parts
        .pop()
        .split(';')
        .shift();
  }
}
