import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

constructor(private AuthService:AuthService){}
me:any;
ngOnInit() {

  let userme:any=localStorage.getItem("user");
  this.me=JSON.parse(userme);
  
}
  logout(){
    this.AuthService.logout();
  }
}
