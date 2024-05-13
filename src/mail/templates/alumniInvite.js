exports.alumniInvite = (
    enrollment,
    Password,
  ) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alumni Platform Invitation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f5f9;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #007bff;
                text-align: center;
                margin-bottom: 20px;
            }
            p {
                color: #555;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .cta-btn {
                display: inline-block;
                background-color: #007bff;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            .cta-btn:hover {
                background-color: #0056b3;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                color: #888;
            }
            .logo {
                display: block;
                margin: 0 auto;
                width: 150px;
                height: auto;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://www.glsuniversity.ac.in/images/logo_New.jpg"alt="Alumni Platform Logo" class="logo">
            <h1>Invitation to Our Alumni Platform</h1>
            <p>Dear Alumni,</p>
            <p>We are excited to invite you to join our Alumni Platform, where you can reconnect with fellow alumni, explore job opportunities, and stay updated on upcoming events.</p>
            <p>Your login credentials:</p>
            <p><strong>Username:</strong>${enrollment}<br>
            <strong>Password:</strong>${Password}</p>
            <p>Click the button below to get started:</p>
            <a href="[Your Alumni Platform URL]" class="cta-btn">Access Alumni Platform</a>
            <p class="footer">If you have any questions or need assistance, feel free to contact us at [Your Contact Information].</p>
        </div>
    </body>
    </html>
    `
  }