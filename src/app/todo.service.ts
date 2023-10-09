import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'http://localhost:8080/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('X-Custom-Header', 'test123');
    const source = this.http.get<string[]>(this.todosUrl, { headers: headers });
    
    const todos = source.pipe(map(response => {
      return response.map((res, i) => {
        return JSON.parse(res);
      })
    }));
    
    return todos;
  }
}
