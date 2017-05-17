import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _router: Router) { }

  defaultLogin() {
    console.log(localStorage.getItem('usuarioActual'));
    localStorage.setItem('usuarioActual', JSON.stringify(User.defaultUser()));
    // debugger;
    console.log(localStorage.getItem('usuarioActual'));
    console.log(JSON.parse(localStorage.getItem('usuarioActual')));
    this._router.navigate(['/']);
  }

}
