import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  readonly fixedPercent = .6;
  readonly investmentsPercent = .1;
  readonly savingsPercent = .1;
  readonly guiltFreePercent = .2;
  
  income: number = 0;

  fixedKey: string = "FixedBudgetSection"

  fixedFields: Array<string> = ['Mortgage', 'Utilities', 'Car', 'Gas/Transportation', 'Groceries', 'Loans', 'Pets', 'Other']

  investmentsKey: string = "InvestmentsBudgetSection"

  investmentsFields: Array<string> = ['401(k)', 'Roth IRA']

  savingsKey: string = "SavingsBudgetSection"

  savingsFields: Array<string> = ['Savings']

  guiltFreeKey: string = "GuiltFreeBudgetSection"

  guiltFreeFields: Array<string> = ['Entertainment', 'Shopping', 'Dining Out', 'Gym', 'Other']

  constructor() {
    let income = JSON.parse(localStorage.getItem("budgetIncome"));
    if(income){
      this.income = income;
    } 
  }

  ngOnInit(): void {
    
  }

  onIncomeChanged(income: number){
    localStorage.setItem("budgetIncome", JSON.stringify(income))
  }
}
