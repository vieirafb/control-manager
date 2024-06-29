import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProductsService } from "../products.service";
import { MatPaginatorModule, MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  productsService: ProductsService = inject(ProductsService);

  displayedColumns: string[] = ['_id', 'name', 'type', 'price', 'stock'];
  dataSource: any[] = [];
  pageSizeOptions: number[] = [50];
  pageSize: number = 50;
  pageIndex: number = 0;
  length: number = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    const columns = this.displayedColumns.map(column => ({
      data: column,
      sortable: true,
      searchable: true,
    }));

    this.productsService.list({ fields: columns, length: this.pageSize }).subscribe(response => {
      this.dataSource = response.data;
      this.length = response.recordsTotal;
    });
  }

  handlePageEvent(event: PageEvent) {
    const columns = this.displayedColumns.map(column => ({
      data: column,
      sortable: true,
      searchable: true,
    }));

    this.productsService.list({
      fields: columns,
      length: event.pageSize,
      offset: event.pageIndex * event.pageSize
    }).subscribe(response => {
      this.dataSource = response.data;
      this.length = response.recordsTotal;
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    });
  }

  handleSortEvent(event: Sort) {
    const columns = this.displayedColumns.map(column => ({
      data: column,
      sortable: true,
      searchable: true,
    }));
    const sort: any[] = [];

    if (event.direction) {
      const index: number = this.displayedColumns.findIndex(value => event.active === value);
      sort.push({ column: index, direction: event.direction });
    }

    this.productsService.list({
      fields: columns,
      length: this.pageSize,
      offset: this.pageIndex * this.pageSize,
      sort: sort,
    }).subscribe(response => {
      console.log(response.data);
      this.dataSource = response.data;
      this.length = response.recordsTotal;
    });
  }
}
