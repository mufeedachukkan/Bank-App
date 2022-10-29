import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() custemClick = new EventEmitter();
  deleteAccount(){
    this.custemClick.emit();
  }
  username:any
  accno:any
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    let data:any=localStorage.getItem('database')
    let datab:any=JSON.parse(data)
    var abc:any=localStorage.getItem('accountnumber')
    console.log("ASD",abc)
    this.username=datab[abc]['name']
  } 
  logout(){
    localStorage.removeItem('accountNumber')
  }

}
