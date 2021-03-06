import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CategoryPostsComponent } from "./components/category-posts/category-posts.component";
import { NewsComponent } from "./components/news/news.component";
import { NewStoryComponent } from "./components/new-story/new-story.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { UserPostsComponent } from "./components/user-posts/user-posts.component";
import { PostDetailsResolve } from "./services/post-details-resolve.service";
import { PostsResolve } from './services/posts-resolve.service';
import { EditStoryComponent } from './components/edit-story/edit-story.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SearchPostsComponent } from './components/search-posts/search-posts.component';

const routes: Routes = [
    {
        path: "posts",
        component: NewsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "search-posts",
        component: SearchPostsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "posts/users/:userId",
        component: UserPostsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "posts/categories/:categoryId",
        component: CategoryPostsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "new-story",
        component: NewStoryComponent
    },
    {
        path: "edit-story/:postId",
        component: EditStoryComponent,
        resolve: {
            post: PostDetailsResolve
        }
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "logout",
        component: LogoutComponent
    },
    {
        path: "posts/:postId",
        component: PostDetailsComponent,
        resolve: {
            post: PostDetailsResolve
        }
    },
    {
        path: "**",
        redirectTo: "/posts"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
