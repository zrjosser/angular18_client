import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElementosResponseDto } from '../models/elemento.dto';
import { environment } from '../../../../environments/environment';

/**
 * Service responsible for fetching Elementos data from the API.
 */
@Injectable({
  providedIn: 'root',
})
export class ElementosService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1.0/elementos`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the full list of elementos from the server.
   * @returns Observable with the API response containing the list of elementos.
   */
  getElementos(): Observable<ElementosResponseDto> {
    return this.http.get<ElementosResponseDto>(this.apiUrl);
  }
}
