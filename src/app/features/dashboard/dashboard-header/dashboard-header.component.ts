import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DashboardDataService } from 'src/app/shared/services/dashboard-data.service';
import { DashboardHeaderData } from 'src/app/shared/interfaces/dashboard.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  headerData: DashboardHeaderData | undefined;
  private dataSubscription: Subscription | undefined;

  constructor(private dashboardDataService: DashboardDataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataSubscription = this.dashboardDataService.headerData$.subscribe(data => {
      this.headerData = data;
      this.cdr.detectChanges(); 
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
