import { Injectable } from '@angular/core';
import { Account } from './account';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  accountsRef: AngularFireList<any>;
  accountRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create Account
  AddAccount(account: Account) {
    this.accountsRef.push({
      firstName: account.username,
      lastName: account.password,
    });
  }
  // Fetch Single Account Object
  GetAccount(id: string) {
    this.accountRef = this.db.object('profili/' + id);
    return this.accountRef;
  }
  // Fetch Accounts List
  GetAccountsList() {
    this.accountsRef = this.db.list('profili');
    return this.accountsRef;
  }
  // Update Account Object
  UpdateAccount(account: Account) {
    this.accountRef.update({
      username: account.username,
      password: account.password,
    });
  }
  // Delete Account Object
  DeleteAccount(id: string) {
    this.accountRef = this.db.object('profili/' + id);
    this.accountRef.remove();
  }
}
