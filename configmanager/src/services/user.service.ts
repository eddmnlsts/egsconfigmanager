import { Injectable } from "@angular/core";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";
import { Subject } from "rxjs";
import { User } from "src/models/user.model";
import { AppService } from "./app.service";
import { EncryptDecryptService } from "./encryptDecrypt.service";



@Injectable({
    providedIn: 'root'
  })
export class UserService {

    loggedInUser;
    changedLoggedInUser = new Subject<User>();
    changedUsers = new Subject<User[]>();

    constructor(private appService: AppService,
                private encryptDecryptService: EncryptDecryptService) {}

    getLoggedInUserDetails() {
        this.loggedInUser = JSON.parse(this.encryptDecryptService.decryptData(sessionStorage.getItem('session')))
        return this.loggedInUser;
    }

    createUser(userToCreate) {
        return this.appService.createUser(userToCreate);
    }

    getUserList() {
        return this.appService.getUserList();
    }

    getUserByUsername(username) {
        return this.appService.getUserByUsername(username);
    }

    changePassword(sourcenum, password) {
        return this.appService.changeUserPassword(sourcenum, password);
    }

    getUserConfigHistory(sourcenum) {
        return this.appService.getUserConfigHistory(sourcenum);
    }

    getConfigCountByUser(sourcenum) {
        return this.appService.getConfigCountByUser(sourcenum);
    }

    updateUserPermission(sourcenum, isadmin) {
        return this.appService.changeUserPermission(sourcenum, isadmin);
    }

}