import { Component } from '@angular/core';

import { RouteTable } from './route-table/route-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouteTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
