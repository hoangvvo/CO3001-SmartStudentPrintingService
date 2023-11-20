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

/**
 * 
 * @export
 * @interface ListPrinters200Response
 */
export interface ListPrinters200Response {
    /**
     * 
     * @type {Array<Printer>}
     * @memberof ListPrinters200Response
     */
    printers: Array<Printer>;
}

/**
 * Check if a given object implements the ListPrinters200Response interface.
 */
export function instanceOfListPrinters200Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "printers" in value;

    return isInstance;
}

export function ListPrinters200ResponseFromJSON(json: any): ListPrinters200Response {
    return ListPrinters200ResponseFromJSONTyped(json, false);
}

export function ListPrinters200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListPrinters200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'printers': ((json['printers'] as Array<any>).map(PrinterFromJSON)),
    };
}

export function ListPrinters200ResponseToJSON(value?: ListPrinters200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'printers': ((value.printers as Array<any>).map(PrinterToJSON)),
    };
}
