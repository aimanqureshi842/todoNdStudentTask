import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from '../../service/snackbar.service';
import { Itodo } from '../../models/todoInterface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todosArray: Array<Itodo> = [
    {
      todoItem: 'javascript',
      todoId: '1234'
    }, {
      todoItem: 'sass',
      todoId: '1235'
    }
  ]
  isInEditMode: boolean = false;
  Edit_id!:string;
  @ViewChild('todoEle') eleRef!: ElementRef
  constructor(private _snackBarService: SnackbarService) { }

  ngOnInit(): void {
  }
  Uuid = () => {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };

  onTodoAdd() {
    if (this.eleRef.nativeElement.value) {
      let todoObj = {
        todoItem: this.eleRef.nativeElement.value,
        todoId: this.Uuid()
      }
      this.todosArray.push(todoObj)
      // console.log(todoObj)
      this.eleRef.nativeElement.value = ''
      this._snackBarService.openSnackbar(`TodoItem "${todoObj.todoItem}" added successfully!!`)
    }else{
      alert('Please add todoItem !')
    }
  }
  onRemove(todoObj: Itodo) {
    let getConfirm=confirm(`Are you sure you want to remove this todo ${todoObj.todoItem}`)
    let findIndex = this.todosArray.findIndex(todo => todo.todoId === todoObj.todoId);
    this.todosArray.splice(findIndex, 1)
    this._snackBarService.openSnackbar(`TodoItem "${todoObj.todoItem}" removed successfully!!!`)

  }
  onEdit(todo: Itodo) {
    this.isInEditMode = true;
    // let getObj=this.todosArray.find(todo=>todo.todoId===todo.todoId)
    this.eleRef.nativeElement.value = todo.todoItem
    this.Edit_id = todo.todoId;
    localStorage.setItem("Edit_id", this.Edit_id)
    // console.log(getObj)
  }
  onUpdate() {
    let Updated_id = localStorage.getItem("Edit_id");
    localStorage.removeItem("Edit_id");
    if (Updated_id) {
      let updatedObj = {
        todoItem: this.eleRef.nativeElement.value,
        todoId: Updated_id
      }
      let getindex = this.todosArray.findIndex(todo => todo.todoId === Updated_id);
      this.todosArray[getindex] = updatedObj
      this.eleRef.nativeElement.value = ''
      this.isInEditMode = false
      this._snackBarService.openSnackbar(`the todoItem " ${updatedObj.todoItem}" updated successfully!!!`)
      this.Edit_id=''
    }
  }
  onCancel() {
    this.isInEditMode = false;
    this.eleRef.nativeElement.value = ''
    this.Edit_id=''

  }

}
