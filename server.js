const express = require('express');
const ExcelJS = require('exceljs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const EXCEL_PATH = path.join(__dirname, 'datos-empresa.xlsx');

app.get('/api/inicio', async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(EXCEL_PATH);
        const configSheet = workbook.getWorksheet('Configuracion');
        const compSheet = workbook.getWorksheet('Comprobantes');

        res.json({
            config: {
                empresa: configSheet.getCell('B2').value,
                direccion: configSheet.getCell('B3').value,
                telefono: configSheet.getCell('B4').value,
                email: configSheet.getCell('B5').value
            },
            proximoNumero: compSheet.getCell('A2').value
        });
    } catch (e) { res.status(500).send("Error al leer Excel"); }
});


// RUTA PARA GUARDAR (DEBE SER POST)
app.post('/api/guardar', async (req, res) => {
    try {
        const { cliente, productos, total, numero } = req.body;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(EXCEL_PATH);

        // 1. Guardar en Historial
        const recibosSheet = workbook.getWorksheet('Recibos');
        recibosSheet.addRow([new Date().toLocaleDateString(), numero, cliente, JSON.stringify(productos), total]);

        // 2. Actualizar Número Correlativo
        const compSheet = workbook.getWorksheet('Comprobantes');
        compSheet.getCell('A2').value = parseInt(numero) + 1;

        await workbook.xlsx.writeFile(EXCEL_PATH);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al guardar en Excel. ¿Está el archivo abierto?");
    }
});

// Ruta para el Historial (GET)
app.get('/api/recibos', async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_PATH);
    const sheet = workbook.getWorksheet('Recibos');
    const recibos = [];
    sheet.eachRow((row, i) => {
        if (i > 1) {
            recibos.push({
                fecha: row.getCell(1).value,
                numero: row.getCell(2).value,
                cliente: row.getCell(3).value,
                productos: JSON.parse(row.getCell(4).value),
                total: row.getCell(5).value
            });
        }
    });
    res.json(recibos.reverse());
});

// Ruta para el Resumen del Día
app.get('/api/resumen-dia', async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(EXCEL_PATH);
        const sheet = workbook.getWorksheet('Recibos');
        
        const hoy = new Date().toLocaleDateString();
        let totalDinero = 0;
        let cantidadRecibos = 0;
        let detalle = [];

        sheet.eachRow((row, i) => {
            if (i > 1) {
                const fechaFila = row.getCell(1).value;
                if (fechaFila === hoy) {
                    // Limpiamos el símbolo '$' y convertimos a número para sumar
                    const montoStr = String(row.getCell(5).value).replace('$', '').trim();
                    totalDinero += parseFloat(montoStr) || 0;
                    cantidadRecibos++;
                    detalle.push({
                        nro: row.getCell(2).value,
                        cliente: row.getCell(3).value,
                        monto: row.getCell(5).value
                    });
                }
            }
        });

        res.json({ hoy, totalDinero, cantidadRecibos, detalle });
    } catch (e) {
        res.status(500).send("Error al generar resumen");
    }
});

app.listen(3000, () => console.log('✅ Servidor listo en http://localhost:3000'));