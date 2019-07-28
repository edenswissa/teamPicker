import {Team} from "./Team.module";
import {Player} from "./player.module";
import {templateJitUrl} from "@angular/compiler";

export class TeamsService
{
  teams : Team[] = [];

  initizalizeNumberOfTeams(numberOfTeams:number)
  {
    for (let i =0; i < numberOfTeams; i++)
    {
      let team = new Team();
      switch (i){
        case 0:
          team.setName("first team");
          team.setColor("blue");
          break;
        case 1:
          team.setName("second team");
          team.setColor("red");
          break;
        case 2:
          team.setName("third team");
          team.setColor("green");
          break;
        case 3:
          team.setName("forth team");
          team.setColor("black");
          break;
        case 4:
          team.setName("fifth team");
          team.setColor("yellow");
          break;

      }
      this.teams.push(team);
    }
  }

  pickTeams(numberOfTeams : number, numberOfPlayersInTeam, goingPlayers: Player[])
  {
    this.initizalizeNumberOfTeams(numberOfTeams);
    let start =0;
    let end = goingPlayers.length - 1;
    for (let i=0; i < numberOfPlayersInTeam / 2; i++)
    {
      for (let j=0; j < numberOfTeams; j++)
      {
        if (end - start > numberOfTeams) {
          this.teams[j].getPlayers().push(goingPlayers[start]);
          this.teams[j].getPlayers().push(goingPlayers[end]);
          start++;
          end--;
        }
        else {
          this.teams[j].getPlayers().push(goingPlayers[start]);
          start++;
        }
      }
    }
  }
}
