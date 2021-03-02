import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as SecureLS from "secure-ls";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  isLinear = true;
  userForm: FormGroup;
  localStorage: any;
  userDetails: any = [];

  constructor(private fb: FormBuilder,
    public service: HttpService,
    public routeTo: Router
  ) {
    this.createForm();
  }
  ngOnit() {
    this.localStorage = new SecureLS();
    var userDetails = this.localStorage.get("userDetails").data;
    if (userDetails) {
      this.userDetails = userDetails;
    }
  }

  createForm() {
    this.userForm = this.fb.group({
      userName: ["", Validators.required],
      emailID: [
        "",
        Validators.compose([Validators.email, Validators.required]),
      ],
      newPassword: [
        "",
        Validators.compose([Validators.required, Validators.min(6)]),
      ],
      confPassWord: [
        "",
        Validators.compose([Validators.required, Validators.min(6)]),
      ],

    });

  }

  /**Method for the user Registration by validating if already exist */
  register() {
    debugger
    if (this.userForm.valid) {
      if (
        this.userForm.value.newPassword ==
        this.userForm.value.confPassWord
      ) {
        if (this.userDetails.length > 0) {
          var userId = this.userDetails.find(element => element['name'] == this.userForm.value.username);
          if (userId['name'] != this.userForm.value.username) {
            this.createUser();
          } else {
            this.service.toastr.error("User Already registered!");
          }
        } else {
          this.createUser();
        }
      } else {
        this.service.toastr.error("New password and confirm password must be same");
      }
    } else {
      this.service.toastr.error("Please fill out all the details!");
    }
  }

  /**Method to add user to the server */
  createUser() {
    let jsonObj = {
      name: this.userForm.value.userName,
      email: this.userForm.value.emailID,
      password: this.userForm.value.confPassWord,
    };
    this.service.userRegister(jsonObj).subscribe((resp) => {
      console.log(resp);
      this.service.toastr.success("User registered successfully");
      this.routeTo.navigateByUrl("authorize/login");
    });
  }

  /**Method to restrict phone number */
  onKeyPressQty(params: any) {
    if (params.key === "Backspace" || params.key === "Tab" || params.key === "Tab" || params.key === "Delete" || params.key === "ArrowLeft" || params.key === "ArrowRight" || params.key === "End" || params.key === "Home" || params.key === "Enter" || params.key == "Alt" || params.key == "ArrowUp" || params.key == "ArrowDown" || params.key == "ArrowRight" || params.key == "ArrowLeft") {
      return true;

    } else if (!this.isKeyPressedNumeric(params)) {
      return false;
    }
  }

  private isKeyPressedNumeric(event: any): boolean {
    var inputVal = <HTMLInputElement>document.getElementById("phno");
    var input = inputVal.value;
    input = input + event.key;
    if (input.length >= 0) {
      var txtVal: any = input;
    }
    return /^((\d{1,10})|(\.{1}\d{1,4}))$/.test(txtVal);
  }

}
