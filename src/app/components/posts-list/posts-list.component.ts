import { Component, Input } from "@angular/core";

import { Post } from "../../models/post";
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
    selector: "posts-list",
    templateUrl: "posts-list.component.html"
})
export class PostsListComponent {

    @Input() posts: Post[];

    constructor(private _postService: PostService, private _activatedRoute: ActivatedRoute, private _router: Router) {}

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~             HECHO                                                                               |
     |------------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección del autor de un post y navega a la  |
     | dirección correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app. |
     | La ruta a navegar es '/posts/users', pasando como parámetro el identificador del autor.                          |
     |------------------------------------------------------------------------------------------------------------------*/

     mostrarAutor(autor: User) {
         this._postService.getUserPosts(autor.id).subscribe((posts) => {
             this.posts = posts;
         });
         this._router.navigate([`/posts/users/${autor.id}`]);
     }

    /*-----------------------------------------------------------------------------------------------------------------|
     | ~~~ Green Path ~~~          HECHO                                                                               |
     |-----------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección de un post y navega a la dirección |
     | correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app.  La ruta |
     | a navegar es '/posts', pasando como parámetro el identificador del post.                                        |
     |-----------------------------------------------------------------------------------------------------------------*/
 

     mostrarPost(post: Post) {
         this._postService.getPostDetails(post.id).subscribe();
         this._router.navigate([`/posts/${post.id}`]);
     }
}
