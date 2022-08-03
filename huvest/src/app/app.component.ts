import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environments/environment'
import { filter, map } from 'rxjs/operators'
import { Observable } from 'rxjs';

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
    this.tender = await this.get()
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
