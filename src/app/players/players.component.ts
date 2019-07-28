import {Component, OnInit, Input} from '@angular/core';
import {Player} from "../shared/player.module";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NewPlayerDialogComponent} from "./new-player-dialog/new-player-dialog.component";
import {PlayersService} from "../players-table/players.service";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playersChanged = false;
  isLoading = false;

  constructor(public newPlayerDialog : MatDialog,
              private playersService : PlayersService) {
    this.playersService.finishLoading.subscribe(res => this.isLoading = res);
    this.playersService.initializePlayers();
  }

  onNewPlayer()
  {
    let newPlayerDialogRef = this.newPlayerDialog.open(NewPlayerDialogComponent,{
      width:'400px',data:"newPlayerDialog"
    });
    newPlayerDialogRef.afterClosed().subscribe(result => {
      console.log('dialogClosed', result);
    })
  }

  ngOnInit() {
    this.playersService.playersWasChanged.subscribe(
      (playersWasChanged : boolean) => this.playersChanged = playersWasChanged
    );
  }

  onSave(){
    this.playersService.putPlayersToDatabase(this.playersService.getPlayers()).subscribe(
      (response)=> console.log(response),
      (error)=> console.log(error)
    );
    this.playersService.playersWasSaved();
  }

}
