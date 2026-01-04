const nodemailer = require("nodemailer");

const { SMTP_USER, SMTP_PASS, SMTP_FROM, ADMIN_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true, // use SSL
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  pool: true,
  maxConnections: 2,
  maxMessages: 20,
  connectionTimeout: 30000, // increased timeout
  greetingTimeout: 30000,
  socketTimeout: 30000,
  logger: true, // enable logging
  debug: true, // show SMTP traffic
});

const sendMail = async ({ to, subject, html }) => {
  if (!to) {
    console.error("Missing recipient email");
    return;
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("❌ SMTP credentials not configured. Email not sent.");
    console.error("Set SMTP_USER and SMTP_PASS in .env file");
    return;
  }

  try {
    console.log(`📧 Attempting to send email to: ${to}`);

    const info = await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to,
      subject,
      html,
    });
    console.log(
      "✅ Email sent successfully to:",
      to,
      "| Message ID:",
      info.messageId
    );
    return info;
  } catch (error) {
    console.error("❌ Email send failed to:", to);
    console.error("Error details:", error.message);
    console.error("Error code:", error.code);

    if (error.code === "ETIMEDOUT") {
      console.error(
        "⚠️  SMTP connection timeout - firewall may be blocking Gmail SMTP"
      );
    }
    if (error.code === "EAUTH") {
      console.error(
        "⚠️  Authentication failed - check SMTP_USER and SMTP_PASS"
      );
    }
    console.error("SMTP config:", {
      user: SMTP_USER,
      from: SMTP_FROM,
      service: "gmail",
    });
    throw error; // propagate to caller so Promise.allSettled marks as rejected
  }
};

const formatProducts = (sunglasses = []) =>
  sunglasses
    .map(
      (item) =>
        `${item.name} x${item.quantity} — ${
          item.totalPrice?.toFixed?.(2) || item.totalPrice
        } лв.`
    )
    .join("<br/>");

const orderDetailsHtml = (purchase) => `
  <p><strong>Поръчка #${purchase.orderCode}</strong></p>
  <p>Име: ${purchase.firstname} ${purchase.lastname}</p>
  <p>Имейл: ${purchase.email}</p>
  <p>Телефон: ${purchase.phoneNumber}</p>
  <p>Адрес: ${purchase.address} №${purchase.addressNum}, ${purchase.city}, ${
  purchase.zipCode
}</p>
  <p>Продукти:<br/>${formatProducts(purchase.sunglasses)}</p>
  <p>Обща сума: ${purchase.totalPurchasePrice} лв.</p>
  <p>Дата: ${purchase.purchaseDate}</p>
  ${purchase.additionalInfo ? `<p>Бележка: ${purchase.additionalInfo}</p>` : ""}
`;

const sendOrderPlacedCustomer = (purchase) =>
  sendMail({
    to: purchase.email,
    subject: `Успешно направена поръчка #${purchase.orderCode}`,
    html: `
      <p>Здравейте, ${purchase.firstname},</p>
      <p>Получихме Вашата поръчка и я обработваме.</p>
      ${orderDetailsHtml(purchase)}
      <p>Благодарим Ви!</p>
    `,
  });

const sendOrderPlacedAdmin = (purchase) =>
  sendMail({
    to: ADMIN_EMAIL,
    subject: `Нова поръчка #${purchase.orderCode}`,
    html: `
      <p>Има нова поръчка.</p>
      ${orderDetailsHtml(purchase)}
    `,
  });

const sendOrderApproved = (purchase) =>
  sendMail({
    to: purchase.email,
    subject: `Поръчка #${purchase.orderCode} е одобрена`,
    html: `
      <p>Здравейте, ${purchase.firstname},</p>
      <p>Поръчката Ви е одобрена и ще бъде подготвена за изпращане.</p>
      ${orderDetailsHtml(purchase)}
      <p>Благодарим Ви!</p>
    `,
  });

const sendOutOfStockNotice = (purchase) =>
  sendMail({
    to: purchase.email,
    subject: `Поръчка #${purchase.orderCode} - недостъпна наличност`,
    html: `
      <p>Здравейте, ${purchase.firstname},</p>
      <p>За съжаление, някои продукти от поръчката Ви не са налични в момента.</p>
      ${orderDetailsHtml(purchase)}
      <p>Моля, свържете се с нас за алтернативи или изчакайте нова наличност.</p>
    `,
  });

module.exports = {
  sendOrderPlacedCustomer,
  sendOrderPlacedAdmin,
  sendOrderApproved,
  sendOutOfStockNotice,
};
