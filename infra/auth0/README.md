# Auth0 Integration (QuantPilot)
Auth0 handles authentication and user identity.

## Why Auth0
- Secure login out of the box
- Easy student-friendly auth
- Required for MLH Auth0 prize

## Flow
User logs in → Auth0 issues ID token → backend trusts Auth0 `sub` as userId.

## Local Dev Settings
- Callback URL: http://localhost:3000/api/auth/callback
- Logout URL: http://localhost:3000
- Allowed Web Origins: http://localhost:3000

## Required Env Vars
AUTH0_SECRET  
AUTH0_BASE_URL  
AUTH0_ISSUER_BASE_URL  
AUTH0_CLIENT_ID  
AUTH0_CLIENT_SECRET  
