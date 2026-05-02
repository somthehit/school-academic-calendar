export interface MonthData {
  name: string;
  days: (string | null)[];
  stats: {
    schoolOpen: number;
    teachingDays: number;
    saturdays: number;
    sundays: number;
    holidays: number;
    examHolidays: number;
    extra: number;
    total: number;
  };
}

export interface CalendarState {
  year: string;
  schoolName: string;
  location: string;
  months: MonthData[];
}
