const verifyAccountEmail = (name: string, url: string) => {
  const message = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to [Website Name]!</title>
    <style>
      body {
        background-color: #f6f6f6;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333333;
        padding: 0;
        margin: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
        padding: 40px;
        box-sizing: border-box;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        font-weight: 600;
      }
      h1 {
        font-size: 28px;
        color: #0085a1;
        margin-bottom: 20px;
      }
      p {
        margin: 0;
        margin-bottom: 20px;
      }
      a {
        color: #0085a1;
      }
      a.button {
        color: #ffffff;
      }
      .button {
        display: inline-block;
        background-color: #0085a1;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
        font-weight: 600;
      }
      .button:hover {
        background-color: #00667f;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Karam's Thoughts!</h1>
      <p>Dear ${name},</p>
      <p>
        Thank you for joining Karam's Thoughts! We're excited to have you on
        board.
      </p>
      <p>
        If you have any questions or concerns, please don't hesitate to contact
        us.
      </p>
      <p>Thank you,</p>
      <p>Karam from Karam's Thoughts</p>
      <a href="${url}" id="verify-link" target="_blank" class="button"
        >Verify Account</a
      >
    </div>
  </body>
</html>
`;
  return message;
};

export default verifyAccountEmail;
