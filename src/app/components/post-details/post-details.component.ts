import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from "../../models/post";
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { PostService } from '../../services/post.service';

@Component({
    templateUrl: "post-details.component.html",
    styleUrls: ["post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {

    post: Post;
    usuario: User;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _postService: PostService) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        if(localStorage.getItem('usuarioActual'))
            this.usuario = JSON.parse(localStorage.getItem('usuarioActual'));
        else this.usuario = {
            id: 0,
            name: '',
            username: '',
            email: '',
            avatar: ''
        };
        window.scrollTo(0, 0);
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    /*---------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~              HECHO                                                                           |
     |---------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts del autor indicado. Recuerda que    |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/users', |
     | pasando como parámetro el identificador del autor.                                                            |
     |---------------------------------------------------------------------------------------------------------------*/

     navegarAutor(autor: User) {
         this._router.navigate([`/posts/users/${autor.id}`]);
     }

    /*--------------------------------------------------------------------------------------------------------------------|
     | ~~~ Yellow Path ~~~           HECHO                                                                                |
     |--------------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts de la categoría indicada. Recuerda que   |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/categories', |
     | pasando como parámetro el identificador de la categoría.                                                           |
     |--------------------------------------------------------------------------------------------------------------------*/

     navegarCat(categoria: Category) {
         this._router.navigate([`/posts/categories/${categoria.id}`]);
     }

     navegarEdit(post: Post) {
        this._router.navigate([`/edit-story/${post.id}`]);
        console.log(post);
     }

     guardarLikes(likes: number) {
         this.post.likes = likes;
         this.post.userLiked.push(JSON.parse(localStorage.getItem('usuarioActual')).id);
         console.log(this.post);
         this._postService.editPost(this.post).subscribe();
     }

}
