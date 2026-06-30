import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElementosService } from './elementos.service';
import { ElementosResponseDto } from '../models/elemento.dto';
import { environment } from '../../../../environments/environment';

describe('ElementosService', () => {
  let service: ElementosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElementosService],
    });
    service = TestBed.inject(ElementosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /api/v1.0/elementos', () => {
    const mockResponse: ElementosResponseDto = {
      success: true,
      total: 2,
      data: [
        { id: 1, nombre: 'Elemento Uno', descripcion: 'Descripción uno', activo: true },
        { id: 2, nombre: 'Elemento Dos', descripcion: 'Descripción dos', activo: false },
      ],
    };

    service.getElementos().subscribe((response) => {
      expect(response.success).toBeTrue();
      expect(response.total).toBe(2);
      expect(response.data.length).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/v1.0/elementos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
