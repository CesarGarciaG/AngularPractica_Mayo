import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.css']
})
export class PostLikesComponent implements OnInit {

  @Input() likes: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
