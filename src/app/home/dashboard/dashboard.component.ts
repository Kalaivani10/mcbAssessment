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

  constructor(public routeTo: Router, public service: HttpService) {
    this.getAllTransactions();
    var ls = new SecureLS();
    var userDetails = ls.get("userName").data;
    if (userDetails) {
      this.userName = userDetails
    }
  }

  ngOnInit() {
    this.systemTime();
  }

  /**** For Greeting the User based on Time ********/
  systemTime() {
    this.today = new Date();
    let currentGreeting = this.today.getHours();

    if (currentGreeting < 12) {
      this.greetings = "Good Morning";
    } else if (currentGreeting < 18) {
      this.greetings = "Good Afternoon";
    } else {
      this.greetings = "Good Evening";
    }
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
      var ls = new SecureLS();
      ls.set("transactions", { data: resp });
    })
  }
}
