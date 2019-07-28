import { Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import {Player} from "../../../shared/player.module";


@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent implements OnInit {

  @Input() player : Player;
  @Input() name : string;

  constructor() { }


  ngOnInit() {
  }

}
