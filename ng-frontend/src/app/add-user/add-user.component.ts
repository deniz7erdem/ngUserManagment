import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  constructor(private AuthService: AuthService, private HomeComponent: HomeComponent) { }
  user = {
    userNick: "",
    userName: "",
    userPassword: "",
    userAdmin: 0
  };
  resm: any;
  styl = 'success'
  addUser() {
    this.AuthService.addUser(this.user).subscribe((res: any) => {
      if (res.hata) {
        this.resm = res.mesaj;
        this.styl = 'danger'
        return;
      }
      this.styl = 'success'
      this.HomeComponent.getUsers();
      this.resm = res.mesaj;
    })
  }
}
