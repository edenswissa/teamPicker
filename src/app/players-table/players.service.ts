import {Player} from "../shared/player.module";
//import * as data from '../data/playersJSON.json';
import {Injectable} from "@angular/core";
import {Http , Response} from "@angular/http";
import 'rxjs/Rx';
import {Subject} from "rxjs/Subject";


@Injectable()
export class PlayersService {

  constructor(private http: Http)
  {
  }

  private players : Player[] = [];
  private alreadyGetPlayers: boolean = false;
  private goingPlayers : Player[] = [];
  finishLoading = new Subject<boolean>();
  playersWasChanged = new Subject<boolean>();

  initializePlayers()
  {
    if (!this.alreadyGetPlayers) {
      this.getPlayersFromDatabase().subscribe(
        (players:Player[]) => {
          for (let i = 0; i < players.length; i++) {
            let player = new Player(players[i].name
              , players[i].phone,
              players[i].imageUrl,
              players[i].rankNumber);
            this.players.push(player);
          }
          this.finishLoading.next(true);
        },
        (error) => console.log(error)
      );
      this.alreadyGetPlayers = true;
    }
    else {
      this.finishLoading.next(true);
    }
  }

  getFinishLoading() {
    return this.finishLoading;
  }

  putPlayersToDatabase(players : Player[])
  {
    return this.http.put('https://my-pickink-teams-project.firebaseio.com/data.json' ,players);
  }

  getPlayersFromDatabase() {
    return this.http.get('https://my-pickink-teams-project.firebaseio.com/data.json')
      .map(
        (response : Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  initializeGoingPlayers(indexes : number[])
  {
    for(let i=0; i < indexes.length; i++) {
      let player = new Player(this.players[indexes[i]].name
        , this.players[indexes[i]].phone
        , this.players[indexes[i]].imageUrl
        , this.players[indexes[i]].rankNumber);
      this.goingPlayers.push(player);
    }
  }

  updatePlayer( index : number, newPlayer : Player)
  {
    this.players[index] = newPlayer;
    this.playersWasChanged.next(true);
  }

  addPlayer(newPlayer : Player)
  {
    this.players.push(newPlayer);
    this.playersWasChanged.next(true);
  }

  playersWasSaved()
  {
    this.playersWasChanged.next(false);
  }

  getPlayers()
  {
    //this.finishLoading.next(true);
    return this.players;
  }

  getIndexByName(name : string)
  {
    return this.players.map(player => player.name).indexOf(name);
  }

  getPlayerByName(name : string)
  {
    let index = this.players.map(player => player.name).indexOf(name);
    return this.players[index];
  }

  deletePlayer(player : Player)
  {
    let index = this.players.indexOf(player);
    if(index > -1)
    {
      this.players.splice(index,1);
    }
    this.playersWasChanged.next(true);
  }

  getGoingPlayers()
  {
    return this.goingPlayers;
  }

  checkingIfExisting(name : string)
  {
    let index = this.players.map(player => player.name).indexOf(name);
    return (index > -1);
  }

  sortGoingPlayers()
  {
    this.goingPlayers = this.quick_Sort(this.goingPlayers);
  }

  quick_Sort(origArray : Player[]) {
    if (origArray.length <= 1) {
      return origArray;
    } else {

      let left : Player[] = [];
      let right : Player []= [];
      let newArray: Player []= [];
      let index = Math.floor(Math.random()*origArray.length);
      let pivot : Player = origArray[index];
      origArray.splice(index,1);
      let length = origArray.length;

      for (let i = 0; i < length; i++) {
        if (origArray[i].rankNumber <= pivot.rankNumber) {
          left.push(origArray[i]);
        } else {
          right.push(origArray[i]);
        }
      }

      return newArray.concat(this.quick_Sort(left), pivot, this.quick_Sort(right));
    }
  }
}
