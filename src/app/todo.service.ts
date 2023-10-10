import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'http://localhost:8080/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Todo[]>(this.todosUrl, { headers: headers });
  }

  add(todo: Todo): Observable<Todo> {
    console.log(`adding: ${todo.title}`);
    return this.http.post<Todo>(this.todosUrl, todo);
  }

  update(todo: Todo): Observable<{}> {
    console.log(`updating: ${todo.id}`);
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo);
  }

  delete(id: number): Observable<{}> {
    console.log(`deleting: ${id}`);
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url);
  }
}
