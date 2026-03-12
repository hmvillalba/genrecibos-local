# Sistema de Gestión de Recibos - Profesional

Este es un sistema web local diseñado para la emisión, gestión y archivo de recibos comerciales. Permite generar documentos con un diseño profesional, realizar cierres de caja diarios y mantener un historial de ventas organizado en una base de datos de Excel.

Desarrollado por **Hugo Martin Villalba**.

## 🚀 Características Principales

- **Generación Dinámica:** Creación de recibos con cálculos automáticos de subtotales y totales.
- **Doble Opción de Salida:** - **Impresión Directa:** Abre el cuadro de diálogo del sistema para imprimir o guardar como PDF.
    - **Previsualización:** Abre el recibo en una nueva pestaña con herramientas de visualización.
- **Historial de Ventas:** Buscador dual por **Cliente** y por **Fecha** (DD/MM/AAAA).
- **Cierre de Caja:** Reporte rápido del total cobrado y cantidad de recibos emitidos en el día.
- **Base de Datos en Excel:** Los datos se guardan en `datos-empresa.xlsx` para una fácil lectura y respaldo manual.
- **Diseño Optimizado:** Encabezado con la "R" centrada proporcionalmente y tipografía ajustada para nombres de empresa largos.
- **Footer Personalizado:** Firma de autoría y año automático en la interfaz web.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (Vanilla JS).
- **Backend:** Node.js, Express.js.
- **Base de Datos:** ExcelJS (Lectura y escritura de archivos `.xlsx`).
- **Empaquetado:** PKG (Para creación de ejecutables `.exe`).

## 📋 Estructura del Proyecto

```text
/
├── public/
│   └── index.html        # Interfaz de usuario y lógica de impresión
├── server.js             # Servidor Node.js y lógica de API
├── datos-empresa.xlsx    # Base de datos (Excel)
├── package.json          # Dependencias del proyecto
└── README.md             # Documentación

⚙️ Instalación y Configuración
1. Requisitos previos
Tener instalado Node.js (versión 18 o superior recomendada).

2. Instalación de dependencias
Clona este repositorio o descarga los archivos y ejecuta:

Bash
npm install

3. Configuración del Excel
Asegúrate de que el archivo datos-empresa.xlsx tenga una hoja llamada Configuracion con los siguientes datos en la columna B:

B2: Nombre de la Empresa

B3: Dirección

B4: Teléfono

B5: Email

4. Ejecución
Para iniciar el sistema en modo desarrollo:

Bash
node server.js
Luego abre en tu navegador: http://localhost:3000

📦 Generar el Ejecutable (.EXE)
Para entregar este sistema a un cliente final sin que tenga que instalar Node.js:

Instala la librería globalmente: npm install -g pkg

Ejecuta el comando de empaquetado:

Bash
pkg server.js --targets node18-win-x64 --output SistemaRecibos.exe

Entrega la carpeta que contenga el .exe, la subcarpeta public y el archivo datos-empresa.xlsx.

🛡️ Licencia
Este proyecto es de uso privado y profesional.

Creado con ❤️ por Hugo Martin Villalba - 2026