import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminService } from "src/app/service/admin.service";
import { UserService } from "src/app/service/user.service";
import { retrieveManagerSuccess, retrieveManagers, retrieveUserSuccess, retrieveUsers } from "./app.action";
import { map, switchMap } from "rxjs";
import { Managers, Users } from "../modal/model";



@Injectable()
export class appEffects {
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private userService: UserService
  ) {}

  loadAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveUsers),
      switchMap(() => {
        return this.adminService.loadUsers().pipe(
          map((data) => {
            return retrieveUserSuccess({ allUsers: data as Users[] });
          })
        );
      })
    )
  );

  
  loadAllManagers$ = createEffect(() => 
  this.actions$.pipe(
    ofType(retrieveManagers),
    switchMap(() => {
        return  this.adminService.loadManagers().pipe(
            map((data) => {
                return retrieveManagerSuccess({ allManagers : data as Managers[]})
            })
        )
    })
  ))



}
