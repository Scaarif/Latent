# Latent - a House finding service
## Expected API Routes
BaseUrl: api/v1/
- login -> POST (with data: {email & password}): user authentication
- resetPassword -> PUT ()
- createUser -> POST (with data: {user attributes including first and last name, email, phone number})
- editUser -> PUT (all user attributes except email and password)
- search?params -> GET: returns houses data as JSONObject with the following details: [sharability, price, location (_consider using longitude & latitude_) and state/description house(fair, new, e.t.c)]
- 
