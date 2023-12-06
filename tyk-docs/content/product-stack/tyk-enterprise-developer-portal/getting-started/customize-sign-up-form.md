---
title: "Customize the sign-up form"
date: 2023-11-30
tags: ["Tyk Developer Portal","Enterprise Portal","Sign-up","User attributes","Metadata"]
description: "Customize the sign-up form and extend the data stored in the User profile"
menu:
    main:
        parent: "Get Started"
weight: 3
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

In this section, you will learn how to customize the sign-up form for your API Consumers and extend the data stored in the user profile.
To achieve that, you will need to:
- Add a new attribute to the User profile and make it available in the sign-up form.
- Optionally, add description to it and set other parameters that suit your needs.

## Navigate to the Custom Attributes menu

To customize the sign-up form, you need to add new data attributes to the User model so that when a user profile is being created, those attributes will be recorded against the user profile.
To start customizing the user sign-up form, navigate to the **Custom attributes** menu and the select the **User** model. Currently, it is possible to extend only the User model, in future releases we will add the same capabilities to other models.
{{< img src="img/dashboard/portal-management/enterprise-portal/navigate-to-user-attributes.png" alt="Navigate to the User's attributes" >}}

## Add a new attribute to the User model
To add a new attribute to the User model, click on the **Add Custom attribute** button and then fill in properties of the new attribute:
- **Attribute ID**: a string that consists of letters (a-zA-Z), numbers (0-9), dashes, and underscores and is used to refer to this attribute in [the Admin APIs]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}).
- **Attribute Label**: the attribute's name that is displayed in the UI.
- **Description**: a rich text that is used to describe this attribute. It is also displayed in the UI.
- **Type of attribute**: type of data that can be stored in this attribute. You cannot change value of this field once the attribute is created. The following data types are acceptable:
  - Boolean (true or false).
  - Dropdown (a list of value).
  - String.
  - Number.
- **Validation Reg Exp**: a regular expression that is used to validate the value of this field. It is available for the **String** data type only.
- **Enable validation**: defines if the portal should apply the regular expression defined in the **Validation Reg Exp** to validate value of this attribute when creating or updating a user profile. It is available for the **String** data type only.
- **Dropdown Values**: a list of values for the attribute. It is available for the **Dropdown** data type only.
- Fields that define the attribute's behavior:
  - Write once read many: defines if the value of the attribute can be changed after a user profile is created.
  - Add to the key metadata: defines if the value of the attribute should be added to the metadata of Auth keys or OAuth2.0 clients when a user creates them.
  - Required: defines if this attribute is required to create a user profile.
  - Show on sign-up form: defines if this attribute should be visible in the sing-up form.
- **Behavior**: defines if developers can view or edit this attribute. Possible values are:
  - Developers can view and edit the attribute.
  - Developers can only view the attribute.
  - Developers cannot see the attribute.

For purpose of this guide, make sure to tick the **Required** and **Show on sign-up form** checkboxes and select the **Developers can only view the attribute** behavior.
{{< img src="img/dashboard/portal-management/enterprise-portal/add-new-attribute-to-user-model.png" alt="Add a new attribute to the User model" >}}

Once you have created a new custom attribute and saved changes to the User model by clicking on th **Save** button, the new attribute is added to the user sign-up form.
{{< img src="img/dashboard/portal-management/enterprise-portal/custom-attribute-in-the-sign-up-form.png" alt="Customized user sign-up form" >}}

{{< note success >}}
**Congratulations**

You have now added a custom attribute to the User model and made it appear in the user sign-up form. By following the above steps you can add more attributes of different types.
{{< /note >}}

## Next step

Visit [Setup email notifications]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/setup-email-notifications" >}}) to learn how to setup email notifications guide, which completes this tutorial.