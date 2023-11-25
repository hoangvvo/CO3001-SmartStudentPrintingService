import { pool } from "./database.js";
import type { PrinterDbObject } from "./types.js";

export const printerRepository = {
  async createPrinter(printer: {
    brand_name: string | null;
    model_name: string | null;
    capabilities: string[];
    location: string | null;
    printer_address: string;
    image_url: string | null;
    paper_sizes: string[];
    paper_count: number;
  }) {
    const res = await pool.query<PrinterDbObject>(
      `
      INSERT INTO printer (brand_name, model_name, capabilities, location, printer_address, image_url, paper_sizes, paper_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
      [
        printer.brand_name,
        printer.model_name,
        printer.capabilities,
        printer.location,
        printer.printer_address,
        printer.image_url,
        printer.paper_sizes,
        printer.paper_count,
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
      image_url: string | null;
      paper_sizes: string[];
      paper_count: number;
    }>,
  ) {
    const res = await pool.query<PrinterDbObject>(
      `
      UPDATE printer
      SET brand_name = $1, model_name = $2, capabilities = $3, location = $4, printer_address = $5, is_enabled = $6, image_url = $7, paper_sizes = $8, paper_count = $9
      WHERE id = $10
      RETURNING *
    `,
      [
        printer.brand_name,
        printer.model_name,
        printer.capabilities,
        printer.location,
        printer.printer_address,
        printer.is_enabled,
        printer.image_url,
        printer.paper_sizes,
        printer.paper_count,
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
