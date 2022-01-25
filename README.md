# Tomorro Sample Architecture (Draft)

## REST API

The core of the platform is a REST API which is designed to support the functionality required for MVP.

As such, we have several functional domain areas that are covered and should each be encapsulated within a single service. For the purposes of the MVP, we will use a single Postgres database - but access control for all services will be set at the table level with the exception of the "Admin" service which has read/write access to all tables.

Please see the following Miro board for an overview and note the following:

[https://miro.com/app/board/uXjVOTEyeZE=/?invite_link_id=936783581306](REST API Service Map + Endpoints)

- Names encased in curly braces represent types available in the `tomorro.types.ts` file.
- Each endpoint is namespaced according to the domain (service) it covers
- Where an endpoint has no response value (green highlight with a type) it's assumed to be fire-and-forget

