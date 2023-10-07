
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

export interface Tournament {
    _id: string;
    tournamentName: string;
    teamName: string;
    location: string;
    mobileNo: number;
    winnersPriceMoney: number;
    runnersPriceMoney: number; 
    tournamentDate: string;
    slots: number;
    status: string;
    registeredDate: string;
    limit: string;
    logoImage: string;
    posterImage: string;
    managerId: string;
    is_approved: boolean; 
    Teams: string[];
    __v: number;
  }
  