import type { TranslateResult } from 'vue-i18n';

export interface HistoryDataModel {
    more?: boolean;
    results: Array<{
        [groupBy: string]: string | any; // product: 'AmazonCloudFront'
        usd_cost_sum?: Array<{
            date: string;
            value: number
        }>;
        usage_quantity_sum?: Array<{
            date: string;
            value: number
        }>;
    }>;
}

export interface XYChartData {
    date: string; // date: '2022-09'
    [resourceName: string]: number | any; // AmazonCloudFront: 12333
}

export interface Legend {
    name: string;
    label?: TranslateResult;
    disabled?: boolean;
}
