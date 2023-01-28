import { Component, OnInit } from '@angular/core';
import { PlaidService } from '../core/services/plaid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private plaidService: PlaidService) { }

  ngOnInit(): void {
    this.plaidService.getLinkToken().subscribe((value) => {
      console.log(value)
    })
  }

}
