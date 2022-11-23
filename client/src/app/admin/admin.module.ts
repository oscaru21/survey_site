import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register/register.component';

const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
   children: [{ path: '**', redirectTo: 'list' }]
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [AuthComponent, AdminComponent, RegisterComponent]
})
export class AdminModule {}
