import { Serializer } from '../models/serializer';
import { Resource } from '../models/resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { QueryOptions } from '../models/query-options';
import { VehicleSerializer } from '../models/vehicleserializer';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';

@Injectable()
export class ResourceService<T extends Resource> {
  constructor(
    private httpClient: HttpClient,
    private url: string,
    private endpoint: string,
    @Inject(VehicleSerializer) private serializer: Serializer
  ) {}

  read(id: number): Observable<T> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id}`)
      .map((data: any) => this.serializer.fromJson(data) as T);
  }

  list(queryOptions: QueryOptions): Observable<T[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}?${queryOptions.toQueryString()}`)
      .map(data => this.convertData(data));
  }

  delete(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`, {
      headers: headers
    })
    .map(data => this.serializer.fromJson(data) as T);
  }

  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(
        `${this.url}/${this.endpoint}/${item.id}`,
        this.serializer.toJson(item)
      )
      .map(data => this.serializer.fromJson(data) as T);
  }
}
