import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './sharedComponents/toolbar/toolbar.component';
import { LoginComponent } from './forms/login/login.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { MaterialModule } from './modules/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DefaultComponent } from './components/default/default.component';
import { ChatsComponent } from './components/chats/chats.component';
import { SearchUserComponent } from './popUps/search-user/search-user.component';
import { UsersComponent } from './components/users/users.component';
import { InviteComponent } from './forms/invite/invite.component';
import { RequestsComponent } from './components/requests/requests.component';
import { FriendsComponent } from './components/friends/friends.component';
import { DeleteComponent } from './components/delete/delete.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    SidebarComponent,
    DefaultComponent,
    ChatsComponent,
    SearchUserComponent,
    UsersComponent,
    InviteComponent,
    RequestsComponent,
    FriendsComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
