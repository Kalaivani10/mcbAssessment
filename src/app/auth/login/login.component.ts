import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginError = "";
  userDetals: any = [];

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public routeTo: Router,
    public dialog: MatDialog,
    public fbuilder: FormBuilder,
    private elementRef: ElementRef,
    public service: HttpService
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
    var ls = new SecureLS();
    var userDetails = ls.get("userDetails").data;
    if (userDetails) {
      if (userDetails.length > 0) {
        this.userDetals = userDetails;
      } else {
        this.getAuthDetails();
      }
    } else {
      this.getAuthDetails();
    }
  }


  /**Method to get the user based on the entered user id */
  getAuthDetails() {
    this.service.getUserById('').subscribe((resp) => {
      this.userDetals = resp;
      var ls = new SecureLS();
      ls.set("userDetails", { data: this.userDetals });
    })

  }


  /**Method to the user login */
  submitLogin() {
    if (this.userDetals.length > 0) {
      var userId = this.userDetals.find(element => element['name'] == this.loginForm.value.username);
      if (userId) {
        if (userId['password'] == this.loginForm.value.password) {
          var ls = new SecureLS();
          ls.set("userName", { data: userId['name'] });
          this.routeTo.navigateByUrl("/home/dashboard");
        } else {
          this.loginError = "Incorrect Password";
        }
      } else {
        this.loginError = "Invalid User";
      }
    } else {
      this.service.toastr.error("Please register to continue");
    }
  }

  /**Method to create the new user /Registration */
  newUser() {
    this.routeTo.navigateByUrl("authorize/registration");
  }
}
