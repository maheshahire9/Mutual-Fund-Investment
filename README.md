Investment Calculator web app

This simple web app calculates the returns on your invested amount in Mutual Fund- Axis Long Term Equity Fund - Direct Plan.
I have used Angular Framework to create this web app and for data of Mutual Fund scheme related I have store the data in JSON format in data.json file
in Assets folder from your the link- http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=53&tp=1&frmdt=01-Apr-2015&todt=21-Apr-2020 provided
by you in the mail.

Implementation details:- 

At first getting the data from data.json file and stored it, then I have taken the invested amount from customer and then the start date of investment 
and likewise the end date and as per your guidelines in mail I have restricted the investments done before 01-Apr-2015 date. After this after clicking 
the 'Calculate' button first it get the data of the dates between the start date and end date used promise here for getting the data by passing the start 
date and end date as parameters, the after from this return data calculated the units of fund scheme available to certain period. So now we want to 
calculate the returns for this I have map the returned data from promise and by this calculating the value for NAV as per units ( NAV * units )
now to calculate returns we substract the ( NAV * units ) values last value from array with amount invested.




