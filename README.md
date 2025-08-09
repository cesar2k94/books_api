# API de Libros y Autores

API REST para manejar libros y autores usando Express + TypeScript + MongoDB.

## Ejecutar

```bash
npm install
npm run dev
```

La API corre en `http://localhost:3000`

## Endpoints

**Libros:**
- `POST /books` - Crear libro
- `GET /books` - Listar libros
- `GET /books/:id/avg-pages-per-chapter` - Promedio páginas por capítulo

**Autores:**
- `POST /authors` - Crear autor  
- `GET /authors` - Listar autores

## Ejemplos

Crear libro:
```json
{
  "title": "Nombre del libro",
  "chapters": 20,
  "pages": 471,
  "authors": ["Nombre del autor"]
}
```

Crear autor:
```json
{
  "name": "Nombre del autor"
}
```

## Estructura

```
src/
├── controllers/    
├── models/        
├── routes/        
└── server.ts      
```

## Notas

- Los autores se pueden pasar por ID o nombre al crear un libro
- Si el autor no existe, se crea automáticamente
- Un libro puede tener varios autores y viceversa
- Hay que tener MongoDB corriendo localmente
