
export interface Users {
    _id : string,
    name : string ,
    email : string,
    password : string,
    is_verified : boolean,
    is_admin : boolean,
    is_blocked : boolean,
    __v : number
}

export interface Managers {
    _id : string,
    name : string ,
    email : string,
    password : string,
    is_verified : boolean,
    otp : string,
    is_blocked : boolean,
    __v : number
}

export interface Tournaments {
    teamLogo: any;
    _id: string;
    tournamentName: string;
    teamName: string;
    location: string;
    mobileNo: number;
    winnersPriceMoney: number;
    runnersPriceMoney: number; 
    registerFee : number; 
    tournamentDate: Date;
    slots: number;
    status: string;
    registeredDate: Date;
    limit: string;
    players: string;
    logoImage: string;
    posterImage: string;
    managerId: string;
    is_approuve : string; 
    Teams: string[];
    __v: number;
  }


  export interface Iteams {
    _id : string,
    teamName : string ,
    managerName : string,
    teamLocation : string,
    teamLogo : string,
    mobNo : number,
    altMobNo : number,
    userId : Users,
    tournamentId : Tournaments,
    paymentMethod : string,
    paymentStatus : string,
    __v : number
}
  


export interface Ifixture {
    _id: string;
    tournamentId: Tournaments;
    managerId: string;
    matchRound: number;
    matches: Imatch[];
  }
  
  export interface Imatch {
    team1Id: Iteams;
    team2Id: Iteams;
    winner: string | null;
    team1Score: number;
    team1GoalScorers: IgoalScorer[];
    team2Score: number;
    team2GoalScorers: IgoalScorer[];
    matchStatus: string;
  }
  
  export interface IgoalScorer {
    scorerName: string;
    count: number;
  }
  