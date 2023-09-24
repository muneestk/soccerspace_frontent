import { createReducer, on } from "@ngrx/store";
import { Managers, Users } from "../modal/model";
import { retrieveManagerSuccess, retrieveUserSuccess } from "./app.action";


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

