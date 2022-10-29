import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  database: any = { 1000: { acno: 1000, name: "mufeeda", balance: 1000, password: 1000 } }

  constructor( private http:HttpClient) { }
  register(acno: any, name: any, password: any,balance:any) {
    const data={
      accno:acno,
      name,
      password
    }
    return this.http.post('http://localhost:3001/register',data)
  }
  signIn(accno: any, password: any) {
    const data={
      accno:accno,
      password:password
    }
    return this.http.post('http://localhost:3001/login',data)
    // if ("database" in localStorage) {
    //   let data: any = localStorage.getItem('database')
    //   let database: any = JSON.parse(data)
    //   if (accountNo in database) {
    //     if (password == database[accountNo].password) {
    //       localStorage.setItem('accountnumber', accountNo)
    //       return true
    //     }
    //     else {
    //       return false
    //     }
    //   } else {
    //     return false
    //   }
    // }else{
    //   if (accountNo in this.database) {
    //     if (password == this.database[accountNo].password) {
    //       localStorage.setItem('accountnumber', accountNo)
    //       localStorage.setItem('database', JSON.stringify(this.database))
    //       return true
    //     }
    //     else {
    //       return false
    //     }
    //   } else {
    //     return false
    //   }
    // }
    }
    deleteAccount(accno:any){
      return this.http.delete('http://localhost:3001/deleteAccount/'+accno)
    }    
}

