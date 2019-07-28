import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, Validators} from '@angular/forms';
import {NumbersService} from "../shared/numbers.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  numberOfTeams : number[] = [2,3,4,5];
  error = new FormControl('',[Validators.required]);

  constructor(private router:Router,
              private numbersService : NumbersService) { }


  ngOnInit() {
  }

  getErrorMessage() {
    if(this.error.hasError('required'))
    {
      return "You must enter a value";
    }
  }

  onStartClick(howmantPlayers:number, howmanyTeams:number)
  {
    if (howmantPlayers === undefined || howmanyTeams === undefined)
    {
      alert("have to field the inputs");
    }
    else
    {
        this.numbersService.numberOfPlayersInTeam = howmantPlayers;
        this.numbersService.numberOfTeams = howmanyTeams;
        this.router.navigate(['./playersTable']);
    }
  }

}
