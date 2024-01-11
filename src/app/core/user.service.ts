import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './models/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiServerUrl = 'http://localhost:8089/api-auth/';
const emailurl='http://localhost:8089/user/';
const baseUrl='http://localhost:8089/';

const apiUrl='http://localhost:8089/user/'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  adminhttpOptions: { headers: HttpHeaders; };


  constructor(private httpclient:HttpClient ) { 
    this.adminhttpOptions = {  headers: new HttpHeaders({
      'Authorization': "Bearer " + ""
    })}

  }
  public addUser(user :User):Observable<any>{
    return this.httpclient.post<any>("http://localhost:8089/user/addUser",user)
  
  }
 
  register(userData: any) {
    // Adjust this method to construct your HTTP request to register a user
    // Example:
    return this.httpclient.post(apiServerUrl + 'signup', userData, { withCredentials: true });
  }

  login(username: string, password: string): Observable<any> {
    return this.httpclient.post(apiServerUrl + 'signin', {
      username,
      password
    }, httpOptions);
  }


  confirmUserAccount(token: string) {
    const url = `${apiServerUrl}confirm-account?token=${token}`;
    return this.httpclient.get<any>(url);
  }

  sendResetPasswordCode(email: string) {
    const resetEndpoint = `${emailurl}sendme/`; // Replace with your reset password API endpoint
    return this.httpclient.get<any>(resetEndpoint+email,httpOptions);
  }
 verifyResetPasswordCode(email: string) {
  const resetEndpoint = `${emailurl}verify-resetpasscode/`; // Replace with your reset password API endpoint
  return this.httpclient.get<any>(resetEndpoint+email);
  }
  updatePassword(emailUser: string, newPassword: string): Observable<any> {
    const url = `${baseUrl}user/updatepassword/${emailUser}/${newPassword}`;
    
    // You can customize headers if needed, for example, to include authentication tokens
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + authToken });

    return this.httpclient.put(url,httpOptions);  // The null parameter is passed as the request body for a PUT request
  }
 
  getUsers():Observable<any>{
    return this.httpclient.get<any>('http://localhost:8089/user/allUsers');

  }
  blockUser(id:Number):Observable<any>{

    return this.httpclient.put('http://localhost:8089/user/blockuser/'+id,httpOptions);  // The null parameter is passed as the request body for a PUT request

  }
 
  unblockUser(id: number): Observable<any> {
    return this.httpclient.put(`http://localhost:8089/user/unblockuser/${id}`, httpOptions);
  }
  
  deleteUser(userId: number): Observable<void> {
    const url = `http://localhost:8089/user/deleteUser/${userId}`;
    return this.httpclient.delete<void>(url);
  }

  exportPdf(): Observable<any> {
    const url = `${apiUrl}exportpdf`;

    return this.httpclient.get(url, {
      observe: 'response',
      responseType: 'blob' as 'json' // The response type is set to 'blob' for binary data (PDF)
    });
  }

  getUser(idUser : any): Observable<any> { return this.httpclient.get(environment.nawaUrl + "user/get/"+idUser, this.adminhttpOptions); }

}
