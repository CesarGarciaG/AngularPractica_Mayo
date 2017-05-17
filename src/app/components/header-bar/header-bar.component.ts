import { Component, OnInit } from '@angular/core';

@Component({
    selector: "header-bar",
    templateUrl: "header-bar.component.html",
    styleUrls: ["header-bar.component.css"]
})
export class HeaderBarComponent { 

    usuarioActual: string = '';

    ngOnInit() {
        if(localStorage.getItem('usuarioActual'))
            this.usuarioActual = localStorage.getItem('usuarioActual');
    }

    logout() {
        this.usuarioActual = '';
    }
}
