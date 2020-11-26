import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class QuestionBuilder {
     jsonUrl = 'assets/questions/';
    constructor(private http: HttpClient){}

    getQuestion(number){
        const url = this.jsonUrl+'que'+number+'.json'
        return this.http.get(url);
    }

    totalQuestion(){
        const url = this.jsonUrl+'summary.json';
        return this.http.get(url);
    }

    getTime() {
        const url = this.jsonUrl+'summary.json';
        return this.http.get<Timer>(url)
    }
}

export interface Timer {
    HH: string,
    MM: string,
    SS: string
}