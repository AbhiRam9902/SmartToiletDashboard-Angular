import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DashboardDataService } from 'src/app/shared/services/dashboard-data.service';
import {
  ZoneTrendAnalysisData,
  Zone,
} from 'src/app/shared/interfaces/dashboard.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zone-trend-analysis',
  templateUrl: './zone-trend-analysis.component.html',
  styleUrls: ['./zone-trend-analysis.component.scss'],
})
export class ZoneTrendAnalysisComponent implements OnInit, OnDestroy {
  zoneTrendData: ZoneTrendAnalysisData | undefined;
  private dataSubscription: Subscription | undefined;

  constructor(
    private dashboardDataService: DashboardDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSubscription =
      this.dashboardDataService.zoneTrendAnalysisData$.subscribe((data) => {
        this.zoneTrendData = data;
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  getZoneStatusClass(status: 'good' | 'warning' | 'critical'): string {
    switch (status) {
      case 'good':
        return 'status-good';
      case 'warning':
        return 'status-warning';
      case 'critical':
        return 'status-critical';
      default:
        return '';
    }
  }

  getUsageBadgeClass(usage: 'Low' | 'Medium' | 'High'): string {
    switch (usage) {
      case 'Low':
        return 'low';
      case 'Medium':
        return 'medium';
      case 'High':
        return 'high';
      default:
        return '';
    }
  }

  getMetricIcon(metric: string): string {
    switch (metric) {
      case 'rating':
        return 'star';
      case 'aqi':
        return 'air';
      case 'incidents':
        return 'notifications_active';
      case 'usage':
        return 'trending_up';
      default:
        return 'help';
    }
  }

  formatUpdateTime(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  trackById(index: number, zone: Zone): string {
    return zone.id;
  }
}
