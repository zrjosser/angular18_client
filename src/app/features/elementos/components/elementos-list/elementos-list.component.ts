import { Component, OnInit } from '@angular/core';
import { ElementoDto } from '../../models/elemento.dto';
import { ElementosService } from '../../services/elementos.service';

/**
 * Component that displays the list of elementos in a paginated, styled table.
 */
@Component({
  selector: 'app-elementos-list',
  templateUrl: './elementos-list.component.html',
  styleUrls: ['./elementos-list.component.scss'],
  standalone: false,
})
export class ElementosListComponent implements OnInit {
  elementos: ElementoDto[] = [];
  pagedElementos: ElementoDto[] = [];
  isLoading = true;
  errorMessage = '';

  /** Pagination */
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];

  constructor(private elementosService: ElementosService) {}

  ngOnInit(): void {
    this.loadElementos();
  }

  /**
   * Fetches elementos from the API and initializes pagination.
   */
  loadElementos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.elementosService.getElementos().subscribe({
      next: (response) => {
        this.elementos = response.data;
        this.totalItems = response.total;
        this.initPagination();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar los elementos. Por favor, intente de nuevo.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Initializes pagination metadata and loads the first page.
   */
  private initPagination(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.setPage(1);
  }

  /**
   * Sets the current page and slices the data accordingly.
   * @param page Target page number.
   */
  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedElementos = this.elementos.slice(start, end);
  }
}
