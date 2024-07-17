import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

// import config from '../config';
import { changeMail, changePasswordInfo, confirmMail, resetPassword } from './templates';
import { strToBool } from '@utils/convert';
import { configMail } from './config/configMail';

@Injectable()
export class MailSenderService {
  private transporter: Mail;

  private socials: string;

  private logger = new Logger('MailSenderService');

  constructor() {
    this.transporter = createTransport({
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: strToBool(process.env.MAIL_SECURE.toLowerCase()),
    });
    // this.socials = config.project.socials
    //   .map(
    //     (social) =>
    // eslint-disable-next-line max-len
    //       `<a href="${social[1]}" style="box-sizing:border-box;color:${config.project.color};font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${social[0]}</a>`,
    //   )
    //   .join('');
  }

  async sendVerifyEmailMail(name: string, email: string, token: string): Promise<boolean> {
    const buttonLink = `${configMail.url.mailVerificationUrl}?token=${token}`;

    const mail = confirmMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), configMail.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), configMail.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), configMail.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), configMail.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), configMail.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), configMail.project.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink)
      .replace(new RegExp('--TermsOfServiceLink--', 'g'), configMail.project.termsOfServiceUrl);

    const mailOptions = {
      from: `"${configMail.sender.name}" <${configMail.sender.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Welcome to ${configMail.project.name} ${name}! Confirm Your Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn('Mail sending failed, check your service credentials.');
          resolve(false);
        }
        resolve(true);
      }),
    );
  }

  async sendChangeEmailMail(name: string, email: string, token: string): Promise<boolean> {
    const buttonLink = `${configMail.url.mailChangeUrl}?token=${token}`;

    const mail = changeMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), configMail.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), configMail.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), configMail.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), configMail.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), configMail.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), configMail.project.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${configMail.sender.name}" <${configMail.sender.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Change Your ${configMail.project.name} Account's Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn('Mail sending failed, check your service credentials.');
          resolve(false);
        }
        resolve(true);
      }),
    );
  }

  async sendResetPasswordMail(name: string, email: string, token: string): Promise<boolean> {
    const buttonLink = `${configMail.url.resetPasswordUrl}?token=${token}`;

    const mail = resetPassword
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), configMail.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), configMail.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), configMail.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), configMail.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), configMail.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), configMail.project.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${configMail.sender.name}" <${configMail.sender.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Reset Your ${configMail.project.name} Account's Password`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn('Mail sending failed, check your service credentials.');
          resolve(false);
        }
        resolve(true);
      }),
    );
  }

  async sendPasswordChangeInfoMail(name: string, email: string): Promise<boolean> {
    const buttonLink = configMail.project.url;
    const mail = changePasswordInfo
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), configMail.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), configMail.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), configMail.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), configMail.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), configMail.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), configMail.project.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${configMail.sender.name}" <${configMail.sender.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Your ${configMail.project.name} Account's Password is Changed`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn('Mail sending failed, check your service credentials.');
          resolve(false);
        }
        resolve(true);
      }),
    );
  }
}
