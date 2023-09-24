
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