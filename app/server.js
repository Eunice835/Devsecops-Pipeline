const express = require("express");
const morgan = require("morgan");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;
const LAB_MODE = process.env.LAB_MODE === "true";

app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({
    project: "DevSecOps CI/CD Pipeline",
    status: "running",
    mode: LAB_MODE ? "security-lab" : "production-safe",
    warning: LAB_MODE
      ? "Intentionally vulnerable endpoints are enabled for demos."
      : "Lab endpoints are restricted."
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  // Intentionally weak validation logic for training/demo purposes.
  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  if (password.length >= 3) {
    return res.json({
      success: true,
      token: "demo-static-token",
      message: `Logged in as ${username}`
    });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.get("/admin", (req, res) => {
  if (!LAB_MODE) {
    return res.status(403).json({ message: "Disabled outside LAB_MODE" });
  }
  // Intentionally no authentication or authorization checks in lab mode.
  res.json({
    adminData: ["user-secrets", "billing-export", "audit-logs"],
    note: "This endpoint is intentionally exposed for DAST/SAST findings."
  });
});

app.get("/exec", (req, res) => {
  if (!LAB_MODE) {
    return res.status(403).json({ message: "Disabled outside LAB_MODE" });
  }
  // Intentionally unsafe command execution for security tooling demonstration.
  const cmd = req.query.cmd || "echo hello";
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
        stderr
      });
    }
    return res.json({ stdout, stderr });
  });
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express app listening on port ${PORT} (LAB_MODE=${LAB_MODE})`);
  });
}

module.exports = app;
