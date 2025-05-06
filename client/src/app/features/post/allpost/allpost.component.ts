import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-allpost',
  imports: [],
  templateUrl: './allpost.component.html',
  styleUrl: './allpost.component.scss',
})
export class AllpostComponent implements OnInit {
  posts = signal({});
  private postService = inject(PostService);
  //è la stessa cosa che scrivere i constructor private ma in questo modo riduci le righe ed è più efficiente

  ngOnInit(): void {
    this.postService
      .getAllPosts()
      .subscribe((allPost) => this.posts.set(allPost));
  }
}
