import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  isLinear = true;
  userForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder,
    public service: HttpService,
    public routeTo: Router
  ) {
    this.createForm();
  }
  ngOnit() { }

  createForm() {
    this.userForm = this.fb.group({
      userName: ["", Validators.required],
      emailID: [
        "",
        Validators.compose([Validators.email, Validators.required]),
      ],
      mobile: [
        "",
        Validators.compose([Validators.required, Validators.min(10)]),
      ],
    });

    this.passwordForm = this.fb.group({
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

  /**Method for the user Registration */
  register() {
    if (this.userForm.valid && this.passwordForm.valid) {
      if (
        this.passwordForm.value.newPassword ==
        this.passwordForm.value.confPassWord
      ) {
        let jsonObj = {
          name: this.userForm.value.userName,
          email: this.userForm.value.emailID,
          mobile: this.userForm.value.mobile,
          password: this.passwordForm.value.confPassWord,
        };
        this.service.userRegister(jsonObj).subscribe((resp) => {
          console.log(resp);
          this.service.toastr.success("User registered successfully");
          this.routeTo.navigateByUrl("authorize/login");
        });
      } else {
        this.service.toastr.error("New password and confirm password must be same");
      }
    } else {
      this.service.toastr.error("Please fill out all the details!");
    }
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
