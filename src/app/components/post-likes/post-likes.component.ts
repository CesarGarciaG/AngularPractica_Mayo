import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.css']
})
export class PostLikesComponent {

  @Input() likes: number;
  @Output() likeBtn: EventEmitter<number> = new EventEmitter();

  constructor() { }

  emitLikes() {
      this.likes++;
      this.likeBtn.emit(this.likes);
  }
}
