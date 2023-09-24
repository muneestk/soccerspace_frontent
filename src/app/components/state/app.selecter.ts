import { createSelector } from "@ngrx/store";
import { ManagerList, UserList } from "./app.state";
import { Managers, Users } from "../modal/model";

export const userRootSelector = (state :UserList) => state.allUsers ;
export const uniqueUser = createSelector(
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