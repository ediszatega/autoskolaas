import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { CrudService } from 'src/app/shared/crud.service';

@Component({
  selector: 'app-test-login',
  templateUrl: './test-login.component.html',
  styleUrls: ['./test-login.component.css'],
})
export class TestLoginComponent implements OnInit {
  password: string = '';
  passwords: string[];
  constructor(
    public authService: AuthService,
    public crudService: CrudService,
    public router: Router,
    public toastr: ToastrService
  ) {}
  ngOnInit() {}
  login(): void {
    this.crudService.CheckPassword(this.password).subscribe((isValid) => {
      if (isValid) {
        sessionStorage.setItem('password', JSON.stringify(this.password));
        this.router.navigate(['testovi']);
      } else {
        this.toastr.error('Pogrešna šifra!');
      }
    });
  }
  addPassword(): void {
    this.crudService.AddPassword(this.password);
  }
}
