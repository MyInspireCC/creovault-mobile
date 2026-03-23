const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔑 Firebase Admin setup
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 🔑 Resend setup
const resend = new Resend("re_FJtzh7ya_G5VNHZTsZp56VQsMfMMPenzW");

// Generate OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 📩 Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = generateOtp();

  try {
    // Save OTP in Firestore
    await db.collection("otp").doc(email).set({
      otp,
      createdAt: Date.now(),
    });

    // Send Email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your CreoVault OTP",
      html: `<h2>Your OTP is ${otp}</h2>`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const doc = await db.collection("otp").doc(email).get();

    if (!doc.exists) {
      return res.status(400).json({ error: "No OTP found" });
    }

    const data = doc.data();

    if (data.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Optional: expire OTP (5 mins)
    if (Date.now() - data.createdAt > 5 * 60 * 1000) {
      return res.status(400).json({ error: "OTP expired" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
