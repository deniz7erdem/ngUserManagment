import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router, private AuthService: AuthService) { }
  user = {
    userNick: "",
    userPassword: ""
  }
  res: any;
  err: boolean = false;

  ngOnInit(): void {
    if (this.AuthService.isLogIn == true) {
      this.router.navigate(['/home'])
    }
  }

  login() {
    const userNick = new FormControl(this.user.userNick.length, Validators.required);
    const userPassword = new FormControl(this.user.userPassword.length, Validators.required);

    if (userNick.errors || userPassword.errors) {
      return
    }
    this.AuthService.login(this.user).subscribe((res) => {
      if (res.baslik == "Auth Success") {
        localStorage.setItem("TOKEN", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate(['/home']);
      } else {
        this.err = true;
        this.res = res.mesaj;
      }
    });
  }
}
