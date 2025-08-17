import { Injectable } from '@angular/core'; // Removed ChangeDetectorRef as it's not needed here
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import headerData from '../../../assets/dashboard-header.json';
import executiveSummaryData from '../../../assets/executice-summary.json';
import smartAnalyticsData from '../../../assets/smart-analytics.json';
import initialZoneData from '../../../assets/zone-trend-analysis.json';

import {
  DashboardHeaderData,
  ExecutiveSummaryData,
  SmartAnalyticsData,
  ZoneTrendAnalysisData,
  KPI,
  Insight,
  Anomaly,
  Repeat,
  Zone,
} from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private headerSubject = new BehaviorSubject<DashboardHeaderData>(
    headerData as DashboardHeaderData
  );
  private executiveSummarySubject = new BehaviorSubject<ExecutiveSummaryData>(
    executiveSummaryData as ExecutiveSummaryData
  );
  private smartAnalyticsSubject = new BehaviorSubject<SmartAnalyticsData>(
    smartAnalyticsData as SmartAnalyticsData
  );
  private zoneTrendAnalysisSubject = new BehaviorSubject<ZoneTrendAnalysisData>(
    initialZoneData as ZoneTrendAnalysisData
  );

  headerData$: Observable<DashboardHeaderData> =
    this.headerSubject.asObservable();
  executiveSummaryData$: Observable<ExecutiveSummaryData> =
    this.executiveSummarySubject.asObservable();
  smartAnalyticsData$: Observable<SmartAnalyticsData> =
    this.smartAnalyticsSubject.asObservable();
  zoneTrendAnalysisData$: Observable<ZoneTrendAnalysisData> =
    this.zoneTrendAnalysisSubject.asObservable();

  constructor(private http: HttpClient) {
    timer(3000, 7000).subscribe(() => this.generateNewData());
  }

  private generateNewData(): void {
    const currentExecData = this.executiveSummarySubject.getValue();
    const updatedKpis: KPI[] = currentExecData.kpis.map((kpi) => {
      let newValue = kpi.value;
      let newDelta = kpi.delta;
      let newDeltaType = kpi.deltaType;

      switch (kpi.label) {
        case 'Avg Feedback Rating':
          const currentRating = parseFloat(kpi.value.split('/')[0]);
          const ratingChange = Math.random() * 0.2 - 0.1;
          const newRatingVal = Math.min(
            5.0,
            Math.max(3.5, currentRating + ratingChange)
          ).toFixed(1);
          newValue = `${newRatingVal}/5`;
          newDelta = `${(Math.random() * 3 + 1).toFixed(0)}% vs last week`;
          newDeltaType =
            parseFloat(newRatingVal) > currentRating ? 'up' : 'down';
          break;
        case 'Air Quality Compliance %':
          const currentCompliance = parseFloat(kpi.value);
          const complianceChange = Math.random() * 1.5 - 0.75;
          const newComplianceVal = Math.min(
            99.5,
            Math.max(88, currentCompliance + complianceChange)
          ).toFixed(1);
          newValue = `${newComplianceVal}%`;
          newDelta = `${Math.random() > 0.5 ? '+' : '-'}${(
            Math.random() * 1.5 +
            0.5
          ).toFixed(1)}% vs last week`;
          newDeltaType =
            parseFloat(newComplianceVal) > currentCompliance ? 'up' : 'down';
          break;
        case 'Total Footfall Today':
          const currentFootfall = parseInt(kpi.value.replace(/,/g, ''));
          const footfallChange = Math.floor(Math.random() * 100 - 40);
          const newFootfallVal = Math.max(
            800,
            currentFootfall + footfallChange
          );
          newValue = newFootfallVal.toLocaleString();
          newDelta = `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(
            Math.random() * 7 + 1
          )}% vs yesterday`;
          newDeltaType = newFootfallVal > currentFootfall ? 'up' : 'down';
          break;
        case 'Peak Usage Hours':
          const currentMaxHr = parseInt(kpi.sub!.split('/')[0]);
          const maxHrChange = Math.floor(Math.random() * 10 - 5);
          const newMaxHrVal = Math.max(120, currentMaxHr + maxHrChange);
          kpi.sub = `${newMaxHrVal}/hr max today`;
          break;
        case 'Total Incidents':
          const currentIncidents = parseInt(kpi.value);
          const incidentChange = Math.floor(Math.random() * 3 - 1);
          const newIncidentVal = Math.max(0, currentIncidents + incidentChange);
          newValue = newIncidentVal.toString();
          newDelta = `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(
            Math.random() * 4 + 1
          )}% vs last week`;
          newDeltaType = newIncidentVal < currentIncidents ? 'up' : 'down';
          break;
      }
      return {
        ...kpi,
        value: newValue,
        delta: newDelta,
        deltaType: newDeltaType,
      };
    });
    this.executiveSummarySubject.next({
      ...currentExecData,
      kpis: updatedKpis,
    });

    const currentSmartAnalyticsData = this.smartAnalyticsSubject.getValue();
    const updatedInsights: Insight[] = currentSmartAnalyticsData.insights.map(
      (insight) => {
        let newDescription = insight.description;
        switch (insight.badge.text) {
          case 'Descriptive':
            const newDeltaPct = (Math.random() * 15 + 15).toFixed(0);
            newDescription = `Wednesdays show ${newDeltaPct}% higher average footfall in Lobby Zones`;
            break;
          case 'Predictive':
            const newChance = Math.floor(Math.random() * 20) + 70;
            const newPeople = Math.floor(Math.random() * 30) + 140;
            newDescription = `${newChance}% chance of >${newPeople} people/hour in Lobby L1 at 3 PM tomorrow`;
            break;
          case 'Correlated':
            const newCorrelation = (Math.random() * 0.2 + 0.6).toFixed(2);
            newDescription = `Footfall in Lobby L1 strongly correlates with Washroom M1 (r = ${newCorrelation})`;
            break;
          case 'Actionable':
            const time = `${Math.floor(Math.random() * 4) + 1} PM`;
            newDescription = `High Footfall Expected at ${time} — Suggest Cleaning Prep`;
            break;
        }
        return { ...insight, description: newDescription };
      }
    );

    const anomalyTypes = [
      {
        type: 'Ammonia Spike',
        details: 'Sensor reading exceeded threshold',
        severity: 'High',
      },
      {
        type: 'Soap Dispensed',
        details: 'Event without matching occupancy',
        severity: 'Medium',
      },
      {
        type: 'No Feedback',
        details: 'No user feedback despite heavy usage',
        severity: 'Low',
      },
      {
        type: 'Water Leak',
        details: 'Intermittent signal detected',
        severity: 'High',
      },
    ];
    const randomAnomalyType =
      anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
    const newAnomaly: Anomaly = {
      severity: randomAnomalyType.severity as 'High' | 'Medium' | 'Low',
      title: `${randomAnomalyType.type} Detected`,
      meta: `Washroom ${
        Math.random() > 0.5 ? 'L1' : 'M2'
      } • ${new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
    };
    const updatedAnomalies = [
      newAnomaly,
      ...currentSmartAnalyticsData.anomalies,
    ].slice(0, 3);

    const repeatIssueTypes = [
      {
        badge: '4x in 3 Days',
        title: 'Bin Overflow Recurring',
        meta: 'Lobby M1 • This Week',
      },
      {
        badge: '3x This Week',
        title: 'No Paper Detected',
        meta: 'Washroom F2 • Last 7 Days',
      },
      {
        badge: '5x This Month',
        title: 'Air Quality Alerts',
        meta: 'Office O3 • Last 30 Days',
      },
      {
        badge: '2x Today',
        title: 'Water Pressure Drop',
        meta: 'Washroom L1 • Today',
      },
    ];
    const randomRepeatIssue =
      repeatIssueTypes[Math.floor(Math.random() * repeatIssueTypes.length)];
    const updatedRepeats = [
      randomRepeatIssue,
      ...currentSmartAnalyticsData.repeats,
    ].slice(0, 3);

    this.smartAnalyticsSubject.next({
      ...currentSmartAnalyticsData,
      insights: updatedInsights,
      anomalies: updatedAnomalies,
      repeats: updatedRepeats,
    });
  }

  private clamp(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v));
  }
  private randStep(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  private pick<T>(arr: T[], except: T): T {
    const candidates = arr.filter((x) => x !== except);
    return candidates[Math.floor(Math.random() * candidates.length)] || except;
  }
}
