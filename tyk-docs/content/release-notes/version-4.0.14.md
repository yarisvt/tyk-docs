# Release 4.0.14

## Release Features

< summary paragraph here>

## Changelog

### Tyk Dashboard

#### Fixed

- Fixed A Bug Where The Tyk Dashboard Could Show A Blank Screen When Clicking On Policies On The Policy Management Screen

- Fixed A Bug Where Custom Authentication Could Not Be Selected To Provide The Base Identity When Multi-Auth Selected

- Fixed A Bug Where An Api Could Be Incorrectly Labelled As Using Multi-Auth In The Tyk Developer Portal Catalogue View.

- Fix A Ui Bug In The Api Designer When Adding All Api Versions To A Policy

- Fixed A Bug Where The Tyk Dashboard Did Not Display Key Alias On The Analytics Screens When Using Sql For The Analytics Data Store.

- Fixed A Bug Where It Was Not Possible To Download Activity By Api Or Activity By Key From The Dashboard When Using Postgresql For The Analytics Store.

- Improved Dashboard Analytics Experience To Respect Api Ownership (Including Versions) For Log Browser And Some Charts

- Fixed A Bug Where A New User Could Be Stuck In A Password Reset Loop In The Dashboard If `Tyk_Db_Security_Forcefirstloginpwreset` Was Enabled.

- The "Gateway Dashboard" Page Showing Api Analytics Is Now Hidden If The Logged In User Doesn'T Have Analytics Rights.

- Fixed: Redirect Unregistered User To New Page When Ssoonlyforregisteredusers Is Set To True

- Fixed A Bug Where The Tyk Dashboard Could Show A Blank Screen When Policies With Custom Policy Ids Were Added To An Api Key

- Fixed A Bug Where Tyk Dashboard Did Not Properly Display The List Of Organisations

- Fixed A Bug When Migrating A Portal Catalogue With Deleted Policy From Mongodb To Sql.

- Fixed A Bug Where The Head Option Was Not Available In The Allowed Methods Dropdown In The Cors Section Of The Api Designer

- Fix: When Ssoonlyforregisteredusers=True, Also Checks If User Belongs To The Organization

- Fixed Storing The Ssl_Force_Common_Name_Check Field In The Api Definition, If This Was Set Via Raw Api Editor Or By Updating The Api Definition Via The Gw/Db Api.

- Fixed A Bug Where Api Ownership Was Not Respected In The _Api Activity Dashboard Requests_ And _Average Errors Over Time_ Charts In The Tyk Dashboard; Note That It Is Not Currently Possible To Respect Api Ownership In Other Aggregated Charts

- Fixed A Bug Where A User Could Update Their Email Address To Match That Of Another User Within The Same Organisation..

- Fixed A Bug Where Users Without `User:Write` Permission Were Able To Update Their Permissions Through Manipulation Of Dashboard Api Calls.

- Fixed A Bug That Prevented Manual Allocation Of `Api_Id` During Api Creation.

- Fixed A Bug Where The Versions Endpoint Returned Apis Not Owned By The Logged-In User.

- Fixed A Bug Where The Log Browser Showed Analytics For Apis Not Owned By The Logged-In User.

- Fixed A Bug Where Security Headers Were Not Present When Classic Portal Is Configured With A Custom Domain.

- Fixed A Bug That Prevented Non-Admin Users From Seeing _Endpoint Popularity_ Data In The Tyk Dashboard

- Fixed A Bug Where Additional Data Was Returned When Requesting Analytics With P=-1 Query When Using Sql For The Analytics Store.

- Fixed A Bug Where The Dashboard Granted Visibility Of Unfiltered Analytics When Api Ownership Is Enabled. New User Permission (`Owned_Analytics`) Restricts Visibility Only To Analytics For The Owned Apis: Api Usage, Api Errors And Request Logs.

- Fixed A Bug Where The Dashboard Api Granted Unfiltered Access To Analytics Endpoints With Api Ownership Enabled.

- Fixed A Bug Where The Tyk Dashboard Did Not Display The Correct Analytics When Filtering By ‘Tag’ And Using Sql For The Analytics Data Store.

- Fixed A Bug In The Dashboard Analytics Where The Zoom Would Immediately Reset To Default


### Tyk Gateway

#### Fixed

- Fixed A Bug Where Tyk Could Return Http 500 Internal Server Error When Load Balancing At Very High Api Traffic Levels

- Fixed A Bug Where Invalid Ip Addresses Could Be Added To The Ip Allow List

- Fixed A Bug Where Custom Authentication Could Not Be Selected To Provide The Base Identity When Multi-Auth Selected

- Fixed A Bug Where An Mtls Request With An Expired Certificate Allowed The Request To Be Proxied Upstream In Static Mtls And Dynamic Mtls

- Fixed A Bug Where Oauth Access Keys Were Physically Removed From Redis On Expiry; Behaviour For Oauth Is Now The Same As For Other Authorisation Methods.

- Added Support For The `:Authority` Header When Making Grpc Requests. Thanks To Vanhtuan0409 From The Tyk Community For This Contribution.

- Fixed A Bug Where The `Global_Size_Limit` Setting Didn'T Enable Request Size Limit Middleware. Thanks To @Patricktaibel For The Contribution!

- Fix: Null On Required Scalar Variables Are Now Being Catched As Expected

- Fix: Fixed An Issue Where Upstream Json Error Message Was Not Passed To The Consumer. It Is Now Included In "Extensions" Section Of Gql Error Response

- Fixed A Bug Where The Tyk Dashboard Could Show A Blank Screen When Policies With Custom Policy Ids Were Added To An Api Key

- Fixed An Issue Where Failure To Load Otto (Js) Middleware Didn’T Prevent The Api From Proxying Traffic To The Upstream; Now Gateway Logs An Error When The Plugin Fails To Load (During Api Creation/Update) And Responds With Http 500 If The Api Is Called.

- Fixed A Bug Where The Basic Auth Password Hash Was Included In The Response When Getting The Details Of A Key

- Fixed A Bug That Prevented Manual Allocation Of `Api_Id` During Api Creation.

- Fixed A Bug Where Tyk Might Not Correctly Complete Mtls Authentication With The Client Before Contacting The Upstream Service.

- Fixed A Bug Where Upstream Certificates Can Be Ignored When Api Protocol Is Tcp/Tls

- Fix: Gateway Panics When Redis Cache_Storage Is Down

- Fixed A Bug That Prevented Configuration Of Cache Timeout Or Cached Status Codes If Upstream Cache Control Was Enabled.

- Fix: Edge/Worker Gateway Does Not Load Api'S And Policies On Cold Start When Mdcb Is Down

- Fix: Raw Keys Were Exposed In Info Log On Gateway On Keyspace Sync


### Tyk Portal

#### Fixed

- Fixed A Bug Where An Api Could Be Incorrectly Labelled As Using Multi-Auth In The Tyk Developer Portal Catalogue View.

- Fixed A Bug Where Security Headers Were Not Present When Classic Portal Is Configured With A Custom Domain.

### Tyk Plugin

#### Fixed

- Fix: Cve-2023-27536
