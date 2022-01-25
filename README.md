# Tomorro Sample Architecture (Draft)

## REST API

The core of the platform is a REST API which is designed to support the functionality required for MVP.

As such, we have several functional domain areas that are covered and should each be encapsulated within a single service. For the purposes of the MVP, we will use a single Postgres database - but access control for all services will be set at the table level with the exception of the "Admin" service which has read/write access to all tables.

Please see the following Miro board for an overview and note the following:

[REST API Service Map + Endpoints](https://miro.com/app/board/uXjVOTEyeZE=/?invite_link_id=936783581306)

- Names encased in curly braces represent types available in the `tomorro.types.ts` file.
- Each endpoint is namespaced according to the domain (service) it covers
- Where an endpoint has no response value (green highlight with a type) it's assumed to be fire-and-forget
- A single `config.json` file will act as our reference for relationships between parents/children/subchildren and include data such as parameters, display names, etc. This should be included within each service as needed and read directly by the service (as an import) rather than being stored in a DB, as this will likely remain static for a long time with a few updates here or there - but any pipeline should provision for re-deploying relevant services on a change to this.


## Authentication + Authorization

We will be using Auth0 as our primary identity and authentication provider for users - whilst using Retool secured by Google SSO in order to allow administrators to manage aspects of the platform as needed.

As we are expecting to use AWS API Gateway to front all internet facing APIs, we will also use a custom "Authorizer Lambda" in order to validate in-bound JWTs (Bearer tokens) or our private API key for the admin service (Basic token) and forward or reject requests as needed.

Our goal is that no individual service should care about authentication so any acceptance/denial of a request should happen at the authorization layer (including checking scopes and other claims if needed) and should simply be forwarded the request with an `X-Org-ID` header (for non-admin services) for attribution and permissioning when it comes to reading or writing data.

Please see the following Miro board for an overview:

[Authentication Flow](https://miro.com/app/board/uXjVOTexTko=/?invite_link_id=120110501565)


## Admin


Please see the following Miro board for an overview:

[Admin Flow:](https://miro.com/app/board/uXjVOSlwNYE=/?invite_link_id=993668943358)


## Data structures and storage

We expect to use AWS RDS with Postrgres in order to store all data. For the time being, as above, we will opt for a single database with individual tables mapped to domains and a mapping of expected schemas can be found in this Google Sheet:


[Database Schema](https://docs.google.com/spreadsheets/d/1Yo0xDyiJrsK68AFR-lRZLQcdPn3RCdrBnKsNfxHanxo/edit?usp=sharing)

