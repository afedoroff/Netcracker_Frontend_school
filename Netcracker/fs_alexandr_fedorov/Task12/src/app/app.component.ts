import {Component} from '@angular/core';
import {AppDataService} from "./appData.service";
import {Animal} from "./card/Animal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public cards: Animal[];
  public hideCats : boolean = false;
  constructor(private service: AppDataService) {
    this.cards = service.getData();
  }
  ngOnInit() {}
  public hideCatsEvent(): void{
    this.hideCats = !this.hideCats;
  }
}
