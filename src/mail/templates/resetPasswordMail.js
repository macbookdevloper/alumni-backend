exports.resetPasswordMail = (token, alumniName) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #0047ab;
            padding: 20px;
            text-align: center;
            color: #ffffff;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        .email-header img {
            max-width: 150px;
            margin-bottom: 10px;
        }

        .email-header h1 {
            font-size: 24px;
            margin: 0;
        }

        .email-body {
            padding: 30px;
            color: #333333;
        }

        .email-body h2 {
            color: #0047ab;
            font-size: 22px;
            margin-bottom: 20px;
        }

        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .reset-button {
            display: block;
            padding: 14px 28px;
            background-color: #0047ab;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin: 0 auto;
            width: 200px;
        }

        .email-footer {
            background-color: #f1f1f1;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #777777;
        }

        .email-footer p {
            margin: 5px 0;
        }

        .email-footer a {
            color: #0047ab;
            text-decoration: none;
        }

        @media (max-width: 600px) {
            .email-container {
                width: 100%;
            }

            .email-body {
                padding: 20px;
            }

            .reset-button {
                padding: 12px 20px;
                font-size: 15px;
                width: auto;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header with Logo -->
        <div class="email-header">
            <img src="https://www.glsuniversity.ac.in/images/logo_New.jpg" alt="College Logo">
            <h1>Password Reset Request</h1>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <h2>Hi Dear ${alumniName},</h2>
            <p>We received a request to reset your password. To reset your password, click the button below. If you did not request this, please ignore this email.</p>
            <a href="http://localhost:3001/v2/reset/${token}" class="reset-button">Reset Password</a>
            <p>This link will expire in 24 hours for security reasons.</p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <p>If you’re having trouble clicking the button, copy and paste the following link into your browser:</p>
            <p><a href="http://localhost:3001/v2/reset/${token}">http://localhost:3001/v2/reset/${token}</a></p>
            <p>Thank you! <br> GLS Univsity</p>
        </div>
    </div>
</body>
</html>`;
};
