import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddFormComponent } from './components/add-form/add-form.component';
import {HttpClientModule} from "@angular/common/http";
import { EditFormComponent } from './components/edit-form/edit-form.component';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AppRoutingModule} from "../../app-routing.module";

@NgModule({
  declarations: [
    AnimalCardComponent,
    AddFormComponent,
    EditFormComponent,
    NotFoundComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AnimalCardComponent,
    AddFormComponent,
    EditFormComponent,
    NotFoundComponent
  ]
})

export class AnimalsModule { }
