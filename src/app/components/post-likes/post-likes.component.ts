import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.css']
})
export class PostLikesComponent implements OnInit {

  @Input() likes: number;
  @Input() userLiked: number[];
  @Output() likeBtn: EventEmitter<number> = new EventEmitter();

  isLiked: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isLiked = this.checkLiked();
  }

  emitLikes() {
      this.likes++;
      this.likeBtn.emit(this.likes);
      this.isLiked = this.checkLiked();
  }

  checkLiked(): boolean {
      let isLiked: boolean = false;
      this.userLiked.forEach((id: number) => {
          if(id === JSON.parse(localStorage.getItem('usuarioActual')).id)
              isLiked = true;
      });
      return isLiked;
  }
}
