import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../model/auth.service';

import { User } from '../../model/user.model';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit
{
  public user: User;
  public errorMessage: string;
  public success: Boolean = true;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void
  {
    this.user = new User();
  }

  addUser(form: NgForm): void
  {
    if(form.valid)
    {
      this.auth.addUser(this.user).subscribe(data => {
        // perform authentication
        this.auth.authenticate(this.user).subscribe(data => {
          this.success = data.success
        if (this.success)
        {
          this.auth.storeUserData(data.token, data.user);
          this.router.navigateByUrl('admin/main');
        }
        else
        {
          this.errorMessage = data.msg
        }
        });
      })
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }
  }


}
