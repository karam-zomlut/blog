const generatePasswordResetEmail = (token: string) => {
  const message = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Forgot Password</title>
    <style>
      /* Fonts */
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');
      
      /* Primary color */
      :root {
        --primary-color: #0095FF;
      }
      
      /* Body */
      body {
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', sans-serif;
        background-color: #F5F7FA;
        color: #4F4F4F;
      }
      
      /* Container */
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 50px;
        background-color: #FFFFFF;
        border-radius: 10px;
        box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
      }
      
      /* Heading */
      h1 {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 30px;
        text-align: center;
        color: var(--primary-color);
      }
      
      /* Button */
      .button {
        display: inline-block;
        background-color: var(--primary-color);
        color: #FFFFFF;
        padding: 10px 15px;
        text-align: center;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
        margin-top: 30px;
      }
      
      /* Button Hover */
      .button:hover {
        opacity: 0.8;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Forgot Password?</h1>
      <p>Hello,</p>
      <p>You recently requested to reset your password. To do so, please click the button below:</p>
      <a href="${token}" class="button">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Thank you,</p>
      <p>The Karam's Thoughts Team</p>
    </div>
  </body>
</html>
  `;
  return message;
};

export default generatePasswordResetEmail;
