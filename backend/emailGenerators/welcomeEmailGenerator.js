module.exports.createWelcomeEmailHtml = (customerFirstName, customerLastName , login) => {
  return `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Nice Gadgets!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Nice Gadgets!</h1>
    <p>Dear ${customerFirstName} ${customerLastName},</p>
    
    <p>We're delighted to have you as part of our tech-savvy community. Thank you for choosing Nice Gadgets as your go-to destination for all things Apple.</p>

    <p>Your account has been successfully created with the following details:</p>
    <ul>
      <li>First Name: ${customerFirstName}</li>
      <li>Last Name: ${customerLastName}</li>
      <li>Login: ${login}</li>
    </ul>

    <p>You can now log in to your Nice Gadgets account using your username and the password you provided during registration.</p>

    <p>Explore our website to discover the latest Apple tablets, phones, and accessories that will elevate your tech experience.</p>

    <p>If you have any questions about our products or need assistance, our dedicated support team is here to help. We're committed to providing you with excellent service and top-notch gadgets.</p>

    <p>Thank you for choosing Nice Gadgets. We look forward to bringing you the latest and greatest in Apple technology!</p>

    <p>Best regards,<br>Nice Gadgets Team</p>
  </div>
</body>
</html>

  `;
};