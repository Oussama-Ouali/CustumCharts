import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinebarChartComponent } from './linebar-chart.component';

describe('LinebarChartComponent', () => {
  let component: LinebarChartComponent;
  let fixture: ComponentFixture<LinebarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinebarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinebarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
