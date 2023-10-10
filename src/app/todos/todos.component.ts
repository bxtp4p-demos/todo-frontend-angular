import { Component, Inject } from '@angular/core';
import { TodoService } from '../todo.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Todo } from '../todo';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

const COLUMNS_SCHEMA = [
  {
      key: "title",
      type: "text",
      label: "Title"
  },
  {
      key: "description",
      type: "text",
      label: "Description"
  },
  {
      key: "completed",
      type: "checkbox",
      label: "Completed"
  },
  {
      key: "isEditing",
      type: "isEditing",
      label: ""
  },
  {
      key: "delete",
      type: "delete",
      label: ""
  }
]

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule
  ]
})
export class TodosComponent {
    todos : Todo[] = [];
    dataSource = this.todos;
    columnsSchema: any = COLUMNS_SCHEMA;
    displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
    isAdding: boolean = false;
  
    constructor(public todoService: TodoService, public dialog: MatDialog) {
    }

    getTodos() {
      this.todoService.getTodos().subscribe(todos => {
        this.dataSource = todos;
      });
    }

    delete(todo: Todo) {
      this.todoService.delete(todo.id).subscribe(()=> {
        this.getTodos();
      });
    }

    update(todo: Todo) {
      this.todoService.update(todo).subscribe(()=> {
        this.getTodos();
      });
    }

    ngOnInit(): void {
      this.getTodos();
    }

    openDialog() {
      this.isAdding = true;
      const dialogRef = this.dialog.open(AddTodoDialog, {
        width: '50%',
        data: {title: '', description: '', completed: false} as Todo
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.isAdding = false;
        if (result) {
          this.todoService.add(result).subscribe(()=> {
            this.getTodos();
          });
        }
      });
    }
}

@Component({
  selector: 'add-todo-dialog',
  templateUrl: 'add-todo-dialog.html',
  standalone: true,
  imports: [
    FormsModule,  
    CommonModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule,
    MatDialogModule
  ]
})
export class AddTodoDialog {

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Todo) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
