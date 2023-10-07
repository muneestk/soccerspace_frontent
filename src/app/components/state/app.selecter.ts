import { createSelector } from "@ngrx/store";
import { ManagerList, TournamentList, UserList } from "./app.state";
import { Managers, Tournament, Users } from "../modal/model";

export const userRootSelector = (state :UserList) => state.allUsers ;
export const allUser = createSelector(
    userRootSelector,
    (allUsers : Users[]) => {
        return [...allUsers]
    }
)

export const managerRootSelector = (state : ManagerList) => state.allManagers
export const managerData = createSelector(
    managerRootSelector,
    (allManagers : Managers[]) => {
        return [...allManagers]
    }
)



export const tournamentRootSelector = (state : TournamentList) => state.allTournaments
export const TournamenysData = createSelector(
    tournamentRootSelector,
    (allTournaments : Tournament[]) => {
        return [...allTournaments]
    }
)