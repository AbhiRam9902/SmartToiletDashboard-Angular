

export interface Badge {
  text: string;
  tone: string; 
}

export interface KPI {
  icon: string;
  label: string;
  value: string;
  sub?: string; 
  delta?: string; 
  deltaType?: 'up' | 'down'; 
  badge?: Badge; 
}

export interface Insight {
  icon?: string; 
  badge: Badge; 
  title: string;
  description: string;
}

export interface Anomaly {
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  meta: string; 
}

export interface Repeat {
  badge: string; 
  title: string;
  meta: string; 
}

export interface KPI {

  label: string;
  value: string;
  sub?: string;
  delta?: string;
  deltaType?: 'up' | 'down';
  badge?: Badge;
}
export interface DashboardHeaderData {
  title: string;
  subtitle: string;
}
export interface Insight {
  icon?: string; 
  badge: Badge;
  title: string;
  description: string;
}
export interface ExecutiveSummaryData {
  executiveSummaryTitle: string;
  executiveSummarySubtitle: string;
  kpis: KPI[];
}

export interface SmartAnalyticsData {
  smartAnalyticsTitle: string;
  smartAnalyticsSubtitle: string;
  insights: Insight[];
  anomaliesTitle: string;
  anomalies: Anomaly[];
  repeatTitle: string;
  repeats: Repeat[];
}


export interface Zone {
  id: string;
  name: string;
  status: 'good' | 'warning' | 'critical';
  rating: number;
  aqi: number;
  incidents: number;
  usage: 'Low' | 'Medium' | 'High';
}

export interface ZoneTrendAnalysisData {
  zoneTrendTitle: string;
  zoneTrendSubtitle: string;
  updatedAt: string; 
  zones: Zone[]; 
}