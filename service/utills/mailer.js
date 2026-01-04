const nodemailer = require("nodemailer");

const { GMAIL_USER, GMAIL_APP_PASSWORD, ADMIN_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 2,
  maxMessages: 20,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// Send emails in background so API responses aren't blocked by SMTP
const sendInBackground = (mailOptions, successMsg, errorPrefix) => {
  setImmediate(() => {
    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log(successMsg);
      })
      .catch((error) => {
        console.error(errorPrefix, error);
      });
  });
};

const sendMail = ({ to, subject, html }) => {
  if (!to) {
    console.error("Missing recipient email");
    return;
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("❌ Gmail credentials not configured. Email not sent.");
    return;
  }

  const mailOptions = {
    from: GMAIL_USER,
    to,
    subject,
    html,
  };

  sendInBackground(
    mailOptions,
    `✅ Email sent successfully to: ${to}`,
    `❌ Email send failed to ${to}:`
  );
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

const sendOrderNotificationToVistoptics = (purchase) =>
  sendMail({
    to: "vistoptics@gmail.com",
    subject: `🔔 Нова поръчка #${purchase.orderCode} - ${purchase.firstname} ${purchase.lastname}`,
    html: `
      <p><strong>📦 Нова поръчка е направена!</strong></p>
      ${orderDetailsHtml(purchase)}
      <p><strong>Действия:</strong> Моля, преглед на поръчката и обработка.</p>
    `,
  });

module.exports = {
  sendOrderPlacedCustomer,
  sendOrderPlacedAdmin,
  sendOrderApproved,
  sendOutOfStockNotice,
  sendOrderNotificationToVistoptics,
};
