import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  documents: Employee[];

  constructor(
    private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastrService: ToastrService) {
    }

ngOnInit() {
    this.service.getDocuments().subscribe(documents => {
      this.documents = documents.map(document => {
        return {
          id: document.payload.doc.id,
          ...document.payload.doc.data()
        } as Employee;
      })
    });
  }
 
  onEdit(document: Employee) {
    this.service.document = Object.assign({}, document);
  }
 
  onDelete(id: string) {
    if (confirm('Are you sure to delete this document ?')) {
      const document = this.firestore.doc(this.service.collectionName + '/' + id);
      document.delete();
      this.service.resetDocument();
      this.toastrService.warning('Deleted successfully', this.service.collectionName);
    }
  }  
}
