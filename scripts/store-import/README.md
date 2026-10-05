# Importador de la Tienda (Excel → Sanity)

Puebla la tienda (`/tienda`) desde `guia.xlsx` (hoja **Lista Millan por categoría**).
Es **idempotente**: cada producto se identifica por `external_id = MILLAN-0001` (columna `#`), por lo que correrlo varias veces no duplica nada.

## Instalación

```bash
pnpm install
```

Requiere en `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` y, para `--apply`, `SANITY_API_WRITE_TOKEN`.

## Uso

```bash
pnpm store:import                 # DRY-RUN (por defecto): no escribe nada
pnpm store:import --apply         # escribe en Sanity en UNA transacción (rollback si falla)
```

| Opción | Descripción |
|---|---|
| `--file ruta.xlsx` | Excel a leer (por defecto `guia.xlsx` en la raíz) |
| `--margin 0.30` | Sobrescribe el margen de `Parámetros!B2` |
| `--rounding 500` | Sobrescribe el redondeo de `Parámetros!B3` |
| `--review-as=draft\|active` | Estado de los productos "verificar" (por defecto `draft`) |
| `--deactivate-missing` | Pasa a borrador los productos de Sanity que ya no están en el Excel (nunca se borran) |
| `--expected-products N` / `--expected-categories N` | Totales esperados para el control (389 / 21) |

## Qué hace

- **Precio**: `ceil(cant × precio_unit × (1 + margen) / redondeo) × redondeo`, calculado con enteros (sin ruido decimal). Reporta diferencias contra el valor cacheado del Excel.
- **Estado**: `Precio online` y `Lista proveedor (PDF)` → activo. `Estimado — validar` y los "verificar" → **borrador** (oculto al cliente).
- **Categorías**: se extrae orden y nombre limpio. `3a`–`3h` crean "Cava premium" como padre y la parte posterior a ` — ` como hija. El sufijo "— Maestri Milano" (proveedor) se quita del nombre público.
- **Validaciones por fila** (precio, cantidad, categoría, destino, URL): las filas inválidas se reportan y se omiten.
- **Control de totales**: 389 productos, 21 categorías y suma de MILLAN PRICE contra la hoja "Resumen por categoría" (también por categoría).
- No toca `mainImage` (las imágenes no vienen del Excel; se suben desde `/admin`).

## Datos públicos vs. internos

El dataset de Sanity es **público**, así que a Sanity solo se envían los campos públicos
(nombre, presentación, precio, categoría, destinos, prioridad, nota, estado).

Los datos internos (cantidad, tienda, precio de tienda, costo, margen, link del proveedor, estado del precio, fecha de consulta)
se guardan **localmente** en `scripts/store-import/output/supplier-data.json` (ignorado por git), junto con el reporte de cada corrida.

## Actualizar precios con un Excel nuevo

1. Reemplaza `guia.xlsx` (misma estructura de hojas y columnas).
2. `pnpm store:import` y revisa el reporte (totales, omitidos, diferencias, productos que ya no están en el Excel).
3. `pnpm store:import --apply`.

Para publicar un producto en borrador, corrige su "Estado del precio" en el Excel y reimporta (el Excel es la fuente de verdad del estado).

## Estructura

- `index.ts` — CLI y orquestación
- `excel-reader.ts` — lectura de hojas, fórmulas e hipervínculos
- `transform.ts` — validaciones, categorías, slugs, estados
- `pricing.ts` — cálculo de precios con enteros
- `sanity-writer.ts` — plan (crear/actualizar/sin cambios) y transacción
- `report.ts` — control de totales y reporte (consola + JSON)

