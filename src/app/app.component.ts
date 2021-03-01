import { Component } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import * as SecureLS from "secure-ls";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "mcbanking";
  loginState: boolean = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event["url"] == "/authorize/login" ||
          event["url"] == "/authorize/registration"
        ) {
          this.loginState = false;
        } else {
          this.loginState = true;
        }
      }
    });
  }

  ngOnInit() {
    // var ls = new SecureLS();
    // this.loginState = ls.get("loginState").data;
  }
}
