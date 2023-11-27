/* tslint:disable */
/* eslint-disable */
/**
 * @fastify/swagger
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 8.12.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Printer } from './Printer';
import {
    PrinterFromJSON,
    PrinterFromJSONTyped,
    PrinterToJSON,
} from './Printer';
import type { UserFile } from './UserFile';
import {
    UserFileFromJSON,
    UserFileFromJSONTyped,
    UserFileToJSON,
} from './UserFile';

/**
 * 
 * @export
 * @interface PrinterJob
 */
export interface PrinterJob {
    /**
     * 
     * @type {number}
     * @memberof PrinterJob
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof PrinterJob
     */
    status: PrinterJobStatusEnum;
    /**
     * 
     * @type {number}
     * @memberof PrinterJob
     */
    printer_id: number;
    /**
     * 
     * @type {number}
     * @memberof PrinterJob
     */
    user_id: number;
    /**
     * 
     * @type {number}
     * @memberof PrinterJob
     */
    file_id: number;
    /**
     * 
     * @type {Date}
     * @memberof PrinterJob
     */
    start_time: Date;
    /**
     * 
     * @type {Date}
     * @memberof PrinterJob
     */
    end_time: Date | null;
    /**
     * 
     * @type {string}
     * @memberof PrinterJob
     */
    page_size: string;
    /**
     * 
     * @type {number}
     * @memberof PrinterJob
     */
    page_count: number;
    /**
     * 
     * @type {boolean}
     * @memberof PrinterJob
     */
    double_side: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof PrinterJob
     */
    color: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof PrinterJob
     */
    orientation: PrinterJobOrientationEnum;
    /**
     * 
     * @type {UserFile}
     * @memberof PrinterJob
     */
    user_file?: UserFile;
    /**
     * 
     * @type {Printer}
     * @memberof PrinterJob
     */
    printer?: Printer;
}


/**
 * @export
 */
export const PrinterJobStatusEnum = {
    Pending: 'pending',
    Printing: 'printing',
    Completed: 'completed',
    Failed: 'failed'
} as const;
export type PrinterJobStatusEnum = typeof PrinterJobStatusEnum[keyof typeof PrinterJobStatusEnum];

/**
 * @export
 */
export const PrinterJobOrientationEnum = {
    Portrait: 'portrait',
    Landscape: 'landscape'
} as const;
export type PrinterJobOrientationEnum = typeof PrinterJobOrientationEnum[keyof typeof PrinterJobOrientationEnum];


/**
 * Check if a given object implements the PrinterJob interface.
 */
export function instanceOfPrinterJob(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "printer_id" in value;
    isInstance = isInstance && "user_id" in value;
    isInstance = isInstance && "file_id" in value;
    isInstance = isInstance && "start_time" in value;
    isInstance = isInstance && "end_time" in value;
    isInstance = isInstance && "page_size" in value;
    isInstance = isInstance && "page_count" in value;
    isInstance = isInstance && "double_side" in value;
    isInstance = isInstance && "color" in value;
    isInstance = isInstance && "orientation" in value;

    return isInstance;
}

export function PrinterJobFromJSON(json: any): PrinterJob {
    return PrinterJobFromJSONTyped(json, false);
}

export function PrinterJobFromJSONTyped(json: any, ignoreDiscriminator: boolean): PrinterJob {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'status': json['status'],
        'printer_id': json['printer_id'],
        'user_id': json['user_id'],
        'file_id': json['file_id'],
        'start_time': (new Date(json['start_time'])),
        'end_time': (json['end_time'] === null ? null : new Date(json['end_time'])),
        'page_size': json['page_size'],
        'page_count': json['page_count'],
        'double_side': json['double_side'],
        'color': json['color'],
        'orientation': json['orientation'],
        'user_file': !exists(json, 'user_file') ? undefined : UserFileFromJSON(json['user_file']),
        'printer': !exists(json, 'printer') ? undefined : PrinterFromJSON(json['printer']),
    };
}

export function PrinterJobToJSON(value?: PrinterJob | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'status': value.status,
        'printer_id': value.printer_id,
        'user_id': value.user_id,
        'file_id': value.file_id,
        'start_time': (value.start_time.toISOString()),
        'end_time': (value.end_time === null ? null : value.end_time.toISOString()),
        'page_size': value.page_size,
        'page_count': value.page_count,
        'double_side': value.double_side,
        'color': value.color,
        'orientation': value.orientation,
        'user_file': UserFileToJSON(value.user_file),
        'printer': PrinterToJSON(value.printer),
    };
}

