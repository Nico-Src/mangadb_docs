---
title: "General"
description: ""
---

# API Documentation

This section documents the available API endpoints and their expected behavior, request formats, and responses. All protected routes are secured using a centralized authentication middleware that validates access tokens and enforces permission-based authorization.

## Authentication & Authorization Middleware

The API uses a middleware layer to protect routes and control access based on authentication state and permissions. For protected endpoints, an access token is extracted from the incoming request and validated using JWT verification. If the token is valid, the decoded user context is attached to the request and made available to downstream handlers.

Some routes require only a valid authenticated session, while others additionally enforce specific permissions. In those cases, the middleware verifies that the authenticated user possesses all required permissions before allowing the request to proceed. Requests that fail authentication or authorization checks are rejected with the appropriate HTTP status code.

After this section, each route is documented individually, including its authentication requirements, expected inputs, and possible responses.