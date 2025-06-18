import { Component, ViewChild, inject } from '@angular/core';
import { routes } from '../data/mock-data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subject, takeUntil, tap, filter } from 'rxjs';
import { Route } from '../types/route';

@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './route-table.html',
  styleUrl: './route-table.css',
})
export class RouteTable {
  private _liveAnnouncer = inject(LiveAnnouncer);

  private destroy$ = new Subject<void>();

  protected title = 'NDM';
  displayedColumns: string[] = ['address', 'gateway', 'interface'];
  dataSource = new MatTableDataSource(routes);

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (
        item: Route,
        property: string
      ): string | number => {
        if (property === 'address' || property === 'gateway') {
          return this.createSortKey(item, property);
        }

        return item[property as keyof Route];
      };

      this.sort.sortChange
        .pipe(
          takeUntil(this.destroy$),
          tap((sortState: Sort) => {}),
          filter((sortState: Sort) => {
            return sortState.active !== '';
          })
        )
        .subscribe({
          next: (sortState: Sort) => {
            this.handleSortChange(sortState);
          },
          error: (error) => {
            console.error('Error', error);
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createSortKey(item: Route, property: 'address' | 'gateway'): string {
    const ipPart = this.ipToNumber(item[property]).toString().padStart(12, '0');

    if (property === 'address') {
      const maskPart = (99 - parseInt(item.mask, 10))
        .toString()
        .padStart(2, '0');
      return `${ipPart}_${maskPart}`;
    }

    return ipPart;
  }

  private handleSortChange(sortState: Sort): void {
    this.announceSortChange(sortState);
  }

  private ipToNumber(ip: string): number {
    return ip
      .split('.')
      .map(Number)
      .reduce((acc, part) => (acc << 8) + part, 0);
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
