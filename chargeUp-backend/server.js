// Replace ONLY this route in your server.js
app.post("/api/payment/generate-hash", (req, res) => {
  try {
    const { orderId, amount } = req.body;

    // 1. Pulling from .env (Make sure these exist!)
    const merchantId = process.env.PAYHERE_MERCHANT_ID?.trim();
    const merchantSecret = process.env.PAYHERE_SECRET?.trim();

    if (!merchantId || !merchantSecret) {
      console.error("❌ ERROR: Missing PAYHERE_MERCHANT_ID or PAYHERE_SECRET in .env file!");
      return res.status(500).json({ message: "Missing env variables" });
    }

    // 2. Format strictly
    const currency = "LKR";
    const amountFormatted = parseFloat(amount).toFixed(2);
    const orderIdClean = String(orderId).trim();

    // 3. Log everything so you can see the mismatch
    console.log("\n--- 🔍 PAYHERE HASH DEBUG 🔍 ---");
    console.log(`1. Merchant ID : '${merchantId}'`);
    console.log(`2. Order ID    : '${orderIdClean}'`);
    console.log(`3. Amount      : '${amountFormatted}'`);
    console.log(`4. Currency    : '${currency}'`);
    
    // 4. Calculate Hash
    const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    const stringToHash = merchantId + orderIdClean + amountFormatted + currency + hashedSecret;
    
    console.log(`5. Exact string being hashed: '${stringToHash}'`);

    const hash = crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();
    console.log(`6. Final Generated Hash: '${hash}'`);
    console.log("--------------------------------\n");

    res.json({ hash, merchantId, orderIdClean });
  } catch (error) {
    console.error("Hash Error:", error);
    res.status(500).json({ message: "Hash generation failed" });
  }
});

