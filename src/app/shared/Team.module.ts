import {Player} from "./player.module";
export class Team
{
  private players : Player[] = [];
  private name : string;
  private color : string;

  constructor()
  {
  }

  getName()
  {
    return this.name;
  }

  setName(name : string)
  {
    this.name = name;
  }

  setColor(color : string)
  {
    this.color = color;
  }

  getColor()
  {
    return this.color;
  }

  getPlayers()
  {
    return this.players;
  }

}
