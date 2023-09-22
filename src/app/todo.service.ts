import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    const source = this.http.get<string[]>(this.todosUrl);
    
    const todos = source.pipe(map(response => {
      return response.map((res, i) => {
        return JSON.parse(res);
      })
    }));
    
    return todos;
  }
}
