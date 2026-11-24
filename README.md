# Entrena

Página web para organizar el entrenamiento físico: catálogo de ejercicios, rutinas propias, entrenamiento paso a paso con progreso en tiempo real y registro diario de agua y sueño.

Proyecto final de Estructuras de Datos y Algoritmos II, Universidad Autónoma de Occidente.

## Integrantes

- Daniel Fernando Acosta Granada ([DanielFerAcosta](https://github.com/DanielFerAcosta))
- Christian David Home Acero ([Davidev77](https://github.com/Davidev77))

## Enlaces

- **Propuesta gráfica (Figma):** [Propuesta gráfica Proyecto EDyA2](https://www.figma.com/design/kWXrFf2OypeW14V1uYK89Z/Propuesta-Grafica-Proyecto-EDyA2?node-id=0-1)
- **Página desplegada (Netlify):proyectofinaledya2.netlify.app/
- **Informe final:** [Informe_final_EDyA2.md](./Informe_final_EDyA2.md) · [versión en Google Docs](https://docs.google.com/document/d/1y47T-eoG3qtsnkivH_O1s__z6WQfWT6Q9gvY_cuWwok/edit?usp=sharing)

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