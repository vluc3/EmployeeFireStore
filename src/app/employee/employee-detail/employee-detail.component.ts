import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(
    private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastrService: ToastrService) {
    }

  ngOnInit() {    
    this.resetForm();
  }
 
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    
    this.service.resetDocument();
  }
 
  onSubmit(form: NgForm) {
    let message: string;
    let value = Object.assign({}, form.value);
    delete value.id;

    if (form.value.id == null) {
      const documents = this.firestore.collection(this.service.collectionName);
      documents.add(value);
      message = 'Created successfully';
    } else {
      const document = this.firestore.doc(this.service.collectionName + '/' + form.value.id);
      document.update(value);
      message = 'Updated successfully';
    }

    this.resetForm(form);
    this.toastrService.success(message, this.service.collectionName);
  }
}
