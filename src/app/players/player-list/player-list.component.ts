import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {PlayersService} from "../../players-table/players.service";
import {Player} from "../../shared/player.module";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players : Player[] = [];

  constructor(private playersService : PlayersService) {
    this.players = this.playersService.getPlayers();
  }

  ngOnInit() {
  }

}
