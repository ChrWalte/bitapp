import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBitcoinStatus } from './IBitcoinStatus';

@Injectable({
  providedIn: 'root',
})
export class CoindeskService {
  readonly httpHeader: any = {
    headers: [new HttpHeaders({ 'Content-Type': 'application/json' })],
  };

  constructor(private http: HttpClient) {}

  get(): Observable<IBitcoinStatus> {
    return this.http
      .get(
        'https://api.pro.coinbase.com/products/btc-usd/stats',
        this.httpHeader
      )
      .pipe(map((response: any) => response as IBitcoinStatus));
  }
}
