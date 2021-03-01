import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginError = "";

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public routeTo: Router,
    public dialog: MatDialog,
    public fbuilder: FormBuilder,
    private elementRef: ElementRef
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit() {
    // this.appComp.loginState = false;
  }

  /**Method to the user login */
  submitLogin() {
    this.loginError = "";

    // this.appComp.loginState = true;
    var ls = new SecureLS();
    ls.set("loginState", { data: true });
    this.routeTo.navigateByUrl("/dashboard/dashboard");
    // this.routeTo.navigateByUrl("/transaction-history/transaction-history");
  }

  /**Method to create the new user /Registration */
  newUser() {
    this.routeTo.navigateByUrl("authorize/registration");
  }
}
