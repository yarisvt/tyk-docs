---
date: 2017-03-27T15:51:05+01:00
title: Outbound Email Configuration
menu:
  main:
    parent: "Configure"
weight: 6 
---

### Custom Email Templates

The email templates for the Portal and system messages are located in the `portal/email_templates` directory. 
The Tyk Dashboard will need to be restarted for changes to take effect.

### Supported email drivers

* SMTP
* Mandrill
* Sendgrid
* Mailgun
* AmazonSES

To get email set up for your installation, add the following to your `tyk_analytics.conf` file:

```{.copyWrapper}
"email_backend": {
  "enable_email_notifications": true,
  "code": "{PROVIDER-NAME}",
  "settings": {
    // Client provider specific settings go here. You can find the specific field described below 
  },
  "default_from_email": "jeff@wheresmyrug.com",
  "default_from_name": "Jeffrey (The Dude) Lebowski"
}
```

#### SMTP

> Available from Tyk Dashboard version 1.7

```{.json}
"code": "smtp",
"settings": {
  "SMTPUsername": "email@example.com",
  "SMTPPassword": "examplepassword",
  "SMTPAddress": "smtp.example.com:587"
},
```

From Tyk Dashboard v1.8.0, if `SMTPUsername` or `SMTPPassword` is omitted, Tyk assumes that authentication is not required for your SMTP server. When starting up and initialising the email driver, the Dashboard should output a log message as follows:

```
[May  6 13:46:41]  INFO email: initializing SMTP email driver
[May  6 13:46:41]  INFO email: SMTPUsername and/or SMTPPassword not set - smtp driver configured for no-auth
[May  6 13:46:41]  INFO email: SMTP email driver initialized
```

#### Mandrill

```{.json}
"code": "mandrill",
"settings": {
  "ClientKey": "xxxxxxxxx"
},
```

#### Sendgrid

```{.json}
"code": "sendgrid",
"settings": {
  "ClientKey": "xxxxxxxxx"
},
```

#### Mailgun

```{.json}
"code": "mailgun",
"settings": {
  "Domain": "KEY",
  "PrivateKey": "KEY",
  "PublicKey": "KEY"
},
```

#### Amazon SES

```{.json}
"code": "amazonses",
"settings": {
  "Endpoint": "Endpoint",
  "AccessKeyId": "Access-key",
  "SecretAccessKey": "KEY"
},
```
