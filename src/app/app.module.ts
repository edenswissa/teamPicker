import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { PlayersTableComponent } from './players-table/players-table.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { Routes,RouterModule } from "@angular/router";
import {NumbersService} from "./shared/numbers.service";
import {PlayersService} from "./players-table/players.service";
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { PlayerItemComponent } from './players/player-list/player-item/player-item.component';
import { NewPlayerDialogComponent } from './players/new-player-dialog/new-player-dialog.component';
import { GroupSplitingComponent } from './group-spliting/group-spliting.component';
import {TeamsService} from "./shared/teams.service";
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { SelectPlayerComponent } from './players/select-player/select-player.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path:'' , component : HomeComponent },
  { path:'playersTable' , component : PlayersTableComponent },
  { path:'login', component: LoginComponent },
  { path:'players', component: PlayersComponent, children: [
    { path: ":name", component: PlayerDetailComponent },
    { path: "", component: SelectPlayerComponent},
    { path: ":name/edit", component : PlayerEditComponent }
  ]},
  { path:'groupsSpliting', component: GroupSplitingComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PlayersTableComponent,
    HeaderComponent,
    HomeComponent,
    PlayersComponent,
    PlayerDetailComponent,
    PlayerListComponent,
    PlayerItemComponent,
    NewPlayerDialogComponent,
    GroupSplitingComponent,
    PlayerEditComponent,
    SelectPlayerComponent,
    LoginComponent,
  ],
  entryComponents: [NewPlayerDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NumbersService,PlayersService,TeamsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
