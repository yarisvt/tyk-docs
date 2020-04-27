---
date: 2017-03-27T12:28:24+01:00
title: Portal Documentation
menu:
  main:
    parent: "Tyk Portal API"
weight: 6
---
This section covers both [Documentation](#documentation) and [Catalogue](#catalogue) endpoints.

## Documentation

### Create Documentation

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/documentation` |
| Method       | POST                     |
| Type         | None                     |
| Body         | Documentation Object     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/documentation HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "api_id": "",
  "doc_type": "swagger",
  "documentation": "ewogICJzd2FnZ2VyIjogIjIuMCIsCiAgImluZm8iOiB7CiAgICAidGl0bGUiOiAiQW5vdGhlciBEZW1vIEFQSSIsCiAgICAiZGVzY3JpcHRpb24iOiAiQVBJIE1hbmFnZW1lbnQgZmFjYWRlIGZvciBhIHZlcnkgaGFuZHkgYW5kIGZyZWUgb25saW5lIEhUVFAgdG9vbC4iLAogICAgInZlcnNpb24iOiAidjEiCiAgfSwKICAiaG9zdCI6ICJ3d3cudHlrLXRlc3QuY29tOjgwODAiLAogICJiYXNlUGF0aCI6ICIvYW5vdGhlcmRlbW9hcGkiLAogICJzY2hlbWVzIjogWwogICAgImh0dHAiCiAgXSwKICAicGF0aHMiOiB7CiAgICAiL3N0YXR1cy97Y29kZX0iOiB7CiAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAiJHJlZiI6ICIjL3BhcmFtZXRlcnMvYXBpdmVyc2lvbiIKICAgICAgfV0sCiAgICAgICJnZXQiOiB7CiAgICAgICAgImRlc2NyaXB0aW9uIjogIlJldHVybnMgcHJvdmlkZWQgSFRUUCBTdGF0dXMgY29kZS4iLAogICAgICAgICJvcGVyYXRpb25JZCI6ICIvc3RhdHVzIiwKICAgICAgICAicGFyYW1ldGVycyI6IFt7CiAgICAgICAgICAibmFtZSI6ICJjb2RlIiwKICAgICAgICAgICJpbiI6ICJwYXRoIiwKICAgICAgICAgICJkZXNjcmlwdGlvbiI6ICJIVFRQIGNvZGUgdG8gcmV0dXJuLiIsCiAgICAgICAgICAicmVxdWlyZWQiOiB0cnVlLAogICAgICAgICAgInR5cGUiOiAibnVtYmVyIiwKICAgICAgICAgICJkZWZhdWx0IjogMjAwLAogICAgICAgICAgImVudW0iOiBbCiAgICAgICAgICAgIDIwMAogICAgICAgICAgXQogICAgICAgIH1dLAogICAgICAgICJyZXNwb25zZXMiOiB7fSwKICAgICAgICAic2VjdXJpdHkiOiBbewogICAgICAgICAgImFwaV9rZXkiOiBbXQogICAgICAgIH1dCiAgICAgIH0KICAgIH0sCiAgICAiL2dldCI6IHsKICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICIkcmVmIjogIiMvcGFyYW1ldGVycy9hcGl2ZXJzaW9uIgogICAgICB9XSwKICAgICAgImdldCI6IHsKICAgICAgICAiZGVzY3JpcHRpb24iOiAiUmV0dXJucyBHRVQgZGF0YS4iLAogICAgICAgICJvcGVyYXRpb25JZCI6ICIvZ2V0IiwKICAgICAgICAicmVzcG9uc2VzIjoge30sCiAgICAgICAgInNlY3VyaXR5IjogW3sKICAgICAgICAgICJhcGlfa2V5IjogW10KICAgICAgICB9XQogICAgICB9CiAgICB9LAogICAgIi9wb3N0IjogewogICAgICAicGFyYW1ldGVycyI6IFt7CiAgICAgICAgIiRyZWYiOiAiIy9wYXJhbWV0ZXJzL2FwaXZlcnNpb24iCiAgICAgIH1dLAogICAgICAicG9zdCI6IHsKICAgICAgICAiZGVzY3JpcHRpb24iOiAiUmV0dXJucyBQT1NUIGRhdGEuIiwKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL3Bvc3QiLAogICAgICAgICJyZXNwb25zZXMiOiB7fSwKICAgICAgICAic2VjdXJpdHkiOiBbewogICAgICAgICAgImFwaV9rZXkiOiBbXQogICAgICAgIH1dCiAgICAgIH0KICAgIH0sCiAgICAiL3BhdGNoIjogewogICAgICAicGFyYW1ldGVycyI6IFt7CiAgICAgICAgIiRyZWYiOiAiIy9wYXJhbWV0ZXJzL2FwaXZlcnNpb24iCiAgICAgIH1dLAogICAgICAicGF0Y2giOiB7CiAgICAgICAgImRlc2NyaXB0aW9uIjogIlJldHVybnMgUEFUQ0ggZGF0YS4iLAogICAgICAgICJvcGVyYXRpb25JZCI6ICIvcGF0Y2giLAogICAgICAgICJyZXNwb25zZXMiOiB7fSwKICAgICAgICAic2VjdXJpdHkiOiBbewogICAgICAgICAgImFwaV9rZXkiOiBbXQogICAgICAgIH1dCiAgICAgIH0KICAgIH0sCiAgICAiL3B1dCI6IHsKICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICIkcmVmIjogIiMvcGFyYW1ldGVycy9hcGl2ZXJzaW9uIgogICAgICB9XSwKICAgICAgInB1dCI6IHsKICAgICAgICAiZGVzY3JpcHRpb24iOiAiUmV0dXJucyBQVVQgZGF0YS4iLAogICAgICAgICJvcGVyYXRpb25JZCI6ICIvcHV0IiwKICAgICAgICAicmVzcG9uc2VzIjoge30sCiAgICAgICAgInNlY3VyaXR5IjogW3sKICAgICAgICAgICJhcGlfa2V5IjogW10KICAgICAgICB9XQogICAgICB9CiAgICB9LAogICAgIi9kZWxldGUiOiB7CiAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAiJHJlZiI6ICIjL3BhcmFtZXRlcnMvYXBpdmVyc2lvbiIKICAgICAgfV0sCiAgICAgICJkZWxldGUiOiB7CiAgICAgICAgImRlc2NyaXB0aW9uIjogIlJldHVybnMgREVMRVRFIGRhdGEuIiwKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL2RlbGV0ZSIsCiAgICAgICAgInJlc3BvbnNlcyI6IHt9LAogICAgICAgICJzZWN1cml0eSI6IFt7CiAgICAgICAgICAiYXBpX2tleSI6IFtdCiAgICAgICAgfV0KICAgICAgfQogICAgfSwKICAgICIveG1sIjogewogICAgICAicGFyYW1ldGVycyI6IFt7CiAgICAgICAgIiRyZWYiOiAiIy9wYXJhbWV0ZXJzL2FwaXZlcnNpb24iCiAgICAgIH1dLAogICAgICAiZ2V0IjogewogICAgICAgICJkZXNjcmlwdGlvbiI6ICJSZXR1cm5zIHNvbWUgWE1MLiIsCiAgICAgICAgIm9wZXJhdGlvbklkIjogIi94bWwiLAogICAgICAgICJyZXNwb25zZXMiOiB7fSwKICAgICAgICAic2VjdXJpdHkiOiBbewogICAgICAgICAgImFwaV9rZXkiOiBbXQogICAgICAgIH1dCiAgICAgIH0KICAgIH0sCiAgICAiL2lwIjogewogICAgICAicGFyYW1ldGVycyI6IFt7CiAgICAgICAgIiRyZWYiOiAiIy9wYXJhbWV0ZXJzL2FwaXZlcnNpb24iCiAgICAgIH1dLAogICAgICAiZ2V0IjogewogICAgICAgICJkZXNjcmlwdGlvbiI6ICJSZXR1cm5zIG9yaWdpbiBJUC4iLAogICAgICAgICJvcGVyYXRpb25JZCI6ICIvaXAiLAogICAgICAgICJyZXNwb25zZXMiOiB7fSwKICAgICAgICAic2VjdXJpdHkiOiBbewogICAgICAgICAgImFwaV9rZXkiOiBbXQogICAgICAgIH1dCiAgICAgIH0KICAgIH0sCiAgICAiL3VzZXItYWdlbnQiOiB7CiAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAiJHJlZiI6ICIjL3BhcmFtZXRlcnMvYXBpdmVyc2lvbiIKICAgICAgfV0sCiAgICAgICJnZXQiOiB7CiAgICAgICAgImRlc2NyaXB0aW9uIjogIlJldHVybnMgdXNlciBhZ2VudCBzdHJpbmcuIiwKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL3VzZXItYWdlbnQiLAogICAgICAgICJyZXNwb25zZXMiOiB7fSwKICAgICAgICAic2VjdXJpdHkiOiBbewogICAgICAgICAgImFwaV9rZXkiOiBbXQogICAgICAgIH1dCiAgICAgIH0KICAgIH0sCiAgICAiL2hlYWRlcnMiOiB7CiAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAiJHJlZiI6ICIjL3BhcmFtZXRlcnMvYXBpdmVyc2lvbiIKICAgICAgfV0sCiAgICAgICJnZXQiOiB7CiAgICAgICAgImRlc2NyaXB0aW9uIjogIlJldHVybnMgaGVhZGVycyBkaWN0aW9uYXJ5LiIsCiAgICAgICAgIm9wZXJhdGlvbklkIjogIi9oZWFkZXJzIiwKICAgICAgICAicmVzcG9uc2VzIjoge30sCiAgICAgICAgInNlY3VyaXR5IjogW3sKICAgICAgICAgICJhcGlfa2V5IjogW10KICAgICAgICB9XQogICAgICB9CiAgICB9LAogICAgIi9kZWxheS97c2Vjb25kc30iOiB7CiAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAiJHJlZiI6ICIjL3BhcmFtZXRlcnMvYXBpdmVyc2lvbiIKICAgICAgfV0sCiAgICAgICJnZXQiOiB7CiAgICAgICAgImRlc2NyaXB0aW9uIjogIkRlbGF5cyByZXNwb25kaW5nIGZvciBu4oCTMTAgc2Vjb25kcy4iLAogICAgICAgICJvcGVyYXRpb25JZCI6ICIvZGVsYXkiLAogICAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAgICJuYW1lIjogInNlY29uZHMiLAogICAgICAgICAgImluIjogInBhdGgiLAogICAgICAgICAgImRlc2NyaXB0aW9uIjogIiIsCiAgICAgICAgICAicmVxdWlyZWQiOiB0cnVlLAogICAgICAgICAgInR5cGUiOiAic3RyaW5nIiwKICAgICAgICAgICJkZWZhdWx0IjogMiwKICAgICAgICAgICJlbnVtIjogWwogICAgICAgICAgICAyCiAgICAgICAgICBdCiAgICAgICAgfV0sCiAgICAgICAgInJlc3BvbnNlcyI6IHt9LAogICAgICAgICJzZWN1cml0eSI6IFt7CiAgICAgICAgICAiYXBpX2tleSI6IFtdCiAgICAgICAgfV0KICAgICAgfQogICAgfSwKICAgICIvY2FjaGUve21heEFnZX0iOiB7CiAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAiJHJlZiI6ICIjL3BhcmFtZXRlcnMvYXBpdmVyc2lvbiIKICAgICAgfV0sCiAgICAgICJnZXQiOiB7CiAgICAgICAgIm9wZXJhdGlvbklkIjogIi9jYWNoZSIsCiAgICAgICAgImRlc2NyaXB0aW9uIjogIlNldHMgYSBDYWNoZS1Db250cm9sIGhlYWRlciBmb3IgbiBzZWNvbmRzLiIsCiAgICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICAgIm5hbWUiOiAibWF4QWdlIiwKICAgICAgICAgICJpbiI6ICJwYXRoIiwKICAgICAgICAgICJkZXNjcmlwdGlvbiI6ICIiLAogICAgICAgICAgInJlcXVpcmVkIjogdHJ1ZSwKICAgICAgICAgICJ0eXBlIjogInN0cmluZyIsCiAgICAgICAgICAiZGVmYXVsdCI6IDEwLAogICAgICAgICAgImVudW0iOiBbCiAgICAgICAgICAgIDEwCiAgICAgICAgICBdCiAgICAgICAgfV0sCiAgICAgICAgInJlc3BvbnNlcyI6IHt9LAogICAgICAgICJzZWN1cml0eSI6IFt7CiAgICAgICAgICAiYXBpX2tleSI6IFtdCiAgICAgICAgfV0KICAgICAgfQogICAgfSwKICAgICIvdXVpZCI6IHsKICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICIkcmVmIjogIiMvcGFyYW1ldGVycy9hcGl2ZXJzaW9uIgogICAgICB9XSwKICAgICAgImdldCI6IHsKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL3V1aWQiLAogICAgICAgICJkZXNjcmlwdGlvbiI6ICJSZXR1cm5zIFVVSUQ0LiIsCiAgICAgICAgInJlc3BvbnNlcyI6IHt9LAogICAgICAgICJzZWN1cml0eSI6IFt7CiAgICAgICAgICAiYXBpX2tleSI6IFtdCiAgICAgICAgfV0KICAgICAgfQogICAgfSwKICAgICIvYW55dGhpbmciOiB7CiAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAiJHJlZiI6ICIjL3BhcmFtZXRlcnMvYXBpdmVyc2lvbiIKICAgICAgfV0sCiAgICAgICJnZXQiOiB7CiAgICAgICAgIm9wZXJhdGlvbklkIjogIi9hbnl0aGluZyIsCiAgICAgICAgImRlc2NyaXB0aW9uIjogIlJldHVybnMgcmVxdWVzdCBkYXRhLCBpbmNsdWRpbmcgbWV0aG9kIHVzZWQuIiwKICAgICAgICAicmVzcG9uc2VzIjoge30sCiAgICAgICAgInNlY3VyaXR5IjogW3sKICAgICAgICAgICJhcGlfa2V5IjogW10KICAgICAgICB9XQogICAgICB9CiAgICB9LAogICAgIi9nemlwIjogewogICAgICAicGFyYW1ldGVycyI6IFt7CiAgICAgICAgIiRyZWYiOiAiIy9wYXJhbWV0ZXJzL2FwaXZlcnNpb24iCiAgICAgIH1dLAogICAgICAiZ2V0IjogewogICAgICAgICJvcGVyYXRpb25JZCI6ICIvZ3ppcCIsCiAgICAgICAgImRlc2NyaXB0aW9uIjogIlJldHVybnMgZ3ppcC1lbmNvZGVkIGRhdGEuIiwKICAgICAgICAicmVzcG9uc2VzIjoge30sCiAgICAgICAgInNlY3VyaXR5IjogW3sKICAgICAgICAgICJhcGlfa2V5IjogW10KICAgICAgICB9XQogICAgICB9CiAgICB9LAogICAgIi9iYXNlNjQve3ZhbHVlfSI6IHsKICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICIkcmVmIjogIiMvcGFyYW1ldGVycy9hcGl2ZXJzaW9uIgogICAgICB9XSwKICAgICAgImdldCI6IHsKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL2Jhc2U2NCIsCiAgICAgICAgImRlc2NyaXB0aW9uIjogIkRlY29kZXMgYmFzZTY0dXJsLWVuY29kZWQgc3RyaW5nLiIsCiAgICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICAgIm5hbWUiOiAidmFsdWUiLAogICAgICAgICAgImluIjogInBhdGgiLAogICAgICAgICAgImRlc2NyaXB0aW9uIjogIkJhc2U2NCBlbmNvZGVkIHN0cmluZy4iLAogICAgICAgICAgInJlcXVpcmVkIjogdHJ1ZSwKICAgICAgICAgICJ0eXBlIjogInN0cmluZyIsCiAgICAgICAgICAiZGVmYXVsdCI6ICJhR1ZzYkc4Z2QyOXliR1FOQ2clM0QlM0QiCiAgICAgICAgfV0sCiAgICAgICAgInJlc3BvbnNlcyI6IHt9LAogICAgICAgICJzZWN1cml0eSI6IFt7CiAgICAgICAgICAiYXBpX2tleSI6IFtdCiAgICAgICAgfV0KICAgICAgfQogICAgfSwKICAgICIvZGVmbGF0ZSI6IHsKICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICIkcmVmIjogIiMvcGFyYW1ldGVycy9hcGl2ZXJzaW9uIgogICAgICB9XSwKICAgICAgImdldCI6IHsKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL2RlZmxhdGUiLAogICAgICAgICJkZXNjcmlwdGlvbiI6ICJSZXR1cm5zIGRlZmxhdGUtZW5jb2RlZCBkYXRhLiIsCiAgICAgICAgInJlc3BvbnNlcyI6IHt9LAogICAgICAgICJzZWN1cml0eSI6IFt7CiAgICAgICAgICAiYXBpX2tleSI6IFtdCiAgICAgICAgfV0KICAgICAgfQogICAgfSwKICAgICIvYnJvdGxpIjogewogICAgICAicGFyYW1ldGVycyI6IFt7CiAgICAgICAgIiRyZWYiOiAiIy9wYXJhbWV0ZXJzL2FwaXZlcnNpb24iCiAgICAgIH1dLAogICAgICAiZ2V0IjogewogICAgICAgICJvcGVyYXRpb25JZCI6ICIvYnJvdGxpIiwKICAgICAgICAiZGVzY3JpcHRpb24iOiAiUmV0dXJucyBicm90bGktZW5jb2RlZCBkYXRhLiIsCiAgICAgICAgInJlc3BvbnNlcyI6IHt9LAogICAgICAgICJzZWN1cml0eSI6IFt7CiAgICAgICAgICAiYXBpX2tleSI6IFtdCiAgICAgICAgfV0KICAgICAgfQogICAgfSwKICAgICIvcmVzcG9uc2UtaGVhZGVycyI6IHsKICAgICAgImdldCI6IHsKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL3Jlc3BvbnNlLWhlYWRlcnMiLAogICAgICAgICJkZXNjcmlwdGlvbiI6ICJSZXR1cm5zIGtleS12YWx1ZSBxdWVyeSBwYXJhbWV0ZXJzIGFzIHJlc3BvbnNlIGhlYWRlcnMuIiwKICAgICAgICAicmVzcG9uc2VzIjoge30sCiAgICAgICAgInNlY3VyaXR5IjogW3sKICAgICAgICAgICJhcGlfa2V5IjogW10KICAgICAgICB9XQogICAgICB9CiAgICB9LAogICAgIi9ieXRlcy97bnVtYmVyfSI6IHsKICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICIkcmVmIjogIiMvcGFyYW1ldGVycy9hcGl2ZXJzaW9uIgogICAgICB9XSwKICAgICAgImdldCI6IHsKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL2J5dGVzIiwKICAgICAgICAiZGVzY3JpcHRpb24iOiAiR2VuZXJhdGVzIG4gcmFuZG9tIGJ5dGVzIG9mIGJpbmFyeSBkYXRhIiwKICAgICAgICAicGFyYW1ldGVycyI6IFt7CiAgICAgICAgICAibmFtZSI6ICJudW1iZXIiLAogICAgICAgICAgImluIjogInBhdGgiLAogICAgICAgICAgImRlc2NyaXB0aW9uIjogIk51bWJlciBvZiBieXRlcyB0byByZXR1cm4uIiwKICAgICAgICAgICJyZXF1aXJlZCI6IHRydWUsCiAgICAgICAgICAidHlwZSI6ICJzdHJpbmciLAogICAgICAgICAgImRlZmF1bHQiOiAiMTAyNCIKICAgICAgICB9XSwKICAgICAgICAicmVzcG9uc2VzIjoge30sCiAgICAgICAgInNlY3VyaXR5IjogW3sKICAgICAgICAgICJhcGlfa2V5IjogW10KICAgICAgICB9XQogICAgICB9CiAgICB9LAogICAgIi9yZWRpcmVjdC10byI6IHsKICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICIkcmVmIjogIiMvcGFyYW1ldGVycy9hcGl2ZXJzaW9uIgogICAgICB9XSwKICAgICAgImdldCI6IHsKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL3JlZGlyZWN0LXRvIiwKICAgICAgICAiZGVzY3JpcHRpb24iOiAiMzAyIHJlZGlyZWN0cyB0byBhIFVSTCBwcm92aWRlZCBpbiBxdWVyeSIsCiAgICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICAgIm5hbWUiOiAidXJsIiwKICAgICAgICAgICJpbiI6ICJxdWVyeSIsCiAgICAgICAgICAiZGVzY3JpcHRpb24iOiAiUmVkaXJlY3QgdGFyZ2V0IiwKICAgICAgICAgICJyZXF1aXJlZCI6IHRydWUsCiAgICAgICAgICAidHlwZSI6ICJzdHJpbmciLAogICAgICAgICAgImRlZmF1bHQiOiAiaHR0cDovL2V4YW1wbGUuY29tIgogICAgICAgIH1dLAogICAgICAgICJyZXNwb25zZXMiOiB7fSwKICAgICAgICAic2VjdXJpdHkiOiBbewogICAgICAgICAgImFwaV9rZXkiOiBbXQogICAgICAgIH1dCiAgICAgIH0KICAgIH0sCiAgICAiL3N0cmVhbS97bnVtYmVyfSI6IHsKICAgICAgInBhcmFtZXRlcnMiOiBbewogICAgICAgICIkcmVmIjogIiMvcGFyYW1ldGVycy9hcGl2ZXJzaW9uIgogICAgICB9XSwKICAgICAgImdldCI6IHsKICAgICAgICAib3BlcmF0aW9uSWQiOiAiL3N0cmVhbSIsCiAgICAgICAgImRlc2NyaXB0aW9uIjogIlN0cmVhbXMgbWluKG51bWJlciwgMTAwKSBsaW5lcy4iLAogICAgICAgICJwYXJhbWV0ZXJzIjogW3sKICAgICAgICAgICJuYW1lIjogIm51bWJlciIsCiAgICAgICAgICAiaW4iOiAicGF0aCIsCiAgICAgICAgICAiZGVzY3JpcHRpb24iOiAiTnVtYmVyIG9mIGxpbmVzIHRvIHN0cmVhbS4iLAogICAgICAgICAgInJlcXVpcmVkIjogdHJ1ZSwKICAgICAgICAgICJ0eXBlIjogIm51bWJlciIsCiAgICAgICAgICAiZGVmYXVsdCI6ICIxMCIKICAgICAgICB9XSwKICAgICAgICAicmVzcG9uc2VzIjoge30sCiAgICAgICAgInNlY3VyaXR5IjogW3sKICAgICAgICAgICJhcGlfa2V5IjogW10KICAgICAgICB9XQogICAgICB9CiAgICB9CiAgfSwKICAic2VjdXJpdHlEZWZpbml0aW9ucyI6IHsKICAgICJhcGlfa2V5IjogewogICAgICAidHlwZSI6ICJhcGlLZXkiLAogICAgICAiaW4iOiAiaGVhZGVyIiwKICAgICAgIm5hbWUiOiAiQXV0aG9yaXphdGlvbiIKICAgIH0KICB9LAogICJwYXJhbWV0ZXJzIjogewogICAgImFwaXZlcnNpb24iOiB7CiAgICAgICJpbiI6ICJoZWFkZXIiLAogICAgICAibmFtZSI6ICJ4LWFwaS12ZXJzaW9uIiwKICAgICAgInR5cGUiOiAic3RyaW5nIgogICAgfQogIH0KfQo="
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "5ea6b2bd971eed0001009ddc",
  "Meta": null
}
```

### Delete Documentation

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/documentation/{id}` |
| Method       | DELETE                   |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
DELETE/api/portal/documentation HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "Data deleted",
  "Meta": null
}
```

## Catalogue

### List Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | GET                    |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/catalogue HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id":"5cc03284d07e7f00019404b4",
  "org_id":"5cc03283d07e7f00019404b3",
  "apis":[
    {
      "name":"Portal OAuth API",
      "short_description":"",
      "long_description":"",
      "show":true,
      "api_id":"",
      "policy_id":"5ce4086ce845260001c1e1f5",
      "documentation":"",
      "version":"v2",
      "is_keyless":false,
      "config":{
        "id":"",
        "org_id":"",
        "signup_fields":[

        ],
        "key_request_fields":[

        ],
        "require_key_approval":false,
        "redirect_on_key_request":false,
        "redirect_to":"",
        "enable_multi_selection":false,
        "disable_login":false,
        "disable_signup":false,
        "disable_auto_login":false,
        "catalogue_login_only":false,
        "oauth_usage_limit":-1,
        "email":"",
        "mail_options":{
          "mail_from_name":"",
          "mail_from_email":"",
          "email_copy":{
            "welcome_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "key_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "reset_password_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            }
          }
        },
        "override":false,
        "HashKeys":false
      },
      "fields":{

      },
      "auth_type":"oauth"
    },
    {
      "name":"Test API",
      "short_description":"",
      "long_description":"",
      "show":true,
      "api_id":"",
      "policy_id":"5ce51721e845260001d0a550",
      "documentation":"5cf0d65d0313b300010b89ab",
      "version":"v2",
      "is_keyless":false,
      "config":{
        "id":"",
        "org_id":"",
        "signup_fields":[

        ],
        "key_request_fields":[

        ],
        "require_key_approval":false,
        "redirect_on_key_request":false,
        "redirect_to":"",
        "enable_multi_selection":false,
        "disable_login":false,
        "disable_signup":false,
        "disable_auto_login":false,
        "catalogue_login_only":false,
        "oauth_usage_limit":-1,
        "email":"",
        "mail_options":{
          "mail_from_name":"",
          "mail_from_email":"",
          "email_copy":{
            "welcome_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "key_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "reset_password_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            }
          }
        },
        "override":false,
        "HashKeys":false
      },
      "fields":{

      },
      "auth_type":"authToken"
    }
  ],
  "email":""
}
```

### Create Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | POST                   |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/catalogue HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Update Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | PUT                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/catalogue HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```
