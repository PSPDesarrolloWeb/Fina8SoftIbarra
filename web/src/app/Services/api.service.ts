import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server = 'http://localhost/ap/api.php';


  constructor(private http: HttpClient) { }

  postData(body:any){
    let headers = new HttpHeaders({'Content-Type':'application/json; charset = utf-8'});
    let options = { headers: headers }
    return this.http.post(this.server,JSON.stringify(body), options);
  }

  getData(){
    let headers = new HttpHeaders({'Content-Type':'application/json; charset = utf-8'});
    let options = { headers: headers }
    return this.http.post(this.server,options);
  }
}
