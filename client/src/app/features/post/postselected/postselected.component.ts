import { Component, inject, OnInit, signal } from '@angular/core';
import { Post } from '../../../shared/models/post.model';
import { PostService } from '../../../services/post/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postselected',
  imports: [],
  templateUrl: './postselected.component.html',
  styleUrl: './postselected.component.scss',
})
export class PostselectedComponent implements OnInit {
  postSelected = signal<Post[]>([]);
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
}
