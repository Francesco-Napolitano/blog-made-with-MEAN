import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../shared/models/post.model';

@Component({
  selector: 'app-modifypost',
  imports: [ReactiveFormsModule],
  templateUrl: './modifypost.component.html',
  styleUrl: './modifypost.component.scss',
})
export class ModifypostComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private postService = inject(PostService);
  private routeDynamic = inject(ActivatedRoute);
  postSelected = signal<Post | null>(null);
  statusMessage: string = '';
  id = this.routeDynamic.snapshot.paramMap.get('id');

  profileForm = this.formBuilder.group({
    title: [this.postSelected()?.title, Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    read_time: ['', Validators.required],
    date: ['', Validators.required],
    category: ['', Validators.required],
    author: ['', Validators.required],
  });
  ngOnInit(): void {
    this.postService.postClicked(this.id);
    this.postService.getPostId().subscribe((post) => {
      console.log(post);
      this.postSelected.set(post);
    });
  }
  onSubmit() {
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
            this.statusMessage = 'Post modified successfully';
            setTimeout(() => {
              this.statusMessage = '';
            }, 5000);
          },
          error: (err) => {
            console.error('Errore nella modifica dei dati', err);
          },
        });
    } else {
      console.log('Errore nel ricevimento dati component.ts');
    }
  }
}
