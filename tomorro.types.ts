// Global types

export interface Period {
  from: Date;
  until: Date;
}

enum DateAggregation {
  Daily,
  Weekly,
  Monthly,
  Quarterly,
}

type WithOrgID<T> = T & {
  orgId: string;
};

type WithTimestamps<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

export enum CalculationMethod {
  Spend,
  Average,
  Distance,
}

// Domains

namespace Ingestable {
  export enum InputMethod {
    Form,
    Template,
  }

  export enum State {
    Draft,
    Pending,
    Approved,
    Rejected,
  }

  export type Activity = { [x: number]: any };

  export interface Item {
    id: string;
    subchildId: string;
    period: Period;
    activity: Activity;
    state: State;
    inputMethod: InputMethod;
    calculationMethod: CalculationMethod;
  }

  export type Record = WithOrgID<WithTimestamps<Item>>;
}

export namespace Calculation {
  export interface Item {
    id: string;
    subchildId: string;
    date: Date;
    emissions: number;
    calculationMethod: CalculationMethod;
  }

  export type Record = WithOrgID<WithTimestamps<Item>>;
}

export namespace Report {
  export interface Item {
    coverage: string[];
    objectId: string;
    period: Period;
  }

  export type Record = WithOrgID<WithTimestamps<Item>>;
}

export namespace Settings {
  export interface Item<T> {
    key: string;
    value: T;
  }

  export type Record<T> = WithOrgID<Item<T>>;
}

export namespace Dashboard {
  export interface Vault {}

  export interface Breakdown {}

  export interface Timeseries {}
}

export namespace Admin {
  export interface BacklogItem extends Ingestable.Record {
    parentDisplayName: string;
    childDisplayName: string;
    subchildDisplayName: string;
  }

  export interface ActivityItem {
    displayName: string;
    value: string;
    key: string;
  }
}

// REST API

// Ingestion Service

interface PostIngestionTemplate {
  subchildId: string;
  activity: Blob;
}

interface PostIngestionTemplateResponse {
  item: Ingestable.Item;
}

interface PostIngestionForm {
  subchildId: string;
  activity: Ingestable.Activity;
}

interface PostIngestionFormResponse {
  item: Ingestable.Item;
}

interface GetIngestion {
  ids: string[];
  filter: {
    // Provides additional filtering options
    period: Period;
    subchildIds: string[];
  };
}

interface GetIngestionResponse {
  // Always returns an array regardless of length
  items: Ingestable.Item[];
}

// Calculation service

interface PostCalculation {
  subchildId: string;
  calculationMethod: string;
  period: Period;
  activity: Ingestable.Activity;
}

interface GetCalculation {
  period: Period;
  coverage: string[];
  aggregate: DateAggregation;
}

interface GetCalculationResponse {
  items: Calculation.Item[];
}

// Report service

interface PostReport {
  coverage: string[];
  period: Period;
  aggregate: DateAggregation;
}

interface PostReportResponse {
  item: Report.Item;
}

interface GetReportResponse {
  items: Report.Item[];
}

// Dashboard service

interface GetDashboardResponse {
  breakdown: {};
  vault: any;
  timeseries: any;
}

// Admin service

interface GetAdminIngestionBacklogResponse {
  items: Admin.BacklogItem[];
}

interface GetAdminIngestionActivityResponse {
  items: Admin.ActivityItem[];
}
