import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { TodoItem } from "./todo.model";
import { computed, effect } from "@angular/core";

type TodoFilter = 'all' | 'active' | 'completed';

type TodoState = {
    todos: TodoItem[];
    filter: TodoFilter
}

const initialState: TodoState = {
    todos: [
        { id: '1', title: 'Complete online JavaScript course', completed: true },
        { id: '2', title: 'Jog around the park 3x', completed: false },
        { id: '3', title: '10 minutes mediation', completed: false },
        { id: '4', title: 'Read for 1 hour', completed: false },
        { id: '5', title: 'Pick up groceries', completed: false },
        { id: '6', title: 'Complete Todo App on Frontend Mentor', completed: false },
    ],
    filter: 'all'
}

const todoStoreKey = 'todos'

export const TodoStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ todos, filter }) => ({
        completedTodos: computed(() => todos().filter(todoItem => {
            return todoItem.completed;
        })),
        filteredTodos: computed(() => {
            switch (filter()) {
                case 'completed':
                    return todos().filter((todoItem) => {
                        return todoItem.completed
                    });
                case 'active':
                    return todos().filter((todoItem) => {
                        return !todoItem.completed
                    });
                default:
                    return todos();
            }
        })
    })),
    withMethods((store) => ({
        addTodo(newTodoTitle: string) {
            patchState(store, {
                todos: [{
                    title: newTodoTitle,
                    id: Date.now().toString(),
                    completed: false
                },
                ...store.todos()
                ]
            })
        },
        deleteTodo(todoId: string) {
            patchState(store, {
                todos: store.todos().filter((todoItem) => todoItem.id !== todoId)
            })
        },
        clearCompleted() {
            patchState(store, {
                todos: store.todos().filter((todoItem) => !todoItem.completed),
            })
        },
        updateTodos(updatedTodos: any[]) {
            patchState(store, {
                todos: updatedTodos,
            });
        },
        toogleTodo(todoId: string) {
            patchState(store, {
                todos: store.todos().map(todoItem => {
                    if (todoItem.id === todoId) {
                        return {
                            ...todoItem,
                            completed: !todoItem.completed
                        }
                    }
                    return todoItem;
                })
            })
        },
        changeFilter(filter: TodoFilter) {
            patchState(store, {
                filter
            })
        }
    })),
    withHooks({
        onInit(store) {
            const todoFromStorage = JSON.parse(
                localStorage.getItem(todoStoreKey) || '[]'
            );
            if (todoFromStorage.length) {
                patchState(store, {
                    todos: todoFromStorage
                })
            }
            effect(() => {
                const state = getState(store);
                localStorage.setItem(
                    todoStoreKey,
                    JSON.stringify(state.todos)
                )
            })

        }
    })

)