import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AppCommonService } from '../app.common.service';

@Injectable() export class GroupStageService {

    constructor( private http: Http, private _commonService: AppCommonService) {}

    groupTileData() {
        const url = 'https://35.200.203.14/standing/';
        const data$ = this._commonService.get(url)
                        .pipe(map(res => {
                            res = res._body;
                            //res = res.json();
                            return res;
                            }));
        return data$;
    }
}