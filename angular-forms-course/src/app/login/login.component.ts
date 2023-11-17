import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  val = {
    email: "abc@abc.com",
    password: "123",
  };

  constructor() {}

  ngOnInit() {}

  onSubmit(loginForm: NgForm, event) {
    console.log("### loginForm = ", loginForm);
    console.log("### event = ", event);

    console.log("### val = ", this.val);
  }

  login() {}
}
