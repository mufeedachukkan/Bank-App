
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
const options={ headers:new HttpHeaders}
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {  
  // amou:any
  // daccount:any
  // dpassword:any
  // wamount:any
  // waccount:any
  // wpassword:any
  transactionForm = this.fb.group({
    amou:['',[Validators.required,Validators.pattern('[0-9]*')]],
    daccount:[''],
    dpassword:['']

  })

  constructor(private db:DatabaseService,private router:Router,private fb:FormBuilder,private http:HttpClient) { }
  

  ngOnInit(): void {
    
  }
  getOptions(){
    var token = JSON.parse(localStorage.getItem('token')||'')
    console.log("token",token)
    let headers=new HttpHeaders() 
    if(token){
      headers=headers.append('access-token',token)
      options.headers=headers
      console.log("headers",headers)
    }
    return options
  }
  deposit(){
    var daccount:any=this.transactionForm.value.daccount
    var dpassword:any=this.transactionForm.value.dpassword
    var amou:any=this.transactionForm.value.amou
    const data={
      accno:daccount,
      pswd:dpassword,
      amount:amou
    }
    return this.http.post('http://localhost:3001/deposit',data,this.getOptions())
    .subscribe((result:any)=>{
      alert(result.message)
      localStorage.setItem('balance', JSON.stringify(result.currentBalance))
    },(result)=>{
      alert(result.error.message)
    })
    // if(daccount in datab){
    //   if(dpassword == datab[daccount]["password"]){
    //     datab[daccount]["balance"]=Number(datab[daccount]['balance'])+Number(amou)
    //     localStorage.setItem("database",JSON.stringify(datab))
    //     alert("balance added")
    //     this.router.navigateByUrl('historypage')
    //   }
    //   else{
    //     alert("incorrect username or password")
    //   }
    // }else{
    //   alert("transaction failed")
    // }
  }
  withdraw(){
    var daccount:any=this.transactionForm.value.daccount
    var dpassword:any=this.transactionForm.value.dpassword
    var amou:any=this.transactionForm.value.amou
    const data={
      accno:daccount,
      pswd:dpassword,
      amount:amou
    }
    return this.http.post('http://localhost:3001/withdraw',data,this.getOptions())
    .subscribe((result:any)=>{
      alert(result.message)
      localStorage.setItem('balance', JSON.stringify(result.currentBalance))
    },(result)=>{
      console.log("error",result.error.message)
      alert(result.error.message)
    })
    // let data:any=localStorage.getItem('database')
    // let datab:any=JSON.parse(data)
    // if(daccount in datab){
    //   if(dpassword == datab[daccount]["password"]){
    //     datab[daccount]["balance"]=Number(datab[daccount]['balance'])-Number(amou)
    //     alert("balance added")
    //     localStorage.setItem("database",JSON.stringify(datab))
    //     this.router.navigateByUrl('historypage')
    //   }
    //   else{
    //     alert("incorrect username or password")
    //   }
    // }else{
    //   alert("transaction failed")
    // }
}
}
