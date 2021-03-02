import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  today: Date;
  greetings: string;
  menuPosition: number = 0;
  userName: string;
  localStorage: any;

  constructor(public routeTo: Router, public service: HttpService) {
    this.getAllTransactions();
    this.localStorage = new SecureLS();
    var userDetails = this.localStorage.get("userName").data;
    if (userDetails) {
      this.userName = userDetails
    }
  }

  ngOnInit() {
  }


  /**Method to logout  */
  userLogout() {
    localStorage.clear();
    this.routeTo.navigateByUrl("authorize/login");
  }

  /** Event when the menu button is tapped */
  onclickMenu(index) {
    this.menuPosition = index;
  }

  /**Get all user transactions */
  getAllTransactions() {
    this.service.getTransactions('').subscribe((resp) => {
      console.log(resp);
      this.localStorage.set("transactions", { data: resp });
    })
  }
}
