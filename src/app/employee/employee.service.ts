import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Employee } from './employee.model';
import { Consts } from '../common/consts';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  document: Employee;
  collectionName: string = Consts.employeeCollectionName;

  constructor(private firestore: AngularFirestore) {     
  }

  getDocuments() {
    const documents = this.firestore.collection(Consts.employeeCollectionName);
    return documents.snapshotChanges();
  }

  resetDocument() {      
    this.document = {
      id: null,
      name: '',
      position: '',
      code: '',
      mobile: ''
    }
  }
}
