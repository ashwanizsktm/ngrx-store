import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/auth/store/reducer';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effect';
import { BackendErrorsComponent } from './components/backend-errors/backend-errors.component';
import { PersistanceService } from '../shared/service/persistance/persistance.service';

const routes = [
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [RegisterComponent, BackendErrorsComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(RegisterEffect)
  ],
  providers: [AuthService, PersistanceService]
})

export class AuthModule { }