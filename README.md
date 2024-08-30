# Challenge para vacante de Dev Full Stack Ssr

## Requisitos
- Docker

## Levantado de la aplicacion
1. Crear la imagen a partir del Dockerfile:
```
docker build -t <nombre de la imagen> .
```

2. Levantar un contenedor:

backend windor

```
docker run -it --rm -p 3001:3000 -v ${PWD}:/backend --name <nombre del contenedor> <nombre de la imagen>

docker run -it --rm -p 3001:3000 -v ${PWD}/..:/backend --name backend backend

docker run -it --rm -p 3000:3000 -v ${PWD}:/frontend --name frontend frontend
```

3. 
