import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  list(query: ListInput): Observable<any> {
    let params: HttpParams = new HttpParams();

    if (query.offset) params = params.append('offset', query.offset);
    if (query.length) params = params.append('length', query.length);

    if (query.search) {
      params = params.append('search[value]', query.search.value);
      params = params.append('search[regex]', query.search.regex || false);
    }

    query.fields.forEach((field, key) => {
      const attr = `fields[${key}]`;
      params = params.append(`${attr}[data]`, field.data);
      params = params.append(`${attr}[searchable]`, field.searchable || false);
      params = params.append(`${attr}[sortable]`, field.sortable || false);
    });

    query.sort?.forEach((sort, key) => {
      const attr = `sort[${key}]`;
      params = params.append(`${attr}[column]`, sort.column);
      params = params.append(`${attr}[direction]`, sort.direction || 'asc');
    });

    return this.httpClient.get<any>('http://0.0.0.0:5002/product', { params: params });
  }
}

export type ListInput = {
  offset?: number,
  length?: number,
  search?: {
    value: string,
    regex?: boolean
  },
  fields: {
    data: string,
    sortable?: boolean,
    searchable?: boolean,
  }[],
  sort: {
    column: number,
    direction?: 'asc' | 'desc',
  }[],
};
