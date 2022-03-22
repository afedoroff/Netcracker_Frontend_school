import { Component, OnInit, Input } from '@angular/core';
import {Animal} from "./Animal";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  public animal: Animal = <Animal>{}
  public click : boolean = false;
  constructor() {}
  ngOnInit(): void {}

  public clickEvent() : void{
    this.click = !this.click;
  }

  public getImg(): string{
    return this.animal.type.toLowerCase();
  }
}


