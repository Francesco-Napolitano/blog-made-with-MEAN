import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:5200';
  http = inject(HttpClient);

  constructor(private httpClient: HttpClient) {}

  getAllPosts() {
    return this.http.get(`${this.url}/post`);
  }

  getPostId(id: string) {
    return this.http.get(`${this.url}/post/${id}`);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.url}/post/${id}/delete`);
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
