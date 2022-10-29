import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-historypage',
  templateUrl: './historypage.component.html',
  styleUrls: ['./historypage.component.css']
})
export class HistorypageComponent implements OnInit {
  account:any
  name:any
  balance:any
  transaction:any
  history(){
    const data={
      accno:JSON.parse(localStorage.getItem('accountNumber')||'')
    }
    return this.http.post('http://localhost:3001/history',data)
    .subscribe((result:any)=>{
      this.transaction=result.transaction
    })
  }
  constructor(private db:DatabaseService ,private http:HttpClient) { }

  ngOnInit(): void {    
    this.account=JSON.parse(localStorage.getItem('accountNumber')||'')
    this.history()
    // let data:any=localStorage.getItem('database')
    // let datab:any=JSON.parse(data)
    // console.log(datab)
    // var abc:any=localStorage.getItem('accountnumber')
    // console.log("ASD",abc)
    // this.account=datab[abc]['acno']
    // this.name=datab[abc]['name']
    // this.balance=datab[abc]['balance']
  }
  
}
