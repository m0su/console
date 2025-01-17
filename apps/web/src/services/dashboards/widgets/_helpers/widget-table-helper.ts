import dayjs from 'dayjs';
import { cloneDeep, sortBy } from 'lodash';

import type { AllReferenceTypeInfo, ReferenceType } from '@/store/modules/reference/type';

import { getTimeUnitByPeriod } from '@/services/cost-explorer/lib/helper';
import type { DateRange } from '@/services/dashboards/config';
import type { Field } from '@/services/dashboards/widgets/_components/type';
import type { Granularity, GroupBy } from '@/services/dashboards/widgets/_configs/config';
import type { CostAnalyzeDataModel } from '@/services/dashboards/widgets/type';

/**
 * @name getWidgetTableDateFields
 * @description Get refined PDataTable fields.
 * @example [{ name: 'usd_cost_sum.0.value', label: '2022-09' }, ...]
 */
export const getWidgetTableDateFields = (
    granularity: Granularity,
    dateRange: DateRange,
    textOptions: Field['textOptions'],
    fieldsKey = 'usd_cost',
): Field[] => {
    if (!granularity || !dateRange?.end) return [];
    const dateFields: Field[] = [];
    const start = dayjs.utc(dateRange.start);
    const end = dayjs.utc(dateRange.end);

    const timeUnit = getTimeUnitByPeriod(granularity, start, end);
    let labelDateFormat = 'M/D';
    if (timeUnit === 'month') {
        labelDateFormat = 'MMM';
    } else if (timeUnit === 'year') {
        labelDateFormat = 'YYYY';
    }

    let now = start;
    let count = 0;
    while (now.isSameOrBefore(end, timeUnit)) {
        dateFields.push({
            name: `${fieldsKey}_sum.${count}.value`,
            label: now.locale('en').format(labelDateFormat),
            textAlign: 'right',
            textOptions,
        });
        now = now.add(1, timeUnit);
        count += 1;
    }
    return dateFields;
};

/**
 * @name getRefinedDateTableData
 * @description set data of empty date. This is necessary for index-oriented fields, like `usd_cost_sum.0.value`
 * @example (before) [{ date: '2023-01', provider: 'aws' }]
 * @example (after) [{ date: '2023-01', provider: 'aws' }, { date: '2022-10' }, { date: '2022-11' }, { date: '2022-12' }]
 */
export const getRefinedDateTableData = (
    results: CostAnalyzeDataModel['results'],
    dateRange: DateRange,
    fieldsKey = 'usd_cost_sum',
): CostAnalyzeDataModel['results'] => {
    if (!results?.length) return [];
    const _results = cloneDeep(results);
    results.forEach((result, idx) => {
        const _fieldsData = cloneDeep(result[fieldsKey]);
        let now = dayjs.utc(dateRange.start).clone();
        while (now.isSameOrBefore(dayjs.utc(dateRange.end), 'month')) {
            const _date = now.format('YYYY-MM');
            if (!_fieldsData.filter((d) => d.date === _date)?.length) {
                _fieldsData.push({ date: _date });
            }
            now = now.add(1, 'month');
        }
        _results[idx][fieldsKey] = _fieldsData;
    });
    return _results;
};

export const sortTableData = (rawData: CostAnalyzeDataModel['results'], sortKey = 'date'): CostAnalyzeDataModel['results'] => {
    const results: CostAnalyzeDataModel['results'] = [];
    rawData.forEach((d) => {
        let _usdCostSum = d.usd_cost_sum;
        let _usageQuantitySum = d.usage_quantity_sum;
        if (typeof d.usd_cost_sum === 'object') {
            _usdCostSum = sortBy(d.usd_cost_sum, sortKey);
        }
        if (typeof d.usage_quantity_sum === 'object') {
            _usageQuantitySum = sortBy(d.usage_quantity_sum, sortKey);
        }
        results.push({
            ...d,
            usd_cost_sum: _usdCostSum,
            usage_quantity_sum: _usageQuantitySum,
        });
    });
    return results;
};

export const getReferenceTypeOfGroupBy = (allReferenceTypeInfo: AllReferenceTypeInfo, groupBy: GroupBy): ReferenceType | undefined => {
    const referenceTypeInfo = Object.values(allReferenceTypeInfo).find((info) => info.key === groupBy);
    if (referenceTypeInfo) return referenceTypeInfo.type;
    return undefined;
};
