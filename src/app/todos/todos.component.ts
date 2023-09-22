import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
    todos : Todo[] = [];
  
    constructor(private todoService: TodoService) {
    }

    getTodos(): void {
      this.todoService.getTodos().subscribe(todos => this.todos = todos);
    }

    ngOnInit(): void {
      this.getTodos();
    }
}
