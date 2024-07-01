import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockMovementDialogComponent } from './product-stock-movement-dialog.component';

describe('ProductStockMovementDialogComponent', () => {
  let component: ProductStockMovementDialogComponent;
  let fixture: ComponentFixture<ProductStockMovementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStockMovementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStockMovementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
