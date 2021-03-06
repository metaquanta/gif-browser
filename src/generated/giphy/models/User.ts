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
 * The User Object contains information about the user associated with a GIF and URLs to assets such as that user's avatar image, profile, and more.
 * @export
 * @interface User
 */
export interface User {
    /**
     * The URL for this user's avatar image.
     * @type {string}
     * @memberof User
     */
    avatarUrl?: string;
    /**
     * The URL for the banner image that appears atop this user's profile page.
     * @type {string}
     * @memberof User
     */
    bannerUrl?: string;
    /**
     * The display name associated with this user (contains formatting the base username might not).
     * @type {string}
     * @memberof User
     */
    displayName?: string;
    /**
     * The URL for this user's profile.
     * @type {string}
     * @memberof User
     */
    profileUrl?: string;
    /**
     * The Twitter username associated with this user, if applicable.
     * @type {string}
     * @memberof User
     */
    twitter?: string;
    /**
     * The username associated with this user.
     * @type {string}
     * @memberof User
     */
    username?: string;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'avatarUrl': !exists(json, 'avatar_url') ? undefined : json['avatar_url'],
        'bannerUrl': !exists(json, 'banner_url') ? undefined : json['banner_url'],
        'displayName': !exists(json, 'display_name') ? undefined : json['display_name'],
        'profileUrl': !exists(json, 'profile_url') ? undefined : json['profile_url'],
        'twitter': !exists(json, 'twitter') ? undefined : json['twitter'],
        'username': !exists(json, 'username') ? undefined : json['username'],
    };
}

export function UserToJSON(value?: User | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'avatar_url': value.avatarUrl,
        'banner_url': value.bannerUrl,
        'display_name': value.displayName,
        'profile_url': value.profileUrl,
        'twitter': value.twitter,
        'username': value.username,
    };
}


