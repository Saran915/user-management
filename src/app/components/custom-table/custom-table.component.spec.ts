import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableComponent } from './custom-table.component';
interface TestData {
  id: number;
  name: string;
}

describe('CustomTableComponent', () => {
  let component: CustomTableComponent<TestData>;
  let fixture: ComponentFixture<CustomTableComponent<TestData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomTableComponent<TestData>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
