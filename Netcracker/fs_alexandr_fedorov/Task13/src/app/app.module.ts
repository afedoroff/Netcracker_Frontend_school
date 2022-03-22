import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AnimalsModule} from "./modules/animals/animals.module";
import {AnimalsDataService} from "./modules/animals/animals-data.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AnimalsModule
  ],
  providers: [AnimalsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
