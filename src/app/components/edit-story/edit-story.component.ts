import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.css']
})
export class EditStoryComponent implements OnDestroy {

  private _postSubscription: Subscription;

  post: Post;

    constructor(
        private _postService: PostService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        console.log(this.post);
    }

    ngOnDestroy(): void {
        this._unsubscribePostEdition();
    }

    editPost(post: Post): void {
        this._unsubscribePostEdition();
        this._postSubscription = this._postService.editPost(post).subscribe(() => this._router.navigate(["/"]));
    }

    private _unsubscribePostEdition(): void {
        if (this._postSubscription) {
            this._postSubscription.unsubscribe();
        }
    }

    

}
