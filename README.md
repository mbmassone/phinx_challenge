# Challenge para vacante de Dev Full Stack Ssr

## Requisitos
- Docker

## Levantado de la aplicacion
1. Crear la imagen a partir del Dockerfile:
```
docker build -t <nombre de la imagen> .
```

2. Levantar un contenedor:

```
docker run -it --rm -p 3001:3000 -v ${PWD}/..:/backend --name <nombre del contenedor> <nombre de la imagen>

docker run -it --rm -p 3001:3000 -v ${PWD}/..:/backend --name backend backend

docker run -it --rm -p 3000:3000 -v ${PWD}:/frontend --name frontend frontend
```

3. 


## Migración
Ejecutar el siguiente comando:
```
npx typeorm migration:create src/migrations/PopulatePokemonTable
```

Modificar el archivo generado con el contenido de `src\migrations\example-PopulatePokemonTable.txt` sin cambiar el nombre de la clase que contiene el timestamp.

Ejecutar el siguiente comando:
```
npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d src/data-source.ts
```
