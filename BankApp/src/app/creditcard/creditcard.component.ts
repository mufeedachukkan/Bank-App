import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {
 
  database: any = {

  }
  dummyArray: any = []
  creditForm=this.fb.group({
    //formarray    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    name: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno: ['',[Validators.required]],
    pan: ['',[Validators.required]],
    salary: ['',[Validators.required]],
    aadhar: ['',[Validators.required]]
  })

  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  credit() {
    var name:any=this.creditForm.value.name
    var acno:any=this.creditForm.value.acno
    var pan:any=this.creditForm.value.pan
    var salary:any=this.creditForm.value.salary
    var aadhar:any=this.creditForm.value.aadhar
    if (salary >= 2500) {
      this.database[acno] = {
        name: name,
        acno: acno,
        pan: pan,
        aadhar:aadhar,
        salary: salary
      }
      this.dummyArray.push(this.database[acno])
    } else {
      alert("not applicable")
    }
  }
}
