import { Component, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  constructor(private AuthService: AuthService) { }
  me: any;
  users: any;
  editAlert = {
    visible:false,
    error:0,
    mesaj:""
  };
  pw = true;
  ngOnInit() {
    this.getUsers();
    let userme: any = localStorage.getItem("user");
    this.me = JSON.parse(userme);
  }

  getUsers() {
    this.AuthService.getUsers().subscribe((res: any) => {
      this.users = res.res.sort((a:any, b:any) => a.userid-b.userid);
    })
  }

  delUser(user: any) {
    this.AuthService.delUser(user).subscribe((res: any) => {
      this.getUsers();
    })
  }


  updateUser(useri: any, euserNick: any, euserName: any, euserPassword: any, euserAdmin: any) {
    let user;
    if(euserPassword!=""){
      user = {
        "oldUserNick": useri.usernick,
        "userName": euserName.value,
        "userNick": euserNick.value,
        "userPassword":euserPassword.value,
        "userAdmin": euserAdmin.value
      }
    }else{
      user = {
      "oldUserNick": useri.usernick,
      "userName": euserName.value,
      "userNick": euserNick.value,
      "userAdmin": euserAdmin.value
    }
    }
    
    this.AuthService.updateUser(user).subscribe((res: any) => {

      this.editAlert = {
        visible:true,
        error:(res.mesaj=="Kullanıcı adı kullanılıyor")?1:0,
        mesaj:res.mesaj
      };
    });
  }
}
