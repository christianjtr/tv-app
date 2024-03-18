export const TimeWindowOptions = ['day', 'week'] as const;
export type TimeWindow = (typeof TimeWindowOptions)[number];
