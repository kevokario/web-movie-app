import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider, sendPasswordResetEmail
} from "@angular/fire/auth";
import {User} from "../models/user";
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {BehaviorSubject, firstValueFrom, from, Observable, switchMap, tap} from "rxjs";
import { Router } from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userBehaviourSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User|null>(null);

  private readonly usersCollection =  collection(this.fireStore, 'users');

  constructor(
    private fireStore: Firestore,
    private fireAuth: Auth,
    private router: Router,
  ) {}

  async register(user: User){
    try {
      const userCredentials = await createUserWithEmailAndPassword(this.fireAuth, user.email, user.password);
      const _user = userCredentials.user;

      await updateProfile(_user, {displayName: user.name});

      await this.updateUserRecord(this.getUserFromAuth(userCredentials.user));
      return firstValueFrom(this.login(user));
    } catch (e) {
      throw e;
    }
  }

  updateUserRecord(user: User){
    const userRef = doc(this.fireStore, `users/${user.id}`);

    return setDoc(userRef, {
      ...user,
      createdAt: new Date()
    });
  }

  login(user: User) {
    return from(
      signInWithEmailAndPassword(this.fireAuth, user.email, user.password))
      .pipe(
        tap({
          next:async (response: any) => await this.authenticateUser(response),
        })
      );
  }

  async authenticateUser(response: any ) {
    const authUser = response.user;
    const token = authUser.accessToken;
    const user: User = this.getUserFromAuth(authUser);
    localStorage.setItem(environment.token,token);
    localStorage.setItem(environment.user, JSON.stringify(user));
    await this.router.navigate(['/home']);
  }

  private getUserFromAuth(authUser:any):User {
    return {
      name : authUser.displayName,
      email : authUser.email,
      id : authUser.uid,
      photo : authUser.photoURL
    } as User;
  }

  loginWithGoogle(){
    return from(signInWithPopup(this.fireAuth,new GoogleAuthProvider())).pipe(
      tap({
        next: async (r: any) => {
          const userQuery = query(this.usersCollection, where('email','==', r.user.email));
          const snapshot = await getDocs(userQuery);

          if (snapshot.empty) {
            const user: User = this.getUserFromAuth(r.user);
            await this.updateUserRecord(user);
          }

          await this.authenticateUser(r);
        },
      })
    )
  }

  async logout(){
    await this.router.navigate(['/']);
    localStorage.removeItem(environment.token);
    localStorage.removeItem(environment.user);
    this.userBehaviourSubject$.next(null);
  }
  getUsers() {
    return collectionData(this.usersCollection, {idField: 'id'}) as Observable<User[]>;
  }

  sendResetPasswordLink(email: string) {
    return from(
      sendPasswordResetEmail(
        this.fireAuth,
        email,
        {
          url: `${environment.appUrl}/#/auth/reset-password`,
          handleCodeInApp: true
        }
      )
    );
  }
}
