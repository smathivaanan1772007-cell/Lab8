// Step 1: Switch to Inventory Database
use inventoryDB;

// Step 2: Insert Inventory Stock Records
db.inventory.insertMany([
  { sku: "SKU-101", warehouseId: "WH_NORTH", stock: 1500, status: "IN_STOCK" },
  { sku: "SKU-102", warehouseId: "WH_SOUTH", stock: 10, status: "LOW_STOCK" },
  { sku: "SKU-103", warehouseId: "WH_NORTH", stock: 0, status: "OUT_OF_STOCK" }
]);

// Step 3: Create Compound Index on warehouseId and sku for optimized tracking
db.inventory.createIndex({ warehouseId: 1, sku: 1 });

// Step 4: Create Partial Index to optimize queries for low stock items
db.inventory.createIndex(
  { stock: 1 },
  { partialFilterExpression: { status: "LOW_STOCK" } }
);

// Step 5: Verify Query Execution Strategy using Explain Plan
db.inventory.find({ warehouseId: "WH_NORTH", sku: "SKU-101" }).explain("executionStats");
