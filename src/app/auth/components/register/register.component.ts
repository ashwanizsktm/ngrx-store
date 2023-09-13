import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { registerAction } from 'src/app/auth/store/actions/register.action';
import { isSubmittingSelector, validationErrorSelector } from 'src/app/auth/store/selector';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	form!: FormGroup;
	isSubmitting$!: Observable<boolean>;
	// backendErrors$!: Observable<BackendErrorsInterface | null>
	backendErrors$!: Observable<any>


	constructor(private fb: FormBuilder,
		private store: Store) { }

	ngOnInit(): void {
		this.initializeForm();
		this.initializeValues();
	}

	initializeValues(): void {
		this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
		this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
	}

	initializeForm(): void {
		this.form = this.fb.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	onSubmit(): void {
		const request: RegisterRequestInterface = {
			user: this.form.value
		}
		console.log(request);
		this.store.dispatch(registerAction({ request }));
	}

}
