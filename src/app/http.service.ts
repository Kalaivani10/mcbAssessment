import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  baseUrl: string = "http://localhost:3000/";

  headers: any = new HttpHeaders({ "Content-Type": "application/json" });
  userReg: string = "register?";

  constructor(public http: HttpClient) {}

  userRegister(jsonObj): Observable<any> {
    return this.http.post(this.baseUrl + this.userReg, jsonObj, {
      headers: this.headers,
    });
  }
}
