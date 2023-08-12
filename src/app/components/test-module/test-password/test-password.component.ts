import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { CrudService } from 'src/app/shared/crud.service';
import { Password } from 'src/app/shared/password';

@Component({
  selector: 'app-test-password',
  templateUrl: './test-password.component.html',
  styleUrls: ['./test-password.component.css'],
})
export class TestPasswordComponent {
  currentPassword: Password;
  newPassword: string = '';

  constructor(public crudService: CrudService, authService: AuthService) {
    const passwords = crudService.GetPasswordList();
    passwords.snapshotChanges().subscribe((list) => {
      this.currentPassword = {
        $key: list[0].key,
        password: list[0].payload.val().password,
      };
      console.log(this.currentPassword);
    });
  }

  changePassword() {
    this.currentPassword.password = this.newPassword;
    this.crudService.UpdatePassword(this.currentPassword);
  }
}
