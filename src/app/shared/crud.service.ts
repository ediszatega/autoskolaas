import { Injectable } from '@angular/core';
import { Password } from './password';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  passwordsRef: AngularFireList<any>;
  passwordRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  AddPassword(pass: string) {
    this.passwordsRef.push({
      password: pass,
    });
  }
  GetPassword(id: string) {
    this.passwordRef = this.db.object('passwords/' + id);
    return this.passwordRef;
  }
  GetPasswordList() {
    this.passwordsRef = this.db.list('passwords');
    return this.passwordsRef;
  }
  UpdatePassword(pass: Password) {
    this.passwordRef = this.db.object('passwords/' + pass.$key);
    this.passwordRef.update({
      password: pass.password,
    });
  }
  DeletePassword(id: string) {
    this.passwordRef = this.db.object('passwords/' + id);
    this.passwordRef.remove();
  }
  CheckPassword(password: string): Observable<boolean> {
    this.passwordsRef = this.db.list('passwords');
    return this.passwordsRef.valueChanges().pipe(
      map((passwords) => {
        const passwordsList = passwords.map((p) => p.password);
        return passwordsList.includes(password);
      })
    );
  }
}
