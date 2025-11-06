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
  @ViewChild('contact') contact!: ElementRef
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
       Uuid = ()=> {
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
        stdId:this.Uuid()
      }
      console.log(stdObj)
      this.stdName.nativeElement.value = this.surName.nativeElement.value = this.age.nativeElement.value = this.email.nativeElement.value = this.contact.nativeElement.value = ''
      this.studentsArray.push(stdObj)
      this._snackBarService.openSnackbar(`student "${stdObj.studentName} ${stdObj.surName}" added successfully! `)
    }
  }
  onStdRemove(studentObj: Istudent) {
    let findIndex = this.studentsArray.findIndex(std =>std.stdId===studentObj.stdId)
          this.studentsArray.splice(findIndex,1)
          this._snackBarService.openSnackbar(`student " ${studentObj.studentName} ${studentObj.surName}" deleted successfully!`)
  }


}
