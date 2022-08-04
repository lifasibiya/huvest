import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environments/environment'
import { map } from 'rxjs/operators'
import * as _ from 'lodash'

export interface Tender {
  id: number
  date: any
  title: string
  description: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'huvest';
  tender: Tender[]  = [];
  homeRecords: Tender[]  = [];
  searchData: Tender[]  = [];
  apiUrl: string = environment.api;
  numberOfResult = 10;
  phrase: string | undefined;
  constructor(private http: HttpClient) {
  }

  async ngOnInit() {    
    this.pageRefresh()
  }

  async home() { 
    if (this.phrase?.length == null) {
      this.pageRefresh()
    }
  }

  async pageRefresh() {
    this.tender = await this.get()
    this.tender.sort((a,b) => {
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);
      return date2.getTime() - date1.getTime();
    })
    this.homeRecords = this.tender?.slice(0, 10);
  }

  get = async (): Promise<any> => {
    const headers = new HttpHeaders()
    headers.append("Access-Control-Allow-Origin","*")
    return await this.http.get<Tender>(this.apiUrl)
    .pipe(
      map((result: any) => {
        return result['data']
      })
    )
    .toPromise()
  }

  search = async (phrase?: string): Promise<any> => {
    let searchData: any[] = []
    this.tender?.forEach((r: any) => {
      if (r.title?.includes(phrase) || r.description?.includes(phrase)) {
        searchData.push(r)
      }
    });

    this.searchData = searchData
  }
}
