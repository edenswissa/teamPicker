import { Component, OnInit } from '@angular/core';
import {Player} from "../shared/player.module";
import {PlayersService} from "../players-table/players.service";
import {TeamsService} from "../shared/teams.service";
import {NumbersService} from "../shared/numbers.service";
import {Team} from "../shared/Team.module";

@Component({
  selector: 'app-group-spliting',
  templateUrl: './group-spliting.component.html',
  styleUrls: ['./group-spliting.component.css']
})
export class GroupSplitingComponent implements OnInit {

  teams : Team[] = [];

  constructor(private playersService : PlayersService,
              private teamsService : TeamsService,
              private numbersService : NumbersService) {
    this.playersService.sortGoingPlayers();
    this.teamsService.pickTeams(this.numbersService.numberOfTeams, this.numbersService.numberOfPlayersInTeam, this.playersService.getGoingPlayers());
    this.teams = this.teamsService.teams;
  }

  ngOnInit() {

  }

}
