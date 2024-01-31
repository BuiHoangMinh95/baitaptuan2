import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admins'; // Make sure it's the correct endpoint for your JSON Server

  constructor(private http: HttpClient) {}

  getAdmins(page: number, pageSize: number): Observable<any> {
    // Use HttpParams to include query parameters in the request
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', pageSize.toString());
    // Pass the params as the second argument to the get method
    return this.http.get<any>(this.apiUrl, { params });
  }

  getAdminById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addAdmin(adminData: any): Observable<any> {
    // Generate a UID (assuming you have a function or library to generate unique IDs)
    const uid = this.generateUID();

    // Append the UID to the adminData
    const adminWithUID = { ...adminData, id: uid };

    // Make the HTTP post request
    return this.http.post(this.apiUrl, adminWithUID);
  }

  private generateUID(): string {
    // For simplicity, using a timestamp-based UID as an example
    return new Date().getTime().toString();
  }

  editAdmin(adminId: string, adminData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${adminId}`, adminData);
  }

  deleteAdmin(adminId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${adminId}`);
  }
}
