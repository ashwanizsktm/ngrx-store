import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "src/app/shared/service/persistance/persistance.service";
import { Router } from "@angular/router";

@Injectable()

export class RegisterEffect {
    constructor(private actions$: Actions,
        private auth: AuthService,
        private router: Router,
        private persistance: PersistanceService) { }

    register$ = createEffect(() => this.actions$.pipe(
        ofType(registerAction),
        switchMap(({ request }) => {
            return this.auth.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    this.persistance.set('accessToken', currentUser.token);
                    return registerSuccessAction({ currentUser })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(registerFailureAction({ errors: errorResponse.error?.errors }))
                })
            )
        })
    ));

    redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
            this.router.navigateByUrl('/');
        })
    ),
        { dispatch: false }
    )

}