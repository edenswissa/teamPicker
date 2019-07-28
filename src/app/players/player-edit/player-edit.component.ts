import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PlayersService} from "../../players-table/players.service";
import {Player} from "../../shared/player.module";
import {NgForm, FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  form : FormGroup;
  name : string;
  player : Player;

  constructor(private route : ActivatedRoute,
              private playersService : PlayersService,
              private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.name = params['name'];
        let newPlayer : Player = this.playersService.getPlayerByName(this.name);
        this.player = new Player(newPlayer.name,newPlayer.phone,newPlayer.imageUrl,newPlayer.rankNumber);
      }
    );

    this.form = new FormGroup({
      'name' : new FormControl(this.player.name,Validators.required),
      'phoneNumber' : new FormControl(this.player.phone,[Validators.required, Validators.pattern(/^05[2-9]-\d{7}$/)]),
      'imageUrl' : new FormControl(this.player.imageUrl)
    });
  }

  onStarClick(index : number)
  {
    this.player.rankNumber = index + 1;
    for(let i=0; i <= index; i++)
    {
      this.player.rank[i]= true;
    }
    for(let j=index+1; j < this.player.rank.length; j++)
    {
      this.player.rank[j] = false;
    }
  }

  onCancel()
  {
    this.router.navigate(['/players',this.name]);
  }

  onSubmit()
  {
    if(this.playersService.checkingIfExisting(this.form.value.name))
    {
      alert('can not update because we already have a player with the same name');
    }
    else if(this.form.valid)
    {
      this.player.name = this.form.value.name;
      this.player.phone = this.form.value.phoneNumber;
      this.player.imageUrl = this.form.value.imageUrl;

      let index = this.playersService.getIndexByName(this.name);
      this.playersService.updatePlayer(index, this.player);
      alert('The player was successfully edited');
      this.router.navigate(['/players']);
    }
  }

}
