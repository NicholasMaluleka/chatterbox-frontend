import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { ToolbarComponent } from './sharedComponents/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { ChatsComponent } from './components/chats/chats.component';
import { DefaultComponent } from './components/default/default.component';
import { UsersComponent } from './components/users/users.component';
import { RequestsComponent } from './components/requests/requests.component';
import { FriendsComponent } from './components/friends/friends.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'chats', component: ChatsComponent },
      { path: 'landing', component: DefaultComponent },
      { path: 'add',  component: UsersComponent },
      { path: 'requests',  component: RequestsComponent },
      { path: 'friends',  component: FriendsComponent },



    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
