import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  companies: any[] = [];
  company1:any;
  company2:any;
  dataLoaded: Promise<boolean>;
  stockData: any[];
  chart:Highcharts.Chart;
  companyCode: string;

  public options: any = {
    chart: {
      type: 'line',
      height: 700
    },
    title: {
      text: 'Stock Price'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return 'x: ' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +
          ' y: ' + this.y.toFixed(2);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.value);
        }
      }
    }
  }
  constructor(private endpointService: CompanyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.companyCode = this.activatedRoute.snapshot.params['code'];
    this.endpointService.getAllCompanies().subscribe((response: any) => {
      this.companies = response;
      this.dataLoaded = Promise.resolve(true);
      this.chart=Highcharts.chart('container', this.options);
      this.endpointService.getStockPrice(this.companyCode).subscribe((response: any) => {
        this.stockData = response;
        let data: any[] = [];
        let stockDataNSE: any[] = [];
        let stockDataBSE: any[] = [];
        let stockDataCSE: any[] = [];
        this.stockData.forEach((item) =>{
          if(item.stockExchange == "NSE"){
            stockDataNSE.push(item);
          }
          if(item.stockExchange == "BSE"){
            stockDataBSE.push(item);
          }
          if(item.stockExchange == "CSE"){
            stockDataCSE.push(item);
          }
        });
        this.stockData.forEach((item) => {
          let point: any[] = [];
          var date = Date.parse(item.date.split("T", 1) + "T" + item.time);
          point.push(date);
          point.push(item.currentPrice);
          data.push(point);
          data.sort((n1, n2) => {
            if (n1[0] > n2[0]) {
              return 1;
            } else {
              return -1;
            }
          });
          this.chart=Highcharts.chart('container',this.options);
          this.chart.addSeries({
            name: this.companyCode,
            data:data,
            type:"line"
          },true,true);
          
        })
      })
    });
    
  }
//   filterSelectedData() {
//     this.endpointService.getStockPrice(this.companyCode).subscribe((response: any) => {
//       this.stockData = response;
//       console.log(response)
//       let data: any[] = [];
//       let stockDataNSE: any[] = [];
//       let stockDataBSE: any[] = [];
//       let stockDataCSE: any[] = [];
//       this.stockData.forEach((item) =>{
//         if(item.stockExchange == "NSE"){
//           stockDataNSE.push(item);
//         }
//         if(item.stockExchange == "BSE"){
//           stockDataBSE.push(item);
//         }
//         if(item.stockExchange == "CSE"){
//           stockDataCSE.push(item);
//         }
//       });
//       this.stockData.forEach((item) => {
//         let point: any[] = [];
//         var date = Date.parse(item.date.split("T", 1) + "T" + item.time);
//         point.push(date);
//         point.push(item.currentPrice);
//         data.push(point);
//         data.sort((n1, n2) => {
//           if (n1[0] > n2[0]) {
//             return 1;
//           } else {
//             return -1;
//           }
//         });
//         console.log(data)
//         this.chart=Highcharts.chart('container',this.options);
//         this.chart.addSeries({
//           name: this.companyCode,
//           data:data,
//           type:"line"
//         },true,true);
        
//       })
//     //   data = [];
//     //   stockDataNSE.forEach((item) => {
//     //     let point: any[] = [];
//     //     var date = Date.parse(item.date.split("T", 1) + "T" + item.time);
//     //     point.push(date);
//     //     point.push(item.currentPrice);
//     //     data.push(point);
//     //     data.sort((n1, n2) => {
//     //       if (n1[0] > n2[0]) {
//     //         return 1;
//     //       } else {
//     //         return -1;
//     //       }
//     //     });
//     //     console.log(data)
//     //     this.chart=Highcharts.chart('container',this.options);
//     //     this.chart.addSeries({
//     //       name: "NSE",
//     //       data:data,
//     //       type:"line"
//     //     },true,true);
//     //   this.chart.redraw()
//     //   })
//     })
// }
}