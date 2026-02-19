const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const requireRole = require("../middleware/roleCheck");

/**
 * @swagger
 * /sales:
 * post:
 * summary: Record a new sale (Cash or Credit)
 * tags: [Sales]
 * parameters:
 * - in: header
 * name: Authorization
 * schema:
 * type: string
 * required: true
 * description: Bearer token (e.g., "Bearer eyJhbG...")
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * saleType:
 * type: string
 * enum: [Cash, Credit]
 * produceName:
 * type: string
 * amount:
 * type: number
 * buyerName:
 * type: string
 * salesAgentName:
 * type: string
 * buyerNIN:
 * type: string
 * location:
 * type: string
 * contact:
 * type: string
 * responses:
 * 201:
 * description: Sale recorded
 * 400:
 * description: Validation error
 */
router.post("/", requireRole("Sales Agent"), async (req, res) => {
  try {
    const {
      saleType,
      buyerNIN,
      location,
      contact,
      dueDate,
      dispatchDate,
      buyerName,
    } = req.body;

    // Conditional Validation Logic
    if (saleType === "Credit") {
      if (!buyerNIN || !/^[A-Z0-9]+$/.test(buyerNIN))
        throw new Error("Valid NIN required for credit sales");
      if (!location || location.length < 2)
        throw new Error("Valid Location required for credit sales");
      if (!contact) throw new Error("Contact required for credit sales");
      if (!dueDate || !dispatchDate)
        throw new Error("Due Date and Dispatch Date required");
    } else if (saleType === "Cash") {
      if (!buyerName || !/^[a-zA-Z0-9 ]+$/.test(buyerName))
        throw new Error("Valid Buyer Name required");
    }

    const newSale = new Sale(req.body);
    await newSale.save();
    res
      .status(201)
      .json({ message: "Sale recorded successfully", data: newSale });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
