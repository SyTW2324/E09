# Oddysey
<p style="text-align: justify;">Odyssey es una aplicación web que facilita el intercambio de viviendas para viajar de manera asequible. Inspirada en plataformas como AirBnB, Odyssey se enfoca en permitir a los usuarios publicar sus viviendas, ya sea la principal o secundaria, para intercambiar temporalmente con otros usuarios. Esta iniciativa busca brindar oportunidades de viaje a personas con recursos limitados, especialmente a aquellos sectores de la sociedad que enfrentan dificultades debido a ingresos reducidos. Al fomentar el intercambio de experiencias y viviendas, Odyssey busca hacer que los viajes sean más accesibles, económicos y enriquecedores para todos.</p>

## Instrucciones
Para usar esta aplicación web, se debe tener instalado [Node.js](https://nodejs.org/es/) en versión v21.2.0 y también npm 10.2.4
Una vez instalados los requisitos, se debe ejecutar el siguiente comando en la terminal, ubicado en la raíz del proyecto:
```
npm install
```
Luego, para ejecutar la aplicación, se debe ejecutar el siguiente comando en la terminal, ubicado en la raíz del proyecto:
```
npm start
```
Este comando ejecutará la aplicación en modo de desarrollo. Abra [http://localhost:3000](http://localhost:3000) para verlo en el navegador. Abrirá tanto el servidor como el cliente.

Si se quiere ejecutar por separado, tendríamos que abrir dos terminales, una para el servidor y otra para el cliente. Para ejecutar el servidor, se debe ejecutar el siguiente comando en la terminal, ubicado en la raíz del proyecto:
```
npm start
```
Para ejecutar el cliente, se debe ejecutar el siguiente comando en la terminal, ubicado en la carpeta client:
```
npm start
```

## Comandos
### Proyecto
  - `npm prepare`: Instala las dependencias de ambos proyectos.
  - `npm prepare:server`: Instala las dependencias del servidor.
  - `npm prepare:client`: Instala las dependencias del cliente.
  - `npm build`: Construye el servidor.
  - `npm build:server`: Construye el servidor.
  - `npm start`: Ejecuta el servidor y el cliente.
  - `npm fullstart`: Instala las dependencias, construye el servidor y ejecuta el servidor y el cliente.
  - `npm start:server`: Ejecuta el servidor.
  - `npm start:client`: Ejecuta el cliente.
  - `npm test`: Construye el servidor, ejecuta las pruebas de extremo a extremo y ejecuta el servidor.
  - `npm test:client`: Ejecuta las pruebas de extremo a extremo.
  - `npm coverage`: Ejecuta las pruebas de extremo a extremo y genera un reporte de cobertura.

### Cliente
- `npm start`: Ejecuta la aplicación en modo de desarrollo. Abra [http://localhost:3000](http://localhost:3000) para verlo en el navegador. Abrirá tanto el servidor como el cliente.
- `npm run build`: Construye la aplicación para producción en la carpeta `build`. Agrupa correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.
- `npm run test`: Inicia el corredor de pruebas en el modo de reloj interactivo.
- `npm run eject`: Expone las configuraciones de compilación y prueba y los scripts de dependencia de este proyecto. **Nota: esto es una operación unidireccional. Una vez que "expulsas", ¡no puedes regresar!**
- `cy:open`: Abre la interfaz de usuario de Cypress para ejecutar las pruebas de extremo a extremo.
- `cy:run`: Ejecuta las pruebas de extremo a extremo en modo headless.
- `coverage`: Ejecuta las pruebas de extremo a extremo en modo headless y genera un reporte de cobertura.

### Servidor
- `npm run build`: Construye el servidor.
- `npm run start`: Ejecuta el servidor.
- `npm run dev`: Ejecuta el servidor en modo de desarrollo.
- `npm run doc`: Genera la documentación del servidor.
