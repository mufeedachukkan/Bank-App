import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  registerForm = this.fb.group({
    //form array
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    Account: ['', [Validators.required, Validators.minLength(3)]],
    pass: [
      '',
      [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$#!%*?&].{8,}')
      ]
    ]
  })
  loginForm = this.fb.group({
    //form array
    accountNumber: ['', [Validators.required, Validators.minLength]],
    password: ['', Validators.required]
  })
  abc: string = "LOGIN PAGE"
  // accountNumber: number = 0

  // password: any = ""
  // Name: string = ""
  database: any = { 1000: { acno: 1000, name: "mufeeda", balance: 10000000, password: 1000 } }
  placeHolder: string = "Enter your account number"
  constructor(
    private router: Router, private db: DatabaseService,
    private fb: FormBuilder,
  ) {
    console.log(this.loginForm);
  }

  ngOnInit(): void {

  }
  // accnoChange(event:any){
  //   console.log(event.target)
  //   this.accountNumber=event.target.value
  // }
  // passwordChange(event:any){
  //   console.log(event)
  //   this.password=event.target.value
  // }

  signup() {
    console.log(this.registerForm)
    console.log("Register Form", this.registerForm)
    var name: any = this.registerForm.value.name
    var pswd: any = this.registerForm.value.pass
    var acno: any = this.registerForm.value.Account
    if (this.registerForm.valid) {
      this.db.register(acno, name, pswd, 0)
        .subscribe((result: any) => {
          console.log("register result",result)
          if (result) {
            alert("registered successfully")
            localStorage.setItem('name', JSON.stringify(result.currentName))
            localStorage.setItem('token', JSON.stringify(result.token))
            localStorage.setItem('balance', JSON.stringify(result.currentBalance))
            localStorage.setItem('accountNumber', JSON.stringify(result.currentAccount))
            this.router.navigateByUrl('dashboard')
          }
          else {
            alert("registration failed")
          }
        })
    } else {
      alert("invalid form")
    }

  }
  login() {
    //let data=this.db.database
    // if (this.loginForm.valid) {
    var account: any = this.loginForm.value.accountNumber;
    var pswd: any = this.loginForm.value.password;
    this.db.signIn(account, pswd)
      .subscribe((result: any) => {
        if (result) {
          console.log("result login",result)
          alert("login successfully")
          localStorage.setItem('name', JSON.stringify(result.currentName))
          localStorage.setItem('token', JSON.stringify(result.token))
          localStorage.setItem('balance', JSON.stringify(result.currentBalance))
          localStorage.setItem('accountNumber', JSON.stringify(result.currentAccount))
          this.router.navigateByUrl('dashboard')
        }
        else {
          alert("Invalid username or password")
        }
      })

  }
  // }
}
