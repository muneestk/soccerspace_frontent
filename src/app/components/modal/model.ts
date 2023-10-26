
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
    name : string ,
    email : string,
    password : string,
    is_verified : boolean,
    otp : string,
    is_blocked : boolean,
    __v : number
}
  