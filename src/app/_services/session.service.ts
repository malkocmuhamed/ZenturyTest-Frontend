export enum KEYS {
    AUTH_HEADER = 'user-auth',
    USER_DATA = 'user-data',
    ROLE_DATA = 'role-data',
  }
  
  export class SessionService {
  
    constructor() {
    }
  
    static get token(): string {
      return localStorage.getItem(KEYS.AUTH_HEADER)!;
    }
  
    static set token(value: string) {
      localStorage.setItem(KEYS.AUTH_HEADER, value);
    }
  
    static get role(): string {
      return localStorage.getItem(KEYS.ROLE_DATA)!;
    }
  
    static set role(value: string) {
      localStorage.setItem(KEYS.ROLE_DATA, value);
    }
  
    static get userData(): any {
      return JSON.parse(localStorage.getItem(KEYS.USER_DATA)!);
    }
  
    static set userData(value: any) {
      localStorage.setItem(KEYS.USER_DATA, value);
    }
  
    static deleteSession(): void {
      localStorage.removeItem(KEYS.AUTH_HEADER);
    }
  
  }
  