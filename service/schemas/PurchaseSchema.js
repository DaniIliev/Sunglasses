const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"], // Error message for missing user
  },
  sunglasses: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sunglasses",
        required: [true, "Sunglasses item is required"], // Error message for missing sunglasses item
      },
      pricePerUnit: {
        type: Number,
        required: [true, "Price per unit is required"], // Error message for missing price per unit
        description: "Price of one unit of the sunglasses",
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"], // Error message for missing quantity
        min: [1, "Quantity must be at least 1"],
        description: "Number of sunglasses purchased",
      },
      totalPrice: {
        type: Number,
        required: [true, "Total price for this item is required"], // Error message for missing total price
        description: "Total price for this item (pricePerUnit * quantity)",
      },
    },
  ],
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  totalPurchasePrice: {
    type: Number,
    required: [true, "Total purchase price is required"], // Error message for missing total purchase price
    description: "Total price for the entire purchase",
  },
  city: {
    type: String,
    required: [true, "City is required"], // Error message for missing city
    minlength: [2, "City must be at least 2 characters long"],
    maxlength: [100, "City cannot exceed 100 characters"],
    description: "City where the order will be delivered",
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"], // Error message for missing postal code
    description: "Postal code for delivery",
  },
  deliveryAddress: {
    type: String,
    required: [true, "Delivery address is required"], // Error message for missing delivery address
    minlength: [5, "Delivery address must be at least 5 characters long"],
    maxlength: [255, "Delivery address cannot exceed 255 characters"],
    description: "Street address for delivery",
  },
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports = Purchase;


  