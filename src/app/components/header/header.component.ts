import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { AppComponent } from "src/app/app.component";
import { LoginComponent } from "src/app/authorize/login/login.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  today: Date;
  greetings: string;
  userName: string = "Kalai";

  constructor(public routeTo: Router, private appComp: AppComponent) {}

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
    this.appComp.loginState = false;
    // var ls = new SecureLS();
    // this.appComp.loginState = false;
    // ls.set("loginState", { data: this.appComp.loginState });
    this.routeTo.navigateByUrl("authorize/login");
  }
}
