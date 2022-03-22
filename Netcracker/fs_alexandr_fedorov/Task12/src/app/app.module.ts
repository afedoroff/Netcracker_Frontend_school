import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import {AppDataService} from "./appData.service";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
