---
date: 2017-03-24T17:42:45Z
title: Portal events and notifications
menu:
  main:
    parent: "Tyk Developer Portal"
weight: 4 
---

Tyk enables you to actively monitor both user and organisation quotas. These active notifications are managed in the same way as webhooks and provides an easy way to notify your stakeholders, your own organisation or the API end user when certain thresholds have been reached for their token.

### Tyk Cloud Users

Monitors are disabled by default in Tyk Cloud. Portal events are enabled and can be defined by raising a support ticket.

### Enable Monitors in your `tyk.conf`

Enabling monitors in your Tyk node means adding a new configuration section to your `tyk.conf`:

```{.copyWrapper}
"monitor": {
  "enable_trigger_monitors": true,
  "configuration": {
    "method": "POST",
    "target_path": "http://posttestserver.com/post.php?dir=tyk-monitor-drop",
    "template_path": "templates/monitor_template.json",
    "header_map": {"x-tyk-monitor-secret": "12345"},
    "event_timeout": 10
  },
  "global_trigger_limit": 80.0,
  "monitor_user_keys": false,
  "monitor_org_keys": true
}
```

*   `enable_trigger_monitors`: Set to `true` to have the monitors start to measure quota thresholds.

*   `configuration`: A webhook configuration object. See the [Webhooks documentation](/docs/basic-config-and-security/report-monitor-trigger-events/webhooks/) for details.

*   `global_trigger_limit`: This is the global trigger threshold and will be applied to all keys being monitored. This value is the percentage of the quota that the user must reach before the notification is triggered.

> NOTE: From Dashboard v1.8.2, if you are using our Developer Portal, registered developers will also receive emails about quota threshold limits being reached.

*   `monitor_user_keys`: Set to `true` to monitor individual tokens, this may result in a large amount of webhooks.

*   `monitor_org_keys`: Set to `true` to have global organisation quotas monitored.

#### Setting Custom Triggers on a Per Key or a Per-Organisation Basis

Sometimes you will not want to have every user have a trigger event at the same levels. You can set manual trigger levels by adding a `monitor` section to the Session Object that defines a key's access details. This can also be added to the session object of an organisation ID:

```{.copyWrapper}
"monitor": {
  "trigger_limits": [80.0, 60.0, 50.0]
}
```

The trigger limits should be in *descending* order and represent the percentage of the quota that must be reached in order for the trigger to be fired.

### Webhook Data

The webhook payload will take the following format:

```{.copyWrapper}
{
  "event": "TriggerExceeded",
  "message": "Quota trigger reached",
  "org": "53ac07777cbb8c2d53000002",
  "key": "",
  "trigger_limit": "80",
} 
```

If the event is triggered by an organisation, then the key field will be empty. If it is an auth token, then the `key` field will have raw representation of the token that caused the quota trigger to fire.

### Portal Events

The Tyk Dashboard and the Portal now support email notifications powered by Mandrill, Sendgrid, Mailgun and Amazon SES.

#### How Email Notifications Work

If you have enabled email notifications, the Portal will attempt to send notifications regarding a user's sign-up status or key request status to their username email address. These templates can be found in the `portal/email_templates` folder.

The templates are available as text based or HTML. See the standard included ones to see the various template fields that can be customised.

### Extra Dashboard And Portal Events

The Dashboard and Portal also support a certain level of events that you can use to notify your system of various things that have happened in the Portal.

To configure them, add an `event_options` section to an Organisation when you are creating them. See [Creating an Organisation via the Dashboard Admin API](/docs/dashboard-admin-api/organisations/#create-an-organisation) for more details.

Within this object, you can then register webhooks or/and an email address to notify when an event occurs:

```{.copyWrapper}
event_options: {
  api_event: {
    webhook: "http://posttestserver.com/post.php?dir=tyk-events",
    email: "test@test.com"
  },
  key_event: {
    webhook: "http://posttestserver.com/post.php?dir=tyk-key-events",
    email: "test@test.com"
  },
  key_request_event: {
    webhook: "http://posttestserver.com/post.php?dir=tyk-key-events",
    email: "test@test.com"
  }
}
```

The following events are supported:

*   `api_event`: When an API is created, updated or deleted.

*   `key_event`: When a key is created, updated or deleted.

*   `key_request_event`: When a Portal key request is created or updated.

Sample **Webhook** Payload for a **Key Request** Event:
```{.json}
{
    "event": "key_request_event.submitted",
    "data": {
        "id": "5e543dd0f56e1a4affdd7acd",
        "org_id": "5e2743567c1f8800018bdf35",
        "for_plan": "5e2744897c1f8800018bdf3b",
        "apply_policies": [
            "5e2744897c1f8800018bdf3b"
        ],
        "by_user": "5e430ef68131890001b83d2e",
        "approved": false,
        "date_created": "2020-02-24T16:19:12.175113-05:00",
        "portal_developer": {
            "id": "5e430ef68131890001b83d2e",
            "email": "dev@dev.ca",
            "date_created": "2020-02-11T15:30:46.003-05:00",
            "inactive": false,
            "org_id": "5e2743567c1f8800018bdf35",
            "keys": {
                "6dc2dfc0": [
                    "5e431f938131890001b83d30"
                ]
            },
            "subscriptions": {
                "5e431f938131890001b83d30": "6dc2dfc0"
            },
            "last_login_date": "2020-02-11T16:43:39.858-05:00"
        },
        "catalogue_entry": {
            "name":"frontend APIs",
            "short_description":"",
            "long_description":"",
            "show":true,
            "api_id":"",
            "policy_id":"5e2744897c1f8800018bdf3b",
            "documentation":"5e3b477a7c1f8800013603c6",
            "version":"v2",
            "is_keyless":false,
            "config":{
                
            }
        }
    }
}
```