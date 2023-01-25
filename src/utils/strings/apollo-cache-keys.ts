/* eslint-disable max-len */
const matchKeyString = (arr: String[]): string => arr.map((str) => JSON.stringify(str)).join();

const specimenQueryString = 'aio_specimen';
const donorTableDataKey = 'DonorsTableData';

export const donorTableDataCacheKey = (filter: String[], sort: String[]) =>
    `${specimenQueryString}:${donorTableDataKey}({"filter":[${matchKeyString(filter)}],"sort":[${matchKeyString(
        sort
    )}]})`;
