import { Component, OnInit } from '@angular/core';

import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

import { CoindeskService } from './coindesk.service';
import { IBitcoinStatus } from './IBitcoinStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  faBitcoin = faBitcoin;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;

  title = 'bitapp';
  bitcoinData!: IBitcoinStatus;
  change!: number;

  constructor(private coindesk: CoindeskService) {}

  ngOnInit(): void {
    this.getCoindeskData();
  }

  calculateChange(): void {
    var open = this.bitcoinData.open as number;
    var last = this.bitcoinData.last as number;

    var difference = last - open;
    var sum = last * 1 + open * 1;
    this.change = difference / (sum / 2);
  }

  private getCoindeskData(): void {
    this.coindesk.get().subscribe((response) => {
      this.bitcoinData = response;
      this.calculateChange();
    });
  }
}
