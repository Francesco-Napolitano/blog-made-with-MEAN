import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/post/post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addpost',
  imports: [ReactiveFormsModule],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.scss',
})
export class AddpostComponent {
  private formBuilder = inject(FormBuilder);
  private postService = inject(PostService);
  statusMessage: string = '';

  profileForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
    read_time: ['', Validators.required],
    date: ['', Validators.required],
    category: ['', Validators.required],
    author: ['', Validators.required],
  });

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
        .addPost(title, description, image, read_time, date, category, author)
        .subscribe({
          next: (res: any) => {
            this.statusMessage = 'Post added successfully';
            setTimeout(() => {
              this.statusMessage = '';
            }, 5000);
          },
          error: (err) => {
            console.error('Errore inserimento dati', err);
          },
        });
    } else {
      console.log('Errore nel ricevimento dati component.ts');
    }
  }
}
