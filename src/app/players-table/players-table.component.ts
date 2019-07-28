import { Component, OnInit } from '@angular/core';
import { PlayersService } from "./players.service";
import { Player } from "../shared/player.module";
import { NumbersService } from "../shared/numbers.service";
import {Router} from "@angular/router";
import { Response } from "@angular/http";


@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css'],
  providers: []
})
export class PlayersTableComponent implements OnInit {

  players : Player[];
  minNumbersOfPlayers : number;
  checkAll = false;
  indexesOfPlayers :number[] = [];
  isLoading = false;

  constructor(private playerService : PlayersService,
              private numbersService : NumbersService,
              private router : Router) {
    this.playerService.finishLoading.subscribe(res => this.isLoading = res);
    this.playerService.initializePlayers();
    this.players = this.playerService.getPlayers();
    this.minNumbersOfPlayers = this.numbersService.numberOfPlayersInTeam * 2;
  }

  ngOnInit() {

  }

  putPlayersToDatabase(players : Player[])
  {
    this.playerService.putPlayersToDatabase(players).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onStart()
  {
    if(this.indexesOfPlayers.length < this.minNumbersOfPlayers)
    {
      alert("You did not chose enough players, try again");
    }
    else
    {
      this.playerService.initializeGoingPlayers(this.indexesOfPlayers);
      this.router.navigate(['./groupsSpliting']);
    }
  }

  onCheckAllChanged(event:any)
  {
    if(event.checked)
    {
      this.checkAll = true;
      for (let i = 0; i < this.playerService.getPlayers().length; i++)
      {
        this.indexesOfPlayers[i] = i;
      }
    }
    else
    {
      this.checkAll = false;
      this.indexesOfPlayers = [];
    }
  }

  onCheckBoxChanged(i : number,event:any)
  {
    if(event.checked)
    {
      let index = this.indexesOfPlayers.indexOf(i);
      if(index > -1)
      {
        return;
      }
      else
      {
        this.indexesOfPlayers.push(i);
      }
    }
    else
    {
      let index = this.indexesOfPlayers.indexOf(i);
      if(index > -1)
      {
        this.indexesOfPlayers.splice(index,1);
      }
    }
  }


}
