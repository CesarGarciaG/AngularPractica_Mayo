import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
    selector: "header-bar",
    templateUrl: "header-bar.component.html",
    styleUrls: ["header-bar.component.css"]
})
export class HeaderBarComponent { 

    usuarioActual: string = '';

    constructor(private _postService: PostService, private _router: Router) {}

    ngOnInit() {
        if(localStorage.getItem('usuarioActual'))
            this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')).name;
    }

    searchPost(value: string) {
        localStorage.setItem('searchValue', `q=${value}`);
        this._router.navigate(['/search-posts']);
    }

    logout() {
        this.usuarioActual = '';
    }
}
