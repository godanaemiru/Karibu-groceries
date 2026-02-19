const express = require("express");
const router = express.Router();
const Procurement = require("../models/Procurement");
const requireRole = require("../middleware/roleCheck");


/**
 * @swagger
 * /procurement:
 * post:
 * summary: Record new produce (Managers only)
 * tags: [Procurement]
 * parameters:
 * - in: header
 * name: Authorization
 * required: true
 * description: Bearer token (e.g., "Bearer eyJhbG...")
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [produceName, produceType, tonnage, cost, dealerName, branch]
 * properties:
 * produceName:
 * type: string
 * produceType:
 * type: string
 * tonnage:
 * type: number
 * description: Minimum 3 digits
 * cost:
 * type: number
 * description: Minimum 5 digits
 * dealerName:
 * type: string
 * branch:
 * type: string
 * enum: [Maganjo, Matugga]
 * contact:
 * type: string
 * sellingPrice:
 * type: number
 * date:
 * type: string
 * format: date
 * time:
 * type: string
 * responses:
 * 201:
 * description: Produce recorded successfully
 * 403:
 * description: Access Denied
 * 400:
 * description: Validation error
 */


router.post("/", requireRole("Manager"), async (req, res) => {
  try {
    const newProcurement = new Procurement(req.body);
    await newProcurement.save();
    res
      .status(201)
      .json({ message: "Procurement recorded", data: newProcurement });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
