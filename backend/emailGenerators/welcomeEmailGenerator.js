module.exports.createWelcomeEmailHtml = (customerFirstName, customerLastName , login) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Nice Gadgets!</title>
    <link rel="stylesheet" href="emailWelcome.css">

</head>
<body>
<div class="container">
    <h1>Welcome to Nice Gadgets!</h1>
    <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1712393815/sxhtepbcyn1msl7vptct.webp" alt="logo">
    <p>Hello ${customerFirstName} ${customerLastName},</p>

    <p>
        Welcome aboard to NiceGadgets Store! We're thrilled to have you join our community of tech enthusiasts and
        gadget aficionados.
        <span>Your registration has been successfully completed</span> ,
        and we're excited to start this journey with you. Here's a quick overview of what you can expect
    </p>

    <p>Your account has been successfully created with the following details:</p>
    <ul>
        <li>Login: ${login}</li>
        <li>First Name: ${customerFirstName}</li>
        <li>Last Name: ${customerLastName}</li>
    </ul>

    <p>Best regards,<br>Nice Gadgets Team</p>
    <p>Social media:</p>
    <div class="social">
        <div >
            <a
                    href="https://t.me/nicegadgetstore"
                    target="_blank"
                    rel="noreferrer"
            >
                <img
                        src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375286/Slider/zwpnzpy4gdrardowloam.webp"
                        alt="Telegram"
                />
            </a>
        </div>
        <div>
            <a
                    href="https://www.instagram.com/n1cegadgetstore"
                    target="_blank"
                    rel="noreferrer"
            >
                <img
                        src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375285/Slider/iypblt7wvhyl9vjywwdr.webp"
                        alt="Instagram"
                />
            </a>
        </div>
        <div>
            <a
                    href="https://www.facebook.com/groups/258628787334330"
                    target="_blank"
                    rel="noreferrer"
            >
                <img
                        src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375284/Slider/ba2xqvptwh9cpu5ekzij.webp"
                        alt="Facebook"
                />
            </a>
        </div>
        <div>
            <a
                    href="mailto:testfrontendmail@gmail.com"
                    target="_blank"
                    rel="noreferrer"
            >
                <img
                        src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375285/Slider/xqxh0u9umai1oa91dgg8.webp"
                        alt="Gmail"
                />
            </a>
        </div>
    </div>
</div>
</body>
</html>


  `;
};