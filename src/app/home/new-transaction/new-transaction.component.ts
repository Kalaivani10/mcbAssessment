import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';
import { HttpService } from 'src/app/http.service';

export interface Currency {
  value: string;
}

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent {
  isLinear = false;
  referenceForm: FormGroup;
  customerDetailForm: FormGroup;
  transactionForm: FormGroup;
  paymentForm: FormGroup;
  transactions: any;
  currencys: Currency[] = [
    { value: 'AED', },
    { value: 'EUR', },
    { value: 'CHF', },
    { value: 'MUR', },
    { value: 'USD', }
  ];

  constructor(private formbuilder: FormBuilder, public routeTo: Router, public service: HttpService) {
    this.createForm();
    var ls = new SecureLS();
    this.transactions = ls.get("transactions").data;
    this.getReference();

  }
  ngOnInit() {
  }

  createForm() {
    this.referenceForm = this.formbuilder.group({
      referenceNo: ["", Validators.required],
      custNo: ["", Validators.required],
    });
    this.customerDetailForm = this.formbuilder.group({
      custName: ["", Validators.required],
      custAddress: ["", Validators.required],
      mobile: ["", Validators.required],
    });
    this.paymentForm = this.formbuilder.group({
      payment: [
        "", Validators.required
      ]
    });
    this.transactionForm = this.formbuilder.group({
      amount: [
        "",
        Validators.compose([Validators.required, Validators.min(10)]),
      ],
      currency: ["", Validators.required],
      bank: ["", Validators.required],
      bAccountNo: ["", Validators.required],
    });
  }


  /**Method to create new registration */
  createTransaction() {
    if (this.referenceForm.valid && this.transactionForm.valid && this.paymentForm.valid && this.customerDetailForm.valid) {
      let jsonObj = {
        "reference": this.referenceForm.value.referenceNo,
        "custno": this.customerDetailForm.value.custNo,
        "custname": this.customerDetailForm.value.custName,
        "mobile": this.customerDetailForm.value.mobile,
        "address": this.customerDetailForm.value.custAddress,
        "amount": this.transactionForm.value.amount,
        "currency": this.transactionForm.value.currency,
        "bank": this.transactionForm.value.bank,
        "accountno": this.transactionForm.value.bAccountNo,
        "payment": this.paymentForm.value.payment,
      }
      this.service.createTransaction(jsonObj).subscribe((resp) => {
        this.service.toastr.success("Transaction submitted successfully");
      })
    } else {
      this.service.toastr.error("Please fill all the details");
    }
  }


  /**Method to generate the reference number */
  getReference() {
    var randomNumber: number = 0;
    if (this.transactions) {
      if (this.transactions.length > 0) {
        randomNumber = this.transactions.length + 1;
      } else {
        randomNumber = 1;
      }
    } else {
      randomNumber = 1;
    }
    var num;
    num = parseInt(Math.floor(Math.random() * 100000).toString().substring(0, 3))
    num = "" + num + randomNumber;

    //Get yyyy MM dd
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var dateFormat = '' + y + (m < 10 ? '0' : '') + m + (d < 10 ? '0' : '') + d;
    var referenceNo = "CUS" + dateFormat + num;
    this.referenceForm.setValue({
      referenceNo: referenceNo,
      custNo: ''
    })
  }

  /**Method to check the availability of the customer */
  checkCustomer() {
    if (this.referenceForm.valid) {
      var custNo = this.referenceForm.value.custNo;
      var jsonObj = "?transactions.accountno=" + custNo;
      this.service.getTransactionsById(jsonObj).subscribe((resp) => {
        console.log(resp);
        if (resp) {
          if (resp.length > 0) {
            var custDetails = resp.find(element => element['accountno'] == custNo);
            this.customerDetailForm.reset();
            if (custDetails) {
              this.customerDetailForm.setValue({
                custName: custDetails['custname'],
                mobile: custDetails['mobile'],
                custAddress: custDetails['address']
              })
            }
          }
        }
      })
    } else {
      this.service.toastr.error("Please fill all the details!")
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
