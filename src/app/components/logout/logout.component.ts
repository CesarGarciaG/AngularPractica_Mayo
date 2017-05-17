import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
      localStorage.removeItem('usuarioActual');
      this._router.navigate(['/']);
  }

}
