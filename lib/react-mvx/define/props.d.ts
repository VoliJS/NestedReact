/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */
import { TypeSpecs } from './typeSpecs';
export interface PropsMetadata {
    pureRender?: boolean;
    _props?: TypeSpecs;
    _listenToPropsArray?: string[];
    _listenToPropsHash?: {
        [propName: string]: Object | string;
    };
}
export default function process(spec: any, {pureRender, _props, _listenToPropsArray, _listenToPropsHash}: PropsMetadata): void;
