import { type GetVerificationEmailContentFn, type GetPasswordResetEmailContentFn } from 'wasp/server/auth';

export const getVerificationEmailContent: GetVerificationEmailContentFn = ({ verificationLink }: { verificationLink: string }) => ({
  subject: 'Verify your email for Loan App',
  text: `Welcome to Loan App! Please verify your email by clicking this link: ${verificationLink}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            background: linear-gradient(to bottom, #000000, #1a1a1a);
            padding: 2rem;
            max-width: 600px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            color: #ffffff;
          }
          .header {
            text-align: center;
            margin-bottom: 2rem;
          }
          .title {
            background: linear-gradient(to right, #60a5fa, #8b5cf6, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 24px;
            font-weight: bold;
          }
          .button {
            background: linear-gradient(to right, #8b5cf6, #3b82f6);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            font-weight: 500;
            margin: 1rem 0;
            text-align: center;
          }
          .footer {
            margin-top: 2rem;
            text-align: center;
            font-size: 14px;
            color: #9ca3af;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Welcome to Loan App</h1>
          </div>
          <p>Thanks for signing up! Please verify your email address to get started.</p>
          <div style="text-align: center;">
            <a href="${verificationLink}" class="button">
              Verify Email Address
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #8b5cf6;">${verificationLink}</p>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Loan App. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
});

export const getPasswordResetEmailContent: GetPasswordResetEmailContentFn = ({ passwordResetLink }: { passwordResetLink: string }) => ({
  subject: 'Reset your Loan App password',
  text: `Reset your password by clicking this link: ${passwordResetLink}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            background: linear-gradient(to bottom, #000000, #1a1a1a);
            padding: 2rem;
            max-width: 600px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            color: #ffffff;
          }
          .header {
            text-align: center;
            margin-bottom: 2rem;
          }
          .title {
            background: linear-gradient(to right, #60a5fa, #8b5cf6, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 24px;
            font-weight: bold;
          }
          .button {
            background: linear-gradient(to right, #8b5cf6, #3b82f6);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            font-weight: 500;
            margin: 1rem 0;
            text-align: center;
          }
          .footer {
            margin-top: 2rem;
            text-align: center;
            font-size: 14px;
            color: #9ca3af;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Reset Your Password</h1>
          </div>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center;">
            <a href="${passwordResetLink}" class="button">
              Reset Password
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #8b5cf6;">${passwordResetLink}</p>
          <p>If you didn't request this password reset, you can safely ignore this email.</p>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Loan App. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
});
