/* tslint:disable */
/* eslint-disable */
/**
 * Giphy
 * Giphy API
 *
 * The version of the OpenAPI document: 1.0
 * Contact: support@giphy.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * The Pagination Object contains information relating to the number of total results available as well as the number of results fetched and their relative positions.
 * @export
 * @interface Pagination
 */
export interface Pagination {
    /**
     * Total number of items returned.
     * @type {number}
     * @memberof Pagination
     */
    count?: number;
    /**
     * Position in pagination.
     * @type {number}
     * @memberof Pagination
     */
    offset?: number;
    /**
     * Total number of items available.
     * @type {number}
     * @memberof Pagination
     */
    totalCount?: number;
}

export function PaginationFromJSON(json: any): Pagination {
    return PaginationFromJSONTyped(json, false);
}

export function PaginationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Pagination {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'offset': !exists(json, 'offset') ? undefined : json['offset'],
        'totalCount': !exists(json, 'total_count') ? undefined : json['total_count'],
    };
}

export function PaginationToJSON(value?: Pagination | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'offset': value.offset,
        'total_count': value.totalCount,
    };
}


