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
/**
 * 
 * @export
 * @interface UpdateSystemConfigurationRequest
 */
export interface UpdateSystemConfigurationRequest {
    /**
     * 
     * @type {number}
     * @memberof UpdateSystemConfigurationRequest
     */
    default_page_balance: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateSystemConfigurationRequest
     */
    cron_of_default_page_balance_grant: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateSystemConfigurationRequest
     */
    permitted_file_types: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof UpdateSystemConfigurationRequest
     */
    max_file_size: number;
}

/**
 * Check if a given object implements the UpdateSystemConfigurationRequest interface.
 */
export function instanceOfUpdateSystemConfigurationRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "default_page_balance" in value;
    isInstance = isInstance && "cron_of_default_page_balance_grant" in value;
    isInstance = isInstance && "permitted_file_types" in value;
    isInstance = isInstance && "max_file_size" in value;

    return isInstance;
}

export function UpdateSystemConfigurationRequestFromJSON(json: any): UpdateSystemConfigurationRequest {
    return UpdateSystemConfigurationRequestFromJSONTyped(json, false);
}

export function UpdateSystemConfigurationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateSystemConfigurationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'default_page_balance': json['default_page_balance'],
        'cron_of_default_page_balance_grant': json['cron_of_default_page_balance_grant'],
        'permitted_file_types': json['permitted_file_types'],
        'max_file_size': json['max_file_size'],
    };
}

export function UpdateSystemConfigurationRequestToJSON(value?: UpdateSystemConfigurationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'default_page_balance': value.default_page_balance,
        'cron_of_default_page_balance_grant': value.cron_of_default_page_balance_grant,
        'permitted_file_types': value.permitted_file_types,
        'max_file_size': value.max_file_size,
    };
}

