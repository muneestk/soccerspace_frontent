import { createReducer, on } from "@ngrx/store";
import { Managers, Tournament, Users } from "../modal/model";
import { retrieveManagerSuccess, retrieveTournamentsSuccess, retrieveUserSuccess } from "./app.action";


export const initialState : Users[] = [] ;

const _UserListReducer = createReducer(
    initialState,
    on(retrieveUserSuccess, (_state, { allUsers }) => {
        return [...allUsers];
    })
)

export function UserListReducer(state:any,action:any){
    return _UserListReducer(state,action)
}




export const initialStateManager : Managers[] = []

const _ManagerListReducer = createReducer(
    initialStateManager,
    on(retrieveManagerSuccess , (_state ,{ allManagers }) => {
        return [...allManagers]
    })
)

export function ManagerListReducer(state : any ,action : any){
    return _ManagerListReducer(state,action)
}




export const initialStateTournament : Tournament[] = []

const _TournamentListReducer = createReducer(
    initialStateTournament,
    on(retrieveTournamentsSuccess , (_state ,{ allTournaments }) => {
        return [...allTournaments]
    })
)

export function tournamentListReducer(state : any ,action : any){
    return _TournamentListReducer(state,action)
}


