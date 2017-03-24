---
date: 2017-03-24T16:00:33Z
title: Traffic per Token
menu:
  main:
    parent: "Analyse"
weight: 0 
---

You will often want to see what individual tokens are up to in Tyk, and you can do this with the Activity per Key section of your analytics Dashboard. This view will show a tabular layout of all tokens that Tyk has seen in the range period and provide analytics for them:

![Activity per Token][2]

You’ll notice in the screenshot above that the tokens look completely different to the ones you can generate in the key designer (or via the API), this is because, by default, Tyk will hash all tokens once they are created in order for them to not be snooped should your key-store be breached.

This poses a problem though, and that is that the keys also no longer have any meaning as analytics entries. You’ll notice in the screenshot above, one of the tokens is followed by parentheses and the words *tagged-key*, this is what is called an Alias, and you can add an alias to any token you generate and that information will be transposed into your analytics to make the information more human-readable.

The token `00000000` is an empty token, or an open-request. If you have an API that is open, or a request generates an error before we can identify the API token, then it will be automatically assigned this nil value.

If you select a token, you can get a drill down view of the activity of that token, and the errors and codes that the token has generated:

![Traffic activity by key graph][2]

(The filters in this view will not be of any use except to filter by API Version).

[1]: /img/dashboard/usage-data/activityPerToken.png
[2]: /img/dashboard/usage-data/tokenViewDetail.png