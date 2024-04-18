export type SMTPServer =
    | '1und1'
    | 'AOL'
    | 'DebugMail.io'
    | 'DynectEmail'
    | 'FastMail'
    | 'GandiMail'
    | 'Gmail'
    | 'Godaddy'
    | 'GodaddyAsia'
    | 'GodaddyEurope'
    | 'hot.ee'
    | 'Hotmail'
    | 'iCloud'
    | 'mail.ee'
    | 'Mail.ru'
    | 'Mailgun'
    | 'Mailjet'
    | 'Mandrill'
    | 'Naver'
    | 'Postmark'
    | 'QQ'
    | 'QQex'
    | 'SendCloud'
    | 'SendGrid'
    | 'SES'
    | 'Sparkpost'
    | 'Yahoo'
    | 'Yandex'
    | 'Zoho';

export interface SendMailResponse {
    success: boolean;
}

export interface Email {
    from: string;
    password: string;
    to: string;
    smtpServer: SMTPServer;
    subject: string;
    body: string;
}
