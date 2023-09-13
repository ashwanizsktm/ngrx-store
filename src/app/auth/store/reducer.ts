import { Action, createReducer, on } from "@ngrx/store";

import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { registerAction, registerFailureAction, registerSuccessAction } from "src/app/auth/store/actions/register.action";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    validatorErrors: null,
    isLoggedIn: null
}

const authReducer = createReducer(
    initialState,
    on(registerAction,
        (state): AuthStateInterface => ({
            ...state,
            isSubmitting: true,
            validatorErrors: null,
        })
    ),

    on(registerSuccessAction,
        (state, action): AuthStateInterface => ({
            ...state,
            isSubmitting: false,
            isLoggedIn: true,
            currentUser: action.currentUser
        })
    ),

    on(registerFailureAction,
        (state, action): AuthStateInterface => ({
            ...state,
            isSubmitting: false,
            validatorErrors: action.errors
        })
    )
)

export const reducers = (state: AuthStateInterface, action: Action) => {
    return authReducer(state, action);
}