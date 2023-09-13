import { Injectable } from "@angular/core";

@Injectable()

export class PersistanceService {

    set(key: string, data: any) {
        try {
            localStorage.setItem(key, JSON.stringify(data))
        } catch (error) {
            console.error('Error saving to localstorage', error)
        }
    }

    get(key: string, data: any): any {
        try {
            return JSON.parse(localStorage.getItem(key) as string)
        } catch (error) {
            console.error('Error saving to localstorage', error);
            return null
        }
    }
}