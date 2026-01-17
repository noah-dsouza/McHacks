# MongoDB Atlas (QuantPilot)

MongoDB stores user strategies and experiment runs.

## Why MongoDB
- Schema-flexible for experiments
- Easy cloud setup (Atlas)
- Required for MLH MongoDB prize

## Database
Name: quantpilot

## Collections
### runs
- userId (Auth0 sub)
- mode ("student" | "experiment")
- hypothesis
- parameters
- metrics
- createdAt

## Indexes
- userId
- createdAt
