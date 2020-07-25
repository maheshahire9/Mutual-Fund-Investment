import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

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
  today

  submitted:boolean = false;

  constructor(private http: HttpClient) { 
    this.today = new Date();
  }

  investmentForm = new FormGroup({
    amount: new FormControl('',[Validators.required]),
    startDate: new FormControl('',[Validators.required]),
    endDate: new FormControl('',[Validators.required]),
  })  

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((data) => {
      
      this.fundData = data as string [];
      console.log("funddata",this.fundData );
      this.schemeName = data[0].scheme_name;
    },(err) => {
      console.log (err.message);
    });
  }

  get investmentFormControl() {
    return this.investmentForm.controls;
  }

  calculate(){
    this.submitted = true;
    if (this.investmentForm.valid) {
      this.dateFilterForData(this.startDate, this.endDate).then((data) => {
        console.log("data", data);

        this.units = Math.round(this.amount / Number(data[0].nav));

        var resultData = this.processNavValue(data, this.units);
        console.log("resultData", resultData);
        console.log("resultData", resultData[resultData.length - 1]);
        
        this.returns = Math.round(this.amount - resultData[resultData.length - 1]);
      });
    }
  }

  processNavValue(arr, units) {
    return arr.map((data) => {
      const val = data.nav * units;
      return val;
    });
  }

  dateFilterForData(startDate, endDate){
    return new Promise((resolve) => {
      const data = this.fundData.filter((data) => {        
        const timestamp = new Date(data.date);
        return timestamp >= startDate && timestamp <= endDate;
      });
      resolve(data)
    });
  }

}
