import { Managers, Tournament, Users } from "../modal/model";

export interface UserList {
    allUsers : Users[]
}

export interface ManagerList {
    allManagers : Managers[]
}

export interface TournamentList {
    allTournaments : Tournament[]
}