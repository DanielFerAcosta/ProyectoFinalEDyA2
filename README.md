# Entrena

Página web para organizar el entrenamiento físico: catálogo de ejercicios, rutinas propias, entrenamiento paso a paso con progreso en tiempo real y registro diario de agua y sueño.

Proyecto final de Estructuras de Datos y Algoritmos II, Universidad Autónoma de Occidente.

## Integrantes

- Daniel Fernando Acosta Granada ([DanielFerAcosta](https://github.com/DanielFerAcosta))
- Christian David Home Acero ([Davidev77](https://github.com/Davidev77))

## Enlaces

- **Página desplegada (Netlify):** [proyectofinaledya2.netlify.app](https://proyectofinaledya2.netlify.app/)
- **Propuesta gráfica (Figma):**
- [Diseño de las pantallas](https://www.figma.com/design/qlnwpoSz7XjNz47p8dqM6z/Propuesta-Grafica-Proyecto-FInal-EDyA2?node-id=0-1&t=1iElqNoaICgCPdDi-1)
- [Prototipo interactivo](https://www.figma.com/proto/qlnwpoSz7XjNz47p8dqM6z/Propuesta-Grafica-Proyecto-FInal-EDyA2?node-id=1-3&p=f&t=gp38CG1Xo1e0Gnze-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3)
- **Informe final:** [versión en Google Docs](https://docs.google.com/document/d/1y47T-eoG3qtsnkivH_O1s__z6WQfWT6Q9gvY_cuWwok/edit?usp=sharing)

## Tecnologías

- Angular y TypeScript
- SCSS
- Supabase (usuarios, base de datos y tiempo real)

## Estructuras de datos

| Estructura | Dónde se usa |
|---|---|
| Pila | Deshacer cambios al crear una rutina |
| Cola | Orden de los ejercicios durante el entrenamiento |
| Trie | Buscador del catálogo de ejercicios |
| Min-heap | Ordenar las rutinas de la más corta a la más larga |
| Grafo | Ejercicios alternativos en el catálogo |

La explicación de cada una está en el informe final.

## Cómo ejecutarlo

```bash
npm install
ng serve
```

Luego abrir `http://localhost:4200/`.
