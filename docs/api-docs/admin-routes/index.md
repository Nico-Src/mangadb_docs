---
title: "Admin-Routes"
description: ""
---

# Admin API

This section documents all **administrative API endpoints** used for system-level operations. These routes are intended for privileged access only.

All admin routes are protected by centralized authentication and authorization middleware. Requests require a valid access token and must pass permission checks to ensure the authenticated user is authorized to perform the requested action.

Each route in this section is documented individually, including its required permissions, request parameters, and possible responses.