import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../shared/models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modifypost',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './modifypost.component.html',
  styleUrl: './modifypost.component.scss',
})
export class ModifypostComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private postService = inject(PostService);
  private routeDynamic = inject(ActivatedRoute);
  postSelected = signal<Post | null>(null);
  id = this.routeDynamic.snapshot.paramMap.get('id');

  profileForm = this.formBuilder.group({
    title: [''],
    description: [''],
    image: [''],
    read_time: [''],
    date: [''],
    category: [''],
    author: [''],
  });
  ngOnInit(): void {
    this.postService.postClicked(this.id);
    this.postService.getPostId().subscribe((post) => {
      console.log(post);
      this.postSelected.set(post);
    });
  }

  onSubmit(): void {
    const { title, description, image, read_time, date, category, author } =
      this.profileForm.value;
    if (
      title &&
      description &&
      image &&
      read_time &&
      date &&
      category &&
      author
    ) {
      this.postService
        .modifyPost(
          title,
          description,
          image,
          read_time,
          date,
          category,
          author
        )
        .subscribe({
          next: (res: any) => {
            console.log("Bravo ce l'hai fatta a modificare");
          },
          error: (err) => {
            console.error('Errore nella modifica dei dati', err);
          },
        });
    } else {
      console.log('Invia', date);
      console.log('Errore nel ricevimento dati component.ts');
    }
  }

  deletePost(): void {
    console.log(sessionStorage.getItem('token'));
    this.postService.deletePost().subscribe((post) => console.log(post));
    console.log(this.postSelected);
  }
}
