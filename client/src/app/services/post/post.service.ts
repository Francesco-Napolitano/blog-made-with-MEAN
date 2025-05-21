import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { Post } from '../../shared/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:5200';
  http = inject(HttpClient);
  idSelected = signal<string>('');
  token = sessionStorage.getItem('token');

  getAllPosts() {
    return this.http.get<Post[]>(`${this.url}/post`);
  }

  postClicked(id: any) {
    this.idSelected.set(id);
    console.log(this.idSelected());
  }

  getPostId() {
    return this.http.get<Post>(`${this.url}/post/${this.idSelected()}`);
  }

  deletePost() {
    return this.http.delete(`${this.url}/post/${this.idSelected()}/delete`);
  }

  addPost(
    title: string,
    description: string,
    image: string,
    read_time: string,
    date: string,
    category: string,
    author: string
  ) {
    return this.http.post(`${this.url}/post/add`, {
      title,
      description,
      image,
      read_time,
      date,
      category,
      author,
    });
  }

  modifyPost(
    title: string,
    description: string,
    image: string,
    read_time: string,
    date: string,
    category: string,
    author: string
  ) {
    return this.http.put(`${this.url}/:_id/update`, {
      title,
      description,
      image,
      read_time,
      date,
      category,
      author,
    });
  }
}
