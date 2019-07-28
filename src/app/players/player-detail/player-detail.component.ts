import {Component, OnInit} from '@angular/core';
import {Player} from "../../shared/player.module";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PlayersService} from "../../players-table/players.service";

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  player : Player;
  name : string;
  index : number;

  constructor(private route : ActivatedRoute,
              private playersService : PlayersService,
              private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.name = params['name'];
        this.player = this.playersService.getPlayerByName(this.name);
        this.index = this.playersService.getPlayers().indexOf(this.player);
      }
    )
  }

  onEdit()
  {
    this.router.navigate(['edit'], {relativeTo : this.route});
  }

  onDelete(name : string)
  {
    let confirmQuestion = confirm("Are you sure you want to delete " + name +" ?");
    if (confirmQuestion)
    {
      this.playersService.deletePlayer(this.player);
      this.router.navigate(['/players']);
    }
  }

}
