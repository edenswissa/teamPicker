import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {PlayersService} from "../../players-table/players.service";
import {Player} from "../../shared/player.module";
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-player-dialog',
  templateUrl: './new-player-dialog.component.html',
  styleUrls: ['./new-player-dialog.component.css']
})
export class NewPlayerDialogComponent implements OnInit {

  nameError = false;
  // error = new FormControl('',[Validators.required,Validators.pattern(/^05[2-9]-\d{7}$/)]);
  form : FormGroup;

  constructor(public thisDialogRef : MatDialogRef<NewPlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data : string,
              private playersService : PlayersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required, Validators.pattern(/^05[2-9]-\d{7}$/)]),
      'imageUrl' : new FormControl(null),
      'rank' : new FormControl(null,[Validators.required,Validators.min(1),Validators.max(5)])
    });
  }

  // getErrorMessage()
  // {
  //   if(this.error.hasError('required'))
  //   {
  //     return "You must enter a value";
  //   }
  //   if(this.error.hasError('pattern'))
  //   {
  //     return "You must enter Phone number";
  //   }
  // }

  onClosing()
  {
    this.thisDialogRef.close('closeWithoutAdding');
  }
  onAddingPlayer(name:string, phone:string , image:string , rank:number)
  {
    if(this.playersService.checkingIfExisting(name))
    {
      alert('we already have player with the same name, please enter different name');
    }
    else if (this.form.valid) {
      let player = new Player(name, phone, image, rank);
      this.playersService.addPlayer(player);
      this.thisDialogRef.close('addPlayer');
    }
  }

}
