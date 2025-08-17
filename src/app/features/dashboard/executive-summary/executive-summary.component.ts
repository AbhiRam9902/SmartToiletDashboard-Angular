import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DashboardDataService } from 'src/app/shared/services/dashboard-data.service';
import { ExecutiveSummaryData } from 'src/app/shared/interfaces/dashboard.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.scss'],
})
export class ExecutiveSummaryComponent implements OnInit, OnDestroy {
  executiveSummaryData: ExecutiveSummaryData | undefined;
  private dataSubscription: Subscription | undefined;

  constructor(
    private dashboardDataService: DashboardDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSubscription =
      this.dashboardDataService.executiveSummaryData$.subscribe((data) => {
        this.executiveSummaryData = data;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  getDeltaArrow(type: 'up' | 'down' | undefined): string {
    return type === 'up' ? 'arrow_upward' : 'arrow_downward';
  }

  getKpiIcon(label: string): string {
    switch (label) {
      case 'Avg Feedback Rating':
        return 'star';
      case 'Air Quality Compliance %':
        return 'check-circle';
      case 'Total Footfall Today':
        return 'team';
      case 'Peak Usage Hours':
        return 'field-time';
      case 'Total Incidents':
        return 'warning';
      default:
        return 'question-circle';
    }
  }
  getKpiIconColor(label: string): string {
    switch (label) {
      case 'Avg Feedback Rating':
        return 'var(--color-orange)';
      case 'Air Quality Compliance %':
        return 'var(--color-green)';
      case 'Total Footfall Today':
        return 'var(--color-blue)';
      case 'Peak Usage Hours':
        return 'var(--color-purple)';
      case 'Total Incidents':
        return 'var(--color-red)';
      default:
        return 'var(--icon-color-default)';
    }
  }
}
