import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../shared/models/post.model';

@Component({
  selector: 'app-allpost',
  imports: [],
  templateUrl: './allpost.component.html',
  styleUrl: './allpost.component.scss',
})
export class AllpostComponent implements OnInit {
  posts = signal<Post[]>([]); //il problema che mi dava era dovuto al fatto che se non specifici <any> il compilatore crede che il signal sia di tipo
  //                        never [] cioè un array che non può contenere nulla
  private postService = inject(PostService); //è la stessa cosa che scrivere i constructor private ma in questo modo riduci le righe del codice

  ngOnInit(): any {
    this.postService.getAllPosts().subscribe((allPost) => {
      console.log(allPost);
      this.posts.set(allPost);
    });
  }
}
