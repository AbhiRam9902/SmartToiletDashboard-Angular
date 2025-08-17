import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { ExecutiveSummaryComponent } from './executive-summary/executive-summary.component';
import { SmartAnalyticsComponent } from './smart-analytics/smart-analytics.component';
import { ZoneTrendAnalysisComponent } from './zone-trend-analysis/zone-trend-analysis.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'

import { NzGridModule } from 'ng-zorro-antd/grid';
 import { NzCardModule } from 'ng-zorro-antd/card';
 import { NzIconModule } from 'ng-zorro-antd/icon';
 import { NzTagModule } from 'ng-zorro-antd/tag';
 import { NzStatisticModule } from 'ng-zorro-antd/statistic';
 import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    ExecutiveSummaryComponent,
    SmartAnalyticsComponent,
    ZoneTrendAnalysisComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzTagModule,
    NzStatisticModule,
    NzDividerModule,
    NzButtonModule
  ],
  exports:[
DashboardComponent
  ]
})
export class DashboardModule { }
