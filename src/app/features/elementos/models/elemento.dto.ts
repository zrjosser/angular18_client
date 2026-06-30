/**
 * Data Transfer Object for an Elemento (Element).
 * Matches the ElementoDto interface defined in nodejs_server.
 */
export interface ElementoDto {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

/**
 * API response wrapper for a list of elementos.
 * Matches the ElementosResponseDto interface defined in nodejs_server.
 */
export interface ElementosResponseDto {
  success: boolean;
  total: number;
  data: ElementoDto[];
}
