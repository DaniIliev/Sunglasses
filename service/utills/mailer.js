const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SMTP_FROM, SMTP_USER, ADMIN_EMAIL } = process.env;

const FROM_EMAIL = SMTP_FROM || SMTP_USER;

if (!SENDGRID_API_KEY) {
  console.warn("⚠️ SENDGRID_API_KEY is not set; emails will fail.");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const sendMail = async ({ to, subject, html }) => {
  if (!to) {
    console.error("Missing recipient email");
    return;
  }

  if (!SENDGRID_API_KEY) {
    console.error("❌ SENDGRID_API_KEY not configured. Email not sent.");
    return;
  }

  try {
    console.log(`📧 Attempting to send email to: ${to}`);

    const [response] = await sgMail.send({
      to,
      from: FROM_EMAIL,
      subject,
      html,
    });
    console.log("✅ Email sent successfully to:", to, "| Message ID:", response.headers["x-message-id"] || "n/a");
    return response;
  } catch (error) {
    console.error("❌ Email send failed to:", to);
    console.error("Error details:", error.message || error.toString());
    console.error("Error code:", error.code);
    if (error.response?.body) {
      console.error("SendGrid response:", error.response.body);
    }
    throw error;
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
