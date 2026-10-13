# babySami

Invitación de baby shower para Samuel hecha en Angular. Paleta celeste, blanco y café, sobre interactivo y diseño responsive.

## Ejecutar

```sh
npm install
npm start
```

Abre http://localhost:4200. `npm start` detecta si la invitación ya está funcionando y muestra el enlace sin intentar abrir un segundo servidor. Si otro servicio ocupa el puerto, puedes usar `npm start -- --port 4201`. Para generar los archivos de producción: `npm run build`.

## Personalizar

Edita el objeto `invitation` en `src/main.ts`: fecha, hora, lugar, dirección. Los datos vacíos se muestran como pendientes.

La invitación reúne los detalles en una sola tarjeta. La fecha es el 15 de noviembre (domingo en 2026). Para incorporar el QR proporcionado, guarda su imagen en `src/assets/` y configura `qr` con la ruta `assets/nombre-del-qr.png`; aparecerá bajo una opción desplegable discreta. No se genera ningún QR de pago.

Los assets utilizados están en `src/assets/` y Angular los publica en `assets/`: el fondo, la foto original de Samuel, el QR, la ropita transparente, el globo, la nube y los dos adornos junto a la foto. Las versiones descartadas se eliminaron.

Ahora `image` usa `assets/SAMI.jpeg`: la ecografía tiene un recorte visual con CSS y marco redondeado, sin alterar el archivo. Al tocarla se abre un diálogo ampliado, que se cierra con ×, Escape o tocando el exterior. El QR original `assets/qr-amor.jpeg` se muestra al desplegar la opción de regalos y puede descargarse.

Las tipografías usan Google Fonts, con alternativas locales si no hay conexión. Ejecuta `npm run test:smoke` para compilar y comprobar el arranque, la apertura del sobre, la foto ampliada, los assets.
