import { Component, inject, signal } from '@angular/core';
import { DarkmodeService } from '../services/darkmode.service';
import { TodoStore } from './store/todo.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Todo';
  store = inject(TodoStore);
  newTodoTitle = signal('')
  constructor(protected darkModeService: DarkmodeService) { };
  onSubmit(event: any) {
    if (event.key === "Enter") {
      if (!this.newTodoTitle()) {
        return
      } else {
        this.store.addTodo(this.newTodoTitle());
        this.newTodoTitle.set('')
      }
    }
  }
  onDrop(event: CdkDragDrop<any[]>) {
    const todos = this.store.todos();
    moveItemInArray(todos, event.previousIndex, event.currentIndex);
    this.store.updateTodos(todos);
  }
}
