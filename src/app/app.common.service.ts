import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


@Injectable() export class AppCommonService  {

constructor(
        private http: Http
    ) {}

    getHeader() {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers});
        return options;
    }


    get(endpoint: string): Observable<any> {
        const options = this.getHeader();
        const response$ = this.http
            .get(endpoint, options);
        return response$;
    }

    handleError(error: any) {
        const errorMsg = error.message || `There was a problem with our hyperdrive device and we couldn't retrieve your data!`;
        return Observable.throw(errorMsg);
    }

}
