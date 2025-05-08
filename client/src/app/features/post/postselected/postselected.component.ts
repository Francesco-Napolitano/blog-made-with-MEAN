import { Component, inject, OnInit, signal } from '@angular/core';
import { Post } from '../../../shared/models/post.model';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-postselected',
  imports: [],
  templateUrl: './postselected.component.html',
  styleUrl: './postselected.component.scss',
})
export class PostselectedComponent implements OnInit {
  postSelected = signal<Post[]>([]);
  private postService = inject(PostService);
  ngOnInit(): void {
    this.postService.getPostId().subscribe((post) => {
      console.log(post);
      this.postSelected.set(post);
    });
  }
}
