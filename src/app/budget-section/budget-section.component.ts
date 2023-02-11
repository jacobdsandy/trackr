import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { camelCase } from "lodash";

@Component({
  selector: 'app-budget-section',
  templateUrl: './budget-section.component.html',
  styleUrls: ['./budget-section.component.scss']
})
export class BudgetSectionComponent implements OnInit {
  @Input() title: string = "";

  @Input() key: string;

  @Input() percent: number = 0;

  @Input() set fieldNames(fieldNames: Array<string>){
    this._fieldNames = fieldNames;
    this.budgetSectionForm = new FormGroup({});
    fieldNames.forEach((field: string) => {
      this.budgetSectionForm.addControl(camelCase(field), new FormControl(''));
    })
  }

  @Input() set income(income: number){
    this._income = income;
    this.target = income * this.percent;
  }

  get income(): number {
    return this._income;
  }

  
  get fieldNames(): Array<string> {
    return this._fieldNames;
  }

  budgetSectionForm = new FormGroup({});

  total: number = 0;

  target: number = 0;

  private _fieldNames: Array<string> = new Array<string>;

  private _income: number = 0;

  constructor() { }

  ngOnInit(): void {
    if(!this.key){
      throw new Error("Key is required.");
      
    }

    let form = JSON.parse(localStorage.getItem(this.key));
    if(form){
      this.budgetSectionForm.patchValue(form);
      this.calculateTotal();
    }
    this.budgetSectionForm.valueChanges.subscribe(() => {
      this.calculateTotal();
      
      localStorage.setItem(this.key, JSON.stringify(this.budgetSectionForm.value))
    })
  }

  camelCase(field: string){
    return camelCase(field);
  }

  private calculateTotal(){
    let total: number = 0;
    Object.keys(this.budgetSectionForm.controls).forEach(key => {
      total += +(this.budgetSectionForm.get(key)?.value ?? 0);
    })

    this.total = total;
  }
}
