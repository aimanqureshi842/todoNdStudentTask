import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudent } from '../../models/studentinterface';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  @ViewChild('name') stdName!: ElementRef;
  @ViewChild('surName') surName!: ElementRef;
  @ViewChild('age') age!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;
  isInEditMode: boolean = false;
  Edit_id!:string;
  

  studentsArray: Array<Istudent> = [
    {
      studentName: 'Aiman',
      surName: 'Q',
      age: 23,
      email: 'aiman456@gmail.com',
      contact: 5432256677,
      stdId: 'hydvskidh'
    },
    {
      studentName: 'Javeriya',
      surName: 'Q',
      age: 27,
      email: 'javeriya454@gmail.com',
      contact: 76542994798,
      stdId: 'sdj8ehhdk'

    }
  ]
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

  onStdAdd() {
    if (this.stdName.nativeElement.value, this.surName.nativeElement.value, this.age.nativeElement.value, this.email.nativeElement.value, this.contact.nativeElement.value) {
      let stdObj = {
        studentName: this.stdName.nativeElement.value,
        surName: this.surName.nativeElement.value,
        age: +this.age.nativeElement.value,
        email: this.email.nativeElement.value,
        contact: +this.contact.nativeElement.value,
        stdId: this.Uuid()
      }
      console.log(stdObj)
      this.stdName.nativeElement.value = this.surName.nativeElement.value = this.age.nativeElement.value = this.email.nativeElement.value = this.contact.nativeElement.value = ''
      this.studentsArray.push(stdObj)
      this._snackBarService.openSnackbar(`student "${stdObj.studentName} ${stdObj.surName}" added successfully! `)
    } else {
      alert('Please Enter Full Details!!!')
    }
  }
  onStdRemove(studentObj: Istudent) {
    let getConfirm = confirm(`Are you sure you want to delete this student  ${studentObj.studentName} ${studentObj.surName} `)
    if (getConfirm) {

    let findIndex = this.studentsArray.findIndex(std => std.stdId === studentObj.stdId)
    this.studentsArray.splice(findIndex, 1)
    this._snackBarService.openSnackbar(`student " ${studentObj.studentName} ${studentObj.surName}" deleted successfully!`)
    }
  }

  onStdEdit(std: Istudent) {
      this.isInEditMode = true;
      this.stdName.nativeElement.value = std.studentName;
      this.surName.nativeElement.value = std.surName;
      this.age.nativeElement.value = std.age;
      this.email.nativeElement.value = std.email;
      this.contact.nativeElement.value = std.contact;
      this.Edit_id = std.stdId;
      localStorage.setItem("Edit_id", this.Edit_id)
  }
  onStdUpd() {
    this.isInEditMode = false
    let Updated_id = localStorage.getItem("Edit_id")
    if (this.stdName.nativeElement.value, this.surName.nativeElement.value, this.age.nativeElement.value, this.email.nativeElement.value, this.contact.nativeElement.value, Updated_id) {
      let updatedObj = {
        studentName: this.stdName.nativeElement.value,
        surName: this.surName.nativeElement.value,
        age: +this.age.nativeElement.value,
        email: this.email.nativeElement.value,
        contact: +this.contact.nativeElement.value,
        stdId: Updated_id
      }
      // console.log(updatedObj)
      let getIndex = this.studentsArray.findIndex(std => std.stdId === Updated_id)
      this.studentsArray[getIndex] = updatedObj
      this.stdName.nativeElement.value = this.surName.nativeElement.value = this.age.nativeElement.value = this.email.nativeElement.value = this.contact.nativeElement.value = ''
      this._snackBarService.openSnackbar(`student "${updatedObj.studentName} ${updatedObj.surName}" added successfully! `)
      this.Edit_id=''

    }

  }
  onStdCancel() {
    this.isInEditMode = false;
    this.stdName.nativeElement.value = this.surName.nativeElement.value = this.age.nativeElement.value = this.email.nativeElement.value = this.contact.nativeElement.value = ''

  }
}
