import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
	selector: 'app-backend-errors',
	templateUrl: './backend-errors.component.html',
	styleUrls: ['./backend-errors.component.scss']
})
export class BackendErrorsComponent implements OnInit {
	@Input({ required: true, alias: 'backendErrors' }) backendErrorsProps!: BackendErrorsInterface;
	errorMessages: string[] = [];

	ngOnInit(): void {
		this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
			const messages = this.backendErrorsProps[name].join('');
			return `${name} ${messages}`;
		})
	}
}
