import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
declare var require: any;
import * as FileSaver from 'file-saver';
const EXCEL_EXTENSION = '.csv';
import HC_exportData from 'highcharts/modules/export-data';
HC_exportData(Highcharts)
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
    },
    responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
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
        let data: any[] = [];
        stockDataNSE.forEach((item) => {
          let point: any[] = [];
          var date = Date.parse(item.date.split("T", 1) + "T" + item.time);
          point.push(date);
          point.push(item.currentPrice);
          data.push(point);
          
          
        })
        data.sort((n1, n2) => {
          if (n1[0] > n2[0]) {
            return 1;
          } else {
            return -1;
          }
        });
        this.chart=Highcharts.chart('container',this.options);
        this.chart.addSeries({
          name: this.companyCode + " NSE",
          data:data,
          type:"line"
        },true,true);
        this.chart.redraw();
        let data2: any[] = [];
        stockDataBSE.forEach((item) => {
          let point2: any[] = [];
          var date = Date.parse(item.date.split("T", 1) + "T" + item.time);
          point2.push(date);
          point2.push(item.currentPrice);
          data2.push(point2);
          
        })
        data2.sort((n1, n2) => {
          if (n1[0] > n2[0]) {
            return 1;
          } else {
            return -1;
          }
        });
        this.chart.addSeries({
          name: this.companyCode + " BSE",
          data:data2,
          type:"line"
        },true,true);
        this.chart.redraw()
        let data3: any[] = [];
        stockDataCSE.forEach((item) => {
          let point2: any[] = [];
          var date = Date.parse(item.date.split("T", 1) + "T" + item.time);
          point2.push(date);
          point2.push(item.currentPrice);
          data3.push(point2);
          
        })
        data2.sort((n1, n2) => {
          if (n1[0] > n2[0]) {
            return 1;
          } else {
            return -1;
          }
        });
        this.chart.addSeries({
          name: this.companyCode + " CSE",
          data:data3,
          type:"line"
        },true,true);
        this.chart.redraw()
      })
    });
  }
  downlaodExcel() {
    this.saveAsExcelFile(this.chart.getCSV(), "StockFile");
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "text/csv"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}