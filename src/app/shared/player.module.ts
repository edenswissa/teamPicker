export class Player
{
  name : string;
  phone : string;
  imageUrl : string;
  rank : boolean[] = [];
  rankNumber : number;

  constructor(i_Name : string, i_Phone : string,i_ImageUrl:string, i_Rank:number)
  {
    this.name = i_Name;
    this.phone = i_Phone;
    this.imageUrl = i_ImageUrl;
    this.rankNumber = i_Rank;
    for (let i = 0; i < 5; i ++)
    {
      if (i- i_Rank < 0)
      {
        this.rank.push(true);
      }
      else
      {
        this.rank.push(false);
      }
    }
  }

}
