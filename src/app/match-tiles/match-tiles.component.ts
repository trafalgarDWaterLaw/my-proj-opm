import { Component, OnInit } from '@angular/core';
import { MatchService } from './match-tiles.service';
import { Data } from '../data';
import * as moment from 'moment';


@Component({
  selector: 'match-tiles',
  templateUrl: './match-tiles.component.html',
  styleUrls: ['./match-tiles.component.css'],
  providers: [MatchService]
})
export class MatchTilesComponent implements OnInit {
  matchRes: any;
  imageClass = [];
  watchList = [];
  constructor(private _matchService: MatchService) {
    }

    ngOnInit() {
      if (localStorage.getItem('watch_list')) {
          this.watchList = JSON.parse(localStorage.getItem('watch_list'));
        }
      this._matchService.matchTileData()
                        .subscribe( r => {
                          debugger;
                          this.matchRes = JSON.parse(r);
                          this.resultLiveCheck();
                           //= r;
                        },
                        e => {

                        });
        
        // this.matchRes = Data;
        // this.resultLiveCheck();
    }

    resultLiveCheck() {
      this.matchRes.forEach(element => {
        /*watch out games*/
        if (this.checkForWatchList(element.id)) {
          element.watchList = true;
          element.matchClass = 'match-card-watch';
        } else {
          element.matchClass = 'match-card';
        }

        this.liveMatchAssignment(element);
        /*Result Category Done*/
        if (element.result === 'WON') {
          element.resultText = element.team1.name + ' Won';
        } else if (element.result === 'LOST') {
           element.resultText = element.team2.name + ' Won';
        } else if (element.result === 'DRAW') {
          element.resultText = 'DRAW';
        }
      });
    }

    checkForWatchList(id) {
      let res = false;
      this.watchList.forEach(elm =>  {
        if (elm === id) {
          res = true;
        }
      });
      return res;
    }

    liveMatchAssignment(element) {
      let now  = new Date();
        //let now = moment(dt);
        let then = element.gametime;

        let ms = moment(now).diff(moment(then));
        let d = moment.duration(ms);
        let s = Math.floor(d.minutes()) + Math.floor(d.hours()) * 60 + Math.floor(d.days()) * 1440;
      if (s > 0 && s < 150) {
          element.result = 'LIVE';
          element.matchClass = 'match-card-live';
        }

        /*Result done Game*/
        if (element.result && element.result !== 'LIVE') {
          element.matchClass = 'match-card-result';
        }
    }

    addToWatchList(id) {
      if (this.checkForWatchList(id)) {
        let idx = this.watchList.indexOf(id);
        this.watchList.splice(idx, 1);
      } else {
        this.watchList.push(id);
      }
      this.resultLiveCheck();
      localStorage.setItem('watch_list', JSON.stringify(this.watchList));
    }

    //Implement single update

    updateSingleMatch(id, isWatch) {
      let idx = this.matchRes.indexOf(id);
        if (this.matchRes[idx].result !== 'LIVE') {
          if (isWatch) {
            this.matchRes[idx].matchClass = 'match-card-watch';
          } else {
            this.matchRes[idx].matchClass = 'match-card';
          }
        }
    }
}
