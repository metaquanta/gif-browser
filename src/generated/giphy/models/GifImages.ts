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
import {
    Image,
    ImageFromJSON,
    ImageFromJSONTyped,
    ImageToJSON,
} from './';

/**
 * An object containing data for various available formats and sizes of this GIF.
 * @export
 * @interface GifImages
 */
export interface GifImages {
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    downsized?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    downsizedLarge?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    downsizedMedium?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    downsizedSmall?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    downsizedStill?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedHeight?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedHeightDownsampled?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedHeightSmall?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedHeightSmallStill?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedHeightStill?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedWidth?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedWidthDownsampled?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedWidthSmall?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedWidthSmallStill?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    fixedWidthStill?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    looping?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    original?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    originalStill?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    preview?: Image & object;
    /**
     * 
     * @type {Image & object}
     * @memberof GifImages
     */
    previewGif?: Image & object;
}

export function GifImagesFromJSON(json: any): GifImages {
    return GifImagesFromJSONTyped(json, false);
}

export function GifImagesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GifImages {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'downsized': !exists(json, 'downsized') ? undefined : Image &amp; objectFromJSON(json['downsized']),
        'downsizedLarge': !exists(json, 'downsized_large') ? undefined : Image &amp; objectFromJSON(json['downsized_large']),
        'downsizedMedium': !exists(json, 'downsized_medium') ? undefined : Image &amp; objectFromJSON(json['downsized_medium']),
        'downsizedSmall': !exists(json, 'downsized_small') ? undefined : Image &amp; objectFromJSON(json['downsized_small']),
        'downsizedStill': !exists(json, 'downsized_still') ? undefined : Image &amp; objectFromJSON(json['downsized_still']),
        'fixedHeight': !exists(json, 'fixed_height') ? undefined : Image &amp; objectFromJSON(json['fixed_height']),
        'fixedHeightDownsampled': !exists(json, 'fixed_height_downsampled') ? undefined : Image &amp; objectFromJSON(json['fixed_height_downsampled']),
        'fixedHeightSmall': !exists(json, 'fixed_height_small') ? undefined : Image &amp; objectFromJSON(json['fixed_height_small']),
        'fixedHeightSmallStill': !exists(json, 'fixed_height_small_still') ? undefined : Image &amp; objectFromJSON(json['fixed_height_small_still']),
        'fixedHeightStill': !exists(json, 'fixed_height_still') ? undefined : Image &amp; objectFromJSON(json['fixed_height_still']),
        'fixedWidth': !exists(json, 'fixed_width') ? undefined : Image &amp; objectFromJSON(json['fixed_width']),
        'fixedWidthDownsampled': !exists(json, 'fixed_width_downsampled') ? undefined : Image &amp; objectFromJSON(json['fixed_width_downsampled']),
        'fixedWidthSmall': !exists(json, 'fixed_width_small') ? undefined : Image &amp; objectFromJSON(json['fixed_width_small']),
        'fixedWidthSmallStill': !exists(json, 'fixed_width_small_still') ? undefined : Image &amp; objectFromJSON(json['fixed_width_small_still']),
        'fixedWidthStill': !exists(json, 'fixed_width_still') ? undefined : Image &amp; objectFromJSON(json['fixed_width_still']),
        'looping': !exists(json, 'looping') ? undefined : Image &amp; objectFromJSON(json['looping']),
        'original': !exists(json, 'original') ? undefined : Image &amp; objectFromJSON(json['original']),
        'originalStill': !exists(json, 'original_still') ? undefined : Image &amp; objectFromJSON(json['original_still']),
        'preview': !exists(json, 'preview') ? undefined : Image &amp; objectFromJSON(json['preview']),
        'previewGif': !exists(json, 'preview_gif') ? undefined : Image &amp; objectFromJSON(json['preview_gif']),
    };
}

export function GifImagesToJSON(value?: GifImages | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'downsized': Image &amp; objectToJSON(value.downsized),
        'downsized_large': Image &amp; objectToJSON(value.downsizedLarge),
        'downsized_medium': Image &amp; objectToJSON(value.downsizedMedium),
        'downsized_small': Image &amp; objectToJSON(value.downsizedSmall),
        'downsized_still': Image &amp; objectToJSON(value.downsizedStill),
        'fixed_height': Image &amp; objectToJSON(value.fixedHeight),
        'fixed_height_downsampled': Image &amp; objectToJSON(value.fixedHeightDownsampled),
        'fixed_height_small': Image &amp; objectToJSON(value.fixedHeightSmall),
        'fixed_height_small_still': Image &amp; objectToJSON(value.fixedHeightSmallStill),
        'fixed_height_still': Image &amp; objectToJSON(value.fixedHeightStill),
        'fixed_width': Image &amp; objectToJSON(value.fixedWidth),
        'fixed_width_downsampled': Image &amp; objectToJSON(value.fixedWidthDownsampled),
        'fixed_width_small': Image &amp; objectToJSON(value.fixedWidthSmall),
        'fixed_width_small_still': Image &amp; objectToJSON(value.fixedWidthSmallStill),
        'fixed_width_still': Image &amp; objectToJSON(value.fixedWidthStill),
        'looping': Image &amp; objectToJSON(value.looping),
        'original': Image &amp; objectToJSON(value.original),
        'original_still': Image &amp; objectToJSON(value.originalStill),
        'preview': Image &amp; objectToJSON(value.preview),
        'preview_gif': Image &amp; objectToJSON(value.previewGif),
    };
}

