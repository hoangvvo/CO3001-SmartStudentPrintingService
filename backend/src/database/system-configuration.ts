import { pool } from "./database.js";
import type { SystemConfigurationsDbObject } from "./types.js";

export const systemConfigurationRepository = {
  async getSystemConfiguration() {
    const res = await pool.query<SystemConfigurationsDbObject>(
      `
      SELECT * FROM system_configurations
    `,
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async upsertSystemConfiguration(
    systemConfiguration: Partial<{
      default_page_balance: number;
      cron_of_default_page_balance_grant: string;
      permitted_file_types: string[];
      max_file_size: number;
    }>,
  ) {
    const resExisted = await pool.query<SystemConfigurationsDbObject>(
      `
      SELECT * FROM system_configurations
    `,
    );

    if (resExisted.rowCount === 0) {
      const res = await pool.query<SystemConfigurationsDbObject>(
        `
        INSERT INTO system_configurations (default_page_balance, cron_of_default_page_balance_grant, permitted_file_types, max_file_size)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
        [
          systemConfiguration.default_page_balance,
          systemConfiguration.cron_of_default_page_balance_grant,
          systemConfiguration.permitted_file_types,
          systemConfiguration.max_file_size,
        ],
      );

      return res.rows[0];
    } else {
      const res = await pool.query<SystemConfigurationsDbObject>(
        `
      UPDATE system_configurations
      SET default_page_balance = $1,
          cron_of_default_page_balance_grant = $2,
          permitted_file_types = $3,
          max_file_size = $4
      WHERE id = $5
      RETURNING *
    `,
        [
          systemConfiguration.default_page_balance,
          systemConfiguration.cron_of_default_page_balance_grant,
          systemConfiguration.permitted_file_types,
          systemConfiguration.max_file_size,
          resExisted.rows[0].id,
        ],
      );
      return res.rows[0];
    }
  },
};
