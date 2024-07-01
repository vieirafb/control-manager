import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = 'http://0.0.0.0:5002';

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

    return this.httpClient.get<any>(`${this.url}/product`, { params: params });
  }

  get(id: string) {
    return this.httpClient.get<any>(`${this.url}/product/${id}`);
  }

  save(input: SaveInput) {
    return input.id
      ? this.update(input.id, input.name, input.type, input.price)
      : this.store(input.name, input.type, input.price);
  }

  private store(name: string, type: string, price: number) {
    return this.httpClient.post(`${this.url}/product/`, {
      name: name,
      type: type,
      price: price,
    });
  }

  private update(id: string, name: string, type: string, price: number) {
    return this.httpClient.put(`${this.url}/product/${id}`, {
      name: name,
      type: type,
      price: price,
    });
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/product/${id}`);
  }

  addStockMovement(
    productId: string,
    movementType: string,
    quantity: number,
    entryDatetime: string,
    comments: string,
  ) {
    return this.httpClient.post(`${this.url}/product/${productId}/stock-movement`, {
      movementType: movementType,
      quantity: quantity,
      entryDatetime: entryDatetime,
      comments: comments,
    });
  }
}

export type SaveInput = {
  id?: string,
  name: string,
  type: string,
  price: number,
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
