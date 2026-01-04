const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 2,
  maxMessages: 20,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: "vistoptics@gmail.com",
    pass: "cloc mbef fbqy lfrh",
  },
});

const sendMail = async ({ to, subject, html }) => {
  if (!to) {
    console.error("Missing recipient email");
    return;
  }

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email send failed", error);
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
