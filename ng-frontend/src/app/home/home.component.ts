import { Component, ViewChild } from '@angular/core';
import { UsersComponent } from '../users/users.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private AuthService:AuthService,private router: Router){}
  @ViewChild(UsersComponent, { static: false }) UsersComponent!: UsersComponent;

  me: any;
  ngOnInit() {
    if (this.AuthService.isLogIn == false) {
      this.router.navigate(['/login'])
    }
    let userme: any = localStorage.getItem("user");
    this.me = JSON.parse(userme);
  }

  getUsers() {
    this.UsersComponent.getUsers();
  }

}
