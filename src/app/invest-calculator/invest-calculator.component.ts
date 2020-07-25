import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

//ngbDatepicker library installed for datepicker functionality
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invest-calculator',
  templateUrl: './invest-calculator.component.html',
  styleUrls: ['./invest-calculator.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export class InvestCalculatorComponent implements OnInit {

  schemeName: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  fundData: any [];
  units = 0;
  returns = 0;
  today: Date;
  submitted:boolean = false;

  constructor(private http: HttpClient) { 
    this.today = new Date();
  }

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((response) => {
      this.fundData = response as string [];
      this.schemeName = response[0].scheme_name;
    },(error) => {
      console.log(error.message);
    });
  }

  //Required validations for amount, start date and end date
  investmentForm = new FormGroup({
    amount: new FormControl('',[Validators.required]),
    startDate: new FormControl('',[Validators.required]),
    endDate: new FormControl('',[Validators.required])
  })
  
  //Getting controls for validation function
  get investmentFormControl() {
    return this.investmentForm.controls;
  }

  //Function to calculate invested value
  calculate(){
    this.submitted = true;
    if (this.investmentForm.valid) {
      this.dateFilterForData(this.startDate, this.endDate).then((data) => {
        this.units = Math.round(this.amount / Number(data[0].nav));
        var result = this.processNavValue(data, this.units);
        var lastValue = Number(result[result.length - 1]);
        this.returns = lastValue - this.amount;
      });
    }
  }

  //Returns data for particular dates ( data between start date & end date)
  dateFilterForData(startDate, endDate){
    return new Promise((resolve) => {
      const data = this.fundData.filter((data) => {        
        const timeData = new Date(data.date);
        return timeData >= startDate && timeData <= endDate;
      });
      resolve(data)
    });
  }
  
  //Returns the calculated value from NAV and units
  processNavValue(arr, units) {
    return arr.map((data) => {
      const value = data.nav * units;
      return value;
    });
  }
}
