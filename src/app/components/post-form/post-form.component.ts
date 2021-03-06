import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import * as faker from "faker";

import { Post } from "../../models/post";
import { User } from "../../models/user";
import { PostService } from '../../services/post.service';

@Component({
    selector: "post-form",
    templateUrl: "post-form.component.html",
    styleUrls: ["post-form.component.css"]
})
export class PostFormComponent implements OnInit {

    nowDatetimeLocal: string;
    publicationDateScheduled: boolean = false;
    isNew: boolean = true;
    rutaFoto: string;

    @Input() postEditing: Post = {
        id: 0,
        title: '',
        intro: '',
        body: '',
        media: '',
        publicationDate: 0,
        categories: [],
        author: {
            id: 0,
            name: '',
            username: '',
            email: '',
            avatar: ''
        },
        likes: 0,
        userLiked: []
    };
    @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();

    constructor(private _postService: PostService) {}

    ngOnInit(): void {
        this._postService.generarRutaFoto().subscribe((ruta) => {
            this.rutaFoto = ruta;
        })
        this.nowDatetimeLocal = this._formatDateToDatetimeLocal(new Date());
        if(this.postEditing.title !== '') {
            this.isNew = false;
        }
        console.log(this.isNew);
    }

    private _formatDateToDatetimeLocal(date: Date) {
        return `
            ${this._fixPad(date.getFullYear(), 4)}-
            ${this._fixPad(date.getMonth() + 1, 2)}-
            ${this._fixPad(date.getDate(), 2)}T
            ${this._fixPad(date.getHours(), 2)}:
            ${this._fixPad(date.getMinutes(), 2)}`.replace(/\n/gi, "").replace(/ /gi, "");
    }

    private _fixPad(datePart: number, length: number): string {
        return `0000${datePart}`.slice(-length);
    }

    private _getPostPublicationDate(formPublicationDate: string): number {
        let publicationDate: Date;
        if (this.publicationDateScheduled) {
            publicationDate = new Date(formPublicationDate);
            if (isNaN(publicationDate.getTime())) {
                publicationDate = new Date();
            }
        }
        else {
            publicationDate = new Date();
        }
        return publicationDate.getTime();
    }

    setScheduling(schedule: boolean): void {
        this.publicationDateScheduled = schedule;
    }

    submitPost(form: FormGroup): void {

        /*-------------------------------------------------------------------------------------------------------------|
         | ~~~ Purple Path ~~~           HECHO                                                                         |
         |-------------------------------------------------------------------------------------------------------------|
         | Aquí no tienes que hacer nada más allá de comprobar que los datos del formulario se recogen correctamente y |
         | tienen 'forma' de Post. Si no es así, al hacer 'Post.fromJson()' se instanciará un post que no se parece en |
         | nada a lo indicado en el formulario. Por tanto, pon especial atención a que los nombres indicados en los    |
         | distintos elementos del formulario se correspondan con las propiedades de la clase Post.                    |
         |-------------------------------------------------------------------------------------------------------------*/

         if(this.isNew) {
            let post: Post = Post.fromJson(form.value);
            post.categories = [];
            // post.media = '';
            post.media = this.rutaFoto;
            post.likes = 0;
            post.userLiked = [];
            // post.author = User.defaultUser();
            post.author = JSON.parse(localStorage.getItem('usuarioActual'));
            post.publicationDate = this._getPostPublicationDate(form.value.publicationDate);
            this.postSubmitted.emit(post);
        }
        else {
            this.postSubmitted.emit(this.postEditing);
        }
        
    }

    rellenarDatos(post: Post) {
        this.postEditing = post;
    }
}
