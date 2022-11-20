import { Component, OnInit } from '@angular/core';

import { Signup } from '../model/signup.model';
import { NgForm }  from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SignupService } from './signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public signupService:SignupService, public route:ActivatedRoute) { }

  private mode ='create';
  private signupID:string;
  signup:Signup;

  ngOnInit():void{

  }

  addEmail:"";
  addUsername:"";
  addGender:"";
  addAge:"";
  AddPassword:"";
  AddConfirmPassword:"";


  onSaveProfile(form: NgForm){

    if(this.mode === "create"){
      this.signupService.addProfile(form.value.email, form.value.username, form.value.gender,form.value.age,form.value.password,form.value.confirm_password);
      console.log("sign up component")
    } else {
     
    }
    form.resetForm();


  }

  public dataFields:Object = {text:'gender',value: 'Id'};
  public localData:Object[] = [
    {Id: 'Option1', gender: 'Male'},
    {Id: 'Option2', gender: 'Female'},

    {Id: 'Option3', gender: 'Prefer not to answer'}

  ]
}
