import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  baseUrl: string = "http://localhost:3000/";

  headers: any = new HttpHeaders({ "Content-Type": "application/json" });
  userReg: string = "register";
  transactions: string = "transactions";

  constructor(public http: HttpClient, public toastr: ToastrService,) { }

  userRegister(jsonObj): Observable<any> {
    return this.http.post(this.baseUrl + this.userReg, jsonObj, {
      headers: this.headers,
    });
  }

  getUserById(jsonObj): Observable<any> {
    return this.http.get(this.baseUrl + this.userReg + jsonObj);
  }

  getTransactions(jsonObj): Observable<any> {
    return this.http.get(this.baseUrl + this.transactions + jsonObj);
  }

  createTransaction(jsonObj): Observable<any> {
    return this.http.post(this.baseUrl + this.transactions, jsonObj, {
      headers: this.headers,
    });
  }

  getTransactionsById(jsonObj): Observable<any> {
    return this.http.get(this.baseUrl + this.transactions + jsonObj);
  }
}
