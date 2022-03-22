import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Animal, Types} from "../../models/animal";
import {ActivatedRoute} from "@angular/router";
import {AnimalsDataService} from "../../animals-data.service";

export enum controlNames{
  name = "name",
  type = "type",
  desc = "description",
  age = "age",
  sex = "sex"
}

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.less']
})
export class EditFormComponent implements OnInit {

  public animal: Animal = <Animal>{};
  public types = Types;
  public controlNames = controlNames;
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl([
      Validators.required,
      Validators.minLength(3)
    ]),
    type: new FormControl([
      Validators.required
    ]),
    description: new FormControl(this.animal.description),
    age: new FormControl([
      Validators.required,
    ]),
    sex: new FormControl([
      Validators.required
    ])
  })
  private error: any;

  constructor(
    private service: AnimalsDataService,
    private route: ActivatedRoute){
  }

  ngOnInit(): void {
    let animalId = this.route.snapshot.paramMap.get("id");
    this.service.getAnimal(Number(animalId)).subscribe(
      animal=>{
        this.animal=animal;
        this.formGroup.controls[controlNames.name].setValue(this.animal.name);
        this.formGroup.controls[controlNames.type].setValue(this.animal.type);
        this.formGroup.controls[controlNames.desc].setValue(this.animal.description);
        this.formGroup.controls[controlNames.age].setValue(this.animal.age);
        this.formGroup.controls[controlNames.sex].setValue(this.animal.sex);
      },
      error => {this.error = error.message; alert(error.message);}
    );
  }

  public isValid(): boolean{
    if(this.formGroup.status == "INVALID"){
      return false
    } else return true;
  }

  public submitForm(){
    this.animal.name = this.formGroup.controls[this.controlNames.name].value;
    this.animal.type = this.formGroup.controls[this.controlNames.type].value;
    this.animal.description = this.formGroup.controls[this.controlNames.desc].value;
    this.animal.age = this.formGroup.controls[this.controlNames.age].value;
    this.animal.sex = this.formGroup.controls[this.controlNames.sex].value;
    this.service.editData(this.animal).subscribe();
  }
}
