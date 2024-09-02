# Challenge para vacante de Dev Full Stack Ssr

## Requisitos
- Docker Desktop

## Configuración Backend
1. En el directorio del proyecto del backend crear la imagen a partir del Dockerfile ejecutando el siguiente comando por consola:

```
docker build -t backend .
```

2. Levantar un contenedor de la imagen creada ejecutando el siguiente comando por consola:

```
docker run -it --rm -p 3001:3000 -v ${PWD}/..:/backend --name backend backend
```
(Nota: `${PWD}` para PowerShell - `$(pwd)` para bash - `%CD%` para Windows CMD)

## Configuración Frontend
1. En el directorio del proyecto del frontend crear la imagen a partir del Dockerfile ejecutando el siguiente comando por consola:

```
docker build -t frontend .
```

2. Levantar un contenedor de la imagen creada ejecutando el siguiente comando por consola:

```
docker run -it --rm -p 3000:3000 -v ${PWD}:/frontend --name frontend frontend
```
(Nota: `${PWD}` para PowerShell - `$(pwd)` para bash - `%CD%` para Windows CMD)

## Acceso a la aplicación
Desde el navegador acceder a `localhost:3000`.


## Migración
La migración se realiza automáticamente al levantar por primera vez un contenedor de docker de la imagen backend.

El archivo de migración con su timestamp se generó con el siguiente comando:
```
npx typeorm migration:create src/migrations/PopulatePokemonTable
```

Luego se modificó el archivo generado con el contenido de `src\migrations\example-PopulatePokemonTable.txt` sin cambiar el nombre de la clase que contiene el timestamp.

Se ejecutó el siguiente comando para popular la tabla:

```
npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d src/data-source.ts
```

## Base de datos
Se utilizó una base de datos local SQLite que se encuentra en el directorio `/database` del proyecto junto al ejecutable del gestor de base por terminal para linux.
