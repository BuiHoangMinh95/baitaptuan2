// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeApiService } from '../fake-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey: string = 'authToken';
  private rolesKey: string = 'authRoles';
  redirectUrl: string = ''; // Thêm thuộc tính redirectUrl
  constructor(private fakeApiService: FakeApiService) {}

  authenticate(username: string, password: string): Observable<any> {
    // Gọi API giả lập xác thực
    return this.fakeApiService.authenticate(username, password);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  saveRoles(roles: string[]): void {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRoles(): string[] {
    const rolesString = localStorage.getItem(this.rolesKey);
    return rolesString ? JSON.parse(rolesString) : [];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
  }
}
