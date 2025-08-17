// src/app/dashboard/smart-analytics/smart-analytics.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DashboardDataService } from 'src/app/shared/services/dashboard-data.service';
import {
  SmartAnalyticsData,
  Insight,
  Anomaly,
  Repeat,
} from 'src/app/shared/interfaces/dashboard.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-smart-analytics',
  templateUrl: './smart-analytics.component.html',
  styleUrls: ['./smart-analytics.component.scss'],
})
export class SmartAnalyticsComponent implements OnInit, OnDestroy {
  smartAnalyticsData: SmartAnalyticsData | undefined;
  private dataSubscription: Subscription | undefined;

  constructor(
    private dashboardDataService: DashboardDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSubscription =
      this.dashboardDataService.smartAnalyticsData$.subscribe((data) => {
        this.smartAnalyticsData = data;
        this.cdr.detectChanges(); // Manually trigger change detection
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  getSeverityBadgeClass(severity: string): string {
    switch (severity) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warn';
      case 'Low':
        return 'info';
      default:
        return '';
    }
  }

  // --- Insight Card Icon & Color (No Change) ---
  getInsightIcon(badgeText: string): string {
    switch (badgeText) {
      case 'Descriptive':
        return 'analytics';
      case 'Predictive':
        return 'auto_awesome_motion';
      case 'Correlated':
        return 'scatter_plot';
      case 'Actionable':
        return 'gavel';
      default:
        return 'lightbulb';
    }
  }

  getInsightIconColor(badgeTone: string): string {
    switch (badgeTone) {
      case 'green':
        return 'var(--color-green)';
      case 'blue':
        return 'var(--color-blue)';
      case 'purple':
        return 'var(--color-purple)';
      case 'orange':
        return 'var(--color-orange)';
      default:
        return 'var(--icon-color-default)';
    }
  }

  getAnomalyIcon(title: string): string {
    if (title.includes('Ammonia Spike') || title.includes('Water Leak'))
      return 'error';
    if (title.includes('Soap Dispensed')) return 'warning';
    if (title.includes('No Feedback')) return 'info';
    return 'notification_important';
  }

  getAnomalyIconColor(severity: 'High' | 'Medium' | 'Low'): string {
    switch (severity) {
      case 'High':
        return 'var(--color-red)';
      case 'Medium':
        return 'var(--color-orange)';
      case 'Low':
        return 'var(--color-blue)';
      default:
        return 'var(--icon-color-default)';
    }
  }

  getRepeatIcon(title: string): string {
    if (title.includes('Bin Overflow')) return 'delete';
    if (title.includes('No Paper')) return 'receipt_long';
    if (title.includes('Air Quality')) return 'air';
    if (title.includes('Water Pressure')) return 'warning';
    return 'repeat';
  }

  getRepeatIconColor(title: string): string {
    return 'var(--color-purple)';
  }
}
