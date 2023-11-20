import { pool } from "./database.js";
import type { PrinterDbObject } from "./types.js";

export const printerRepository = {
  async createPrinter(printer: {
    brand_name: string | null;
    model_name: string | null;
    capabilities: string[];
    location: string | null;
    printer_address: string;
  }) {
    const res = await pool.query<PrinterDbObject>(
      `
      INSERT INTO printer (brand_name, model_name, capabilities, location, printer_address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [
        printer.brand_name,
        printer.model_name,
        printer.capabilities,
        printer.location,
        printer.printer_address,
      ],
    );

    return res.rows[0];
  },

  async getPrinterById(id: number) {
    const res = await pool.query<PrinterDbObject>(
      `
      SELECT * FROM printer WHERE id = $1
    `,
      [id],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async getPrinters() {
    const res = await pool.query<PrinterDbObject>(
      `
      SELECT * FROM printer
    `,
    );
    console.log(res.fields);

    return res.rows;
  },

  async updatePrinterById(
    id: number,
    printer: Partial<{
      brand_name: string | null;
      model_name: string | null;
      capabilities: string[];
      location: string | null;
      printer_address: string;
      is_enabled: boolean;
    }>,
  ) {
    const res = await pool.query<PrinterDbObject>(
      `
      UPDATE printer
      SET brand_name = $1, model_name = $2, capabilities = $3, location = $4, printer_address = $5, is_enabled = $6
      WHERE id = $7
      RETURNING *
    `,
      [
        printer.brand_name,
        printer.model_name,
        printer.capabilities,
        printer.location,
        printer.printer_address,
        printer.is_enabled,
        id,
      ],
    );

    return res.rows[0];
  },

  async deletePrinterById(id: number) {
    const res = await pool.query<PrinterDbObject>(
      `
      DELETE FROM printer
      WHERE id = $1
      RETURNING *
    `,
      [id],
    );

    return res.rows[0];
  },
};
