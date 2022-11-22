import { createPlatform, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Signup } from '../model/signup.model';

@Injectable({providedIn: 'root'})

export class SignupService {
  private signups: Signup[] = [];
  private signupUpdated = new Subject<Signup[]>();

  constructor(private http: HttpClient, private router:Router){}



  addProfile(email:string, username:string, gender:string, age:string,password:string, confirm_password:string){
    const signup:Signup = { _id: null, email:email, username:username,gender:gender,age:age,password:password,confirm_password:password};
    this.http.post<{message:string,signupID: string}>('http://localhost:3000/signup', signup).subscribe((responseData)=>{
      const signupID = responseData.signupID;
      signup._id = signupID;
      this.signups.push(signup);
      this.signupUpdated.next([...this.signups])
      this.router.navigate(['/']);
      console.log("Add PROFILE in services is working")
    });
  }


}
