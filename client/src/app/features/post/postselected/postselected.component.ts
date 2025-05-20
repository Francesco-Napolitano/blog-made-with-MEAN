import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../../shared/models/post.model';

@Component({
  selector: 'app-postselected',
  imports: [RouterLink],
  templateUrl: './postselected.component.html',
  styleUrl: './postselected.component.scss',
})
export class PostselectedComponent implements OnInit {
  postSelected = signal<Post | null>(null);
  private postService = inject(PostService);
  private routeDynamic = inject(ActivatedRoute);
  id = this.routeDynamic.snapshot.paramMap.get('id');

  ngOnInit(): any {
    this.postService.postClicked(this.id);
    this.postService.getPostId().subscribe((post) => {
      console.log(post);
      this.postSelected.set(post);
    });
  }

  deletePost() {
    console.log(sessionStorage.getItem('token'));
    this.postService.deletePost().subscribe((post) => console.log(post));
    console.log(this.postSelected);
  }
}
