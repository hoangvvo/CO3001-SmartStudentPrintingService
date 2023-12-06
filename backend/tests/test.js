import { describe, it } from "node:test";

describe("routes /users", () => {
  describe("GET /users", () => {
    it("return current logged in user", async () => {});
  });
  describe("POST /users", () => {
    it("should create user", async () => {});
    it("should throws error if email already exists", async () => {});
    it("should throws error if invalid input", async () => {});
  });
});

describe("routes /printer-jobs", () => {
  describe("POST /printer-jobs", () => {
    it("should create printer job and deduct user balance", async () => {});
    it("should throws error if user runs out of credits", async () => {});
    it("should throws error if printing properties not compatible with printer", async () => {});
  });

  describe("GET /printer-jobs", () => {
    it("should return a list of printer jobs", async () => {});
    it("should return all printer jobs if user is admin/spso", async () => {});
  });
});

describe("routes /printers", () => {
  describe("GET /printers", () => {
    it("should return a list of printers", async () => {});
  });

  describe("POST /pritners", () => {
    it("should create printer", async () => {});
    it("should prevent student-role user to create printer", async () => {});
    it("should throws error if invalid input", async () => {});
  });

  describe("GET /printers/:id", () => {
    it("should return printer", async () => {});
    it("should throws error if printer not found", async () => {});
  });

  describe("PUT /printers/:id", () => {
    it("should update printer", async () => {});
    it("should throws error if printer not found", async () => {});
    it("should throws error if invalid input", async () => {});
  });
});

describe;
