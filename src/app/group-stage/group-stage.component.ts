import { Component, OnInit } from '@angular/core';
import { GroupStageService } from './group-stage.service';
import { Standing } from '../data';
import * as moment from 'moment';


@Component({
  selector: 'group-stage-tiles',
  templateUrl: './group-stage.component.html',
  providers: [GroupStageService]
})
export class GroupStageComponent implements OnInit {
  groupRes: any;
  displayedColumns = ['name', 'flag', 'D', 'L', 'Pts', 'GF', 'MP', 'GA', 'W', 'GD'];
  constructor(private _gsService: GroupStageService) {
    }

    ngOnInit() {
      this._gsService.groupTileData()
                        .subscribe( r => {
                          debugger;
                          this.groupRes = JSON.parse(r);
                          
                           //= r;
                        },
                        e => {

                        });
    // this.groupRes = Standing;
    }
}
