import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ElementosListComponent } from './elementos-list.component';
import { ElementosService } from '../../services/elementos.service';
import { ElementosResponseDto } from '../../models/elemento.dto';
import { CommonModule } from '@angular/common';

const mockResponse: ElementosResponseDto = {
  success: true,
  total: 7,
  data: Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    nombre: `Elemento ${i + 1}`,
    descripcion: `Descripción ${i + 1}`,
    activo: i % 2 === 0,
  })),
};

describe('ElementosListComponent', () => {
  let component: ElementosListComponent;
  let fixture: ComponentFixture<ElementosListComponent>;
  let serviceSpy: jasmine.SpyObj<ElementosService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('ElementosService', ['getElementos']);
    serviceSpy.getElementos.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule],
      declarations: [ElementosListComponent],
      providers: [{ provide: ElementosService, useValue: serviceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ElementosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load elementos on init', () => {
    expect(serviceSpy.getElementos).toHaveBeenCalled();
    expect(component.elementos.length).toBe(7);
    expect(component.totalItems).toBe(7);
    expect(component.isLoading).toBeFalse();
  });

  it('should paginate: first page has pageSize items', () => {
    expect(component.pagedElementos.length).toBe(component.pageSize);
  });

  it('should navigate to the next page', () => {
    component.setPage(2);
    expect(component.currentPage).toBe(2);
    expect(component.pagedElementos.length).toBe(7 - component.pageSize);
  });

  it('should not navigate beyond total pages', () => {
    component.setPage(999);
    expect(component.currentPage).toBe(1);
  });

  it('should set errorMessage on service error', () => {
    serviceSpy.getElementos.and.returnValue(throwError(() => new Error('Network error')));
    component.loadElementos();
    expect(component.errorMessage).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });
});
