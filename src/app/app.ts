import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

const routes: Route[] = [
  {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    address: '192.168.1.100',
    mask: '24',
    gateway: '192.168.1.1',
    interface: 'eth0',
  },
  {
    uuid: '234f5678-f9ab-23c4-b567-537725285001',
    address: '10.0.0.200',
    mask: '24',
    gateway: '10.0.0.1',
    interface: 'wlan0',
  },
  {
    uuid: '345g6789-g0ab-34d5-c678-648836396002',
    address: '172.16.2.50',
    mask: '8',
    gateway: '172.16.2.1',
    interface: 'eth1',
  },
  {
    uuid: '456h789a-h1bc-45e6-d789-759947407003',
    address: '192.168.2.10',
    mask: '24',
    gateway: '192.168.2.1',
    interface: 'eth0',
  },
  {
    uuid: '567i89ab-i2cd-56ef-9abc-86aa58518004',
    address: '10.0.0.50',
    mask: '32',
    gateway: '10.10.10.1',
    interface: 'wlan1',
  },
  {
    uuid: '678j9abc-j3de-67fg-abcd-97bb69629005',
    address: '172.16.3.200',
    mask: '24',
    gateway: '172.16.3.1',
    interface: 'eth2',
  },
  {
    uuid: '789kabcd-k4ef-78gh-bcde-a8cc7873a006',
    address: '192.168.3.50',
    mask: '8',
    gateway: '192.168.3.1',
    interface: 'eth0',
  },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTableModule, MatSortModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private _liveAnnouncer = inject(LiveAnnouncer);
  protected title = 'NDM';
  displayedColumns: string[] = ['address', 'gateway', 'interface'];
  dataSource = new MatTableDataSource(routes);

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
