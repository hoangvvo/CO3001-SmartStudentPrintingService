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

export interface PrinterJobDbObject {
  id: number;
  printer_id: number;
  user_id: number;
  file_id: number;
  start_time: Date;
  end_time: Date | null;
  page_size: string;
  page_count: number;
  double_side: boolean | null;
  color: boolean | null;
}

export const printerJobRepository = {
  async createPrinterJob(printerJob: {
    printer_id: number;
    user_id: number;
    file_id: number;
    start_time: Date;
    end_time: Date | null;
    page_size: string;
    page_count: number;
    double_side: boolean | null;
    color: boolean | null;
  }) {
    const res = await pool.query<PrinterJobDbObject>(
      `
      INSERT INTO printer_job (printer_id, user_id, file_id, start_time, end_time, page_size, page_count, double_side, color)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
      [
        printerJob.printer_id,
        printerJob.user_id,
        printerJob.file_id,
        printerJob.start_time,
        printerJob.end_time,
        printerJob.page_size,
        printerJob.page_count,
        printerJob.double_side,
        printerJob.color,
      ],
    );

    return res.rows[0];
  },

  async getPrinterJobById(id: number) {
    const res = await pool.query<PrinterJobDbObject>(
      `
      SELECT * FROM printer_job WHERE id = $1
    `,
      [id],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async getPrinterJobs() {
    const res = await pool.query<PrinterJobDbObject>(
      `
      SELECT * FROM printer_job
    `,
    );

    return res.rows;
  },

  async getPrinterJobsByUserId(user_id: number) {
    const res = await pool.query<PrinterJobDbObject>(
      `
      SELECT * FROM printer_job WHERE user_id = $1
    `,
      [user_id],
    );

    return res.rows;
  },

  async updatePrinterJobById(
    id: number,
    printerJob: Partial<{
      printer_id: number;
      user_id: number;
      file_id: number;
      start_time: Date;
      end_time: Date | null;
      page_size: string;
      page_count: number;
      double_side: boolean | null;
      color: boolean | null;
    }>,
  ) {
    const res = await pool.query<PrinterJobDbObject>(
      `
      UPDATE printer_job
      SET printer_id = $1, user_id = $2, file_id = $3, start_time = $4, end_time = $5, page_size = $6, page_count = $7, double_side = $8, color = $9
      WHERE id = $10
      RETURNING *
    `,
      [
        printerJob.printer_id,
        printerJob.user_id,
        printerJob.file_id,
        printerJob.start_time,
        printerJob.end_time,
        printerJob.page_size,
        printerJob.page_count,
        printerJob.double_side,
        printerJob.color,
        id,
      ],
    );

    return res.rows[0];
  },
};
