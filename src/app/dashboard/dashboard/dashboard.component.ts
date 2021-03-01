import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  menuPosition: number = 0;
  constructor(public routeTo: Router) {}

  ngOnInit() {
    // this.appComp.loginState = true;
  }

  // /** Event when the menu button is tapped */
  // onclickMenu(index) {
  //   this.menuPosition = index;
  // }
}
