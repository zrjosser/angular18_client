# Angular 19 Client — Portal de Elementos

Frontend Angular 19 que consume el API REST del proyecto [nodejs_server](https://github.com/zrjosser/nodejs_server).  
Muestra la lista de **Elementos** en una tabla estilizada con paginación del lado del cliente.

---

## Tabla de Contenidos

- [Requisitos previos](#requisitos-previos)
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución en desarrollo](#instalación-y-ejecución-en-desarrollo)
- [Build de producción](#build-de-producción)
- [Ejecución de pruebas](#ejecución-de-pruebas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)

---

## Requisitos previos

| Herramienta | Versión mínima |
|-------------|----------------|
| Node.js     | 18.x           |
| npm         | 9.x            |
| Angular CLI | 19.x           |

---

## Variables de entorno

La aplicación utiliza los archivos de entorno de Angular (`src/environments/`).  
**No** requiere un archivo `.env` en tiempo de ejecución; la configuración se inyecta en tiempo de compilación.

| Variable  | Archivo                         | Descripción                          | Valor por defecto       |
|-----------|---------------------------------|--------------------------------------|-------------------------|
| `apiUrl`  | `src/environments/environment.ts`       | URL base del backend (desarrollo)    | `http://localhost:3000` |
| `apiUrl`  | `src/environments/environment.prod.ts`  | URL base del backend (producción)    | `http://localhost:3000` |

Para apuntar a un servidor diferente, edita la propiedad `apiUrl` en el archivo correspondiente **antes** de compilar:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://TU_SERVIDOR:3000',   // ← cambia aquí
};
```

---

## Instalación y ejecución en desarrollo

### 1. Levantar el backend primero

Sigue las instrucciones del repo [nodejs_server](https://github.com/zrjosser/nodejs_server) para iniciar el API en `http://localhost:3000`.

### 2. Clonar e instalar dependencias

```bash
git clone https://github.com/zrjosser/angular18_client.git
cd angular18_client
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm start
# equivalente a: ng serve
```

La aplicación estará disponible en **http://localhost:4200**.

---

## Build de producción

```bash
npm run build
# equivalente a: ng build --configuration=production
```

Los artefactos se generan en `dist/angular19_client/` (nombre del proyecto Angular definido en `angular.json`).

---

## Ejecución de pruebas

### Pruebas unitarias (modo CI — sin navegador visible)

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

### Pruebas unitarias (modo desarrollo con recarga automática)

```bash
npm test
```

---

## Estructura del proyecto

```
src/
├── app/
│   ├── app.component.*          # Shell principal (header, router-outlet, footer)
│   ├── app.module.ts            # Módulo raíz
│   ├── app-routing.module.ts    # Rutas de la aplicación
│   │
│   ├── core/                    # Componentes de núcleo (Welcome/Home)
│   │   └── components/
│   │       └── welcome/
│   │           ├── welcome.component.ts
│   │           ├── welcome.component.html
│   │           ├── welcome.component.scss
│   │           └── welcome.component.spec.ts
│   │
│   └── features/
│       └── elementos/           # Feature module — carga diferida (lazy)
│           ├── elementos.module.ts
│           ├── elementos-routing.module.ts
│           ├── models/
│           │   └── elemento.dto.ts          # ElementoDto, ElementosResponseDto
│           ├── services/
│           │   ├── elementos.service.ts
│           │   └── elementos.service.spec.ts
│           └── components/
│               └── elementos-list/
│                   ├── elementos-list.component.ts
│                   ├── elementos-list.component.html
│                   ├── elementos-list.component.scss
│                   └── elementos-list.component.spec.ts
│
├── environments/
│   ├── environment.ts           # Configuración de desarrollo
│   └── environment.prod.ts      # Configuración de producción
└── styles.scss                  # Estilos globales
```

---

## Arquitectura

### Módulos

| Módulo              | Responsabilidad                                      |
|---------------------|------------------------------------------------------|
| `AppModule`         | Módulo raíz; bootstrap, rutas globales               |
| `ElementosModule`   | Feature module de carga diferida para `/elementos`   |

### Rutas

| Ruta          | Componente              | Descripción                          |
|---------------|-------------------------|--------------------------------------|
| `/`           | `WelcomeComponent`      | Pantalla de bienvenida con menú      |
| `/elementos`  | `ElementosListComponent`| Tabla paginada de elementos          |
| `/**`         | —                       | Redirección a `/`                    |

### DTOs

Los modelos en `src/app/features/elementos/models/elemento.dto.ts` replican fielmente las interfaces `ElementoDto` y `ElementosResponseDto` del repositorio `nodejs_server`:

```typescript
export interface ElementoDto {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface ElementosResponseDto {
  success: boolean;
  total: number;
  data: ElementoDto[];
}
```

### Flujo de datos

```
ElementosService.getElementos()
  → GET /api/v1.0/elementos
  → ElementosResponseDto
  → ElementosListComponent (paginación local)
```
