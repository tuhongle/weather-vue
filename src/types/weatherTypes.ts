export interface cityType {
    name: string,
    country: string,
    latlon: string
}

export type DayNight = 'day' | 'night';

export enum Condition {
    CLEAR = 'clear',
    CLOUDY = 'cloudy',
    RAINY = 'rainy',
    SNOWY = 'snowy'
}