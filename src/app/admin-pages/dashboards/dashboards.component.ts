import { Component, OnInit } from '@angular/core';
import {DashboardCount} from './dashboard.objects';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  public dashboard_data = new DashboardCount();
  constructor() { }

  ngOnInit() {
  }

}
