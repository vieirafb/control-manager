import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ListInput, ProductsService } from "../products.service";
import { MatPaginatorModule, MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, FormsModule,
    MatIconModule, MatButtonModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements AfterViewInit {
  productsService: ProductsService = inject(ProductsService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  displayedColumns: string[] = ['_id', 'name', 'type', 'price', 'stock', 'actions'];
  dataSource: any[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageSize: number = 10;
  filter: string = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.draw();
  }

  handlePageEvent(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.draw();
  }

  handleSortEvent(event: Sort) {
    this.sort.active = event.active;
    this.sort.direction = event.direction;
    this.draw();
  }

  draw() {
    const request: ListInput = {
      fields: this.displayedColumns.map(column => ({
        data: column,
        sortable: true,
        searchable: true,
      })),
      sort: [],
      length: this.paginator.pageSize,
      offset: this.paginator.pageIndex * this.paginator.pageSize,
    };

    if (this.sort.active && this.sort.direction) {
      const index = this.displayedColumns.findIndex(column => column === this.sort.active);
      request.sort.push({ column: index, direction: this.sort.direction });
    }

    if (this.filter) request.search = { value: this.filter, regex: true };

    this.productsService.list(request).subscribe(response => {
      this.dataSource = response.data;
      this.paginator.length = response.recordsTotal;
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(id: string) {
    this.router.navigate([`edit/${id}`], {relativeTo: this.route});
  }
}
