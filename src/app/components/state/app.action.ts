import { createAction, props } from "@ngrx/store";
import { Managers, Tournament, Users } from "../modal/model";


export const retrieveUsers = createAction('[Users Api] Retrieve Users');
export const retrieveUserSuccess = createAction('[Users Api] Retrieve Users Success',props<{ allUsers:Users[] }>()) ;


export const retrieveManagers = createAction('[Managers Api] Retrieve Managers');
export const retrieveManagerSuccess = createAction('[Managers Api] Retrieve Managers Success',props<{allManagers:Managers[]}>()) ;


export const retrieveTournaments = createAction('[Tournaments Api] Retrieve Tournaments');
export const retrieveTournamentsSuccess = createAction('[Tournaments Api] Retrieve Tournaments Success',props<{allTournaments:Tournament[]}>()) ;