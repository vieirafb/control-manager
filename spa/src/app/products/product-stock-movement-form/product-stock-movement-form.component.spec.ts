import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockMovementFormComponent } from './product-stock-movement-form.component';

describe('ProductStockMovementFormComponent', () => {
  let component: ProductStockMovementFormComponent;
  let fixture: ComponentFixture<ProductStockMovementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStockMovementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStockMovementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
