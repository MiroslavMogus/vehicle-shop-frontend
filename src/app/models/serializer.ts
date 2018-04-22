import { Resource } from './resource';

// tslint:disable-next-line:no-empty-interface
export interface Serializer {
    fromJson(json: any): Resource;
    toJson(resource: Resource): any;
}
