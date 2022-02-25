Xumm mock API
====

A mock version of the API as described in the [Xumm API docs](https://xumm.readme.io/reference/about).
This mock API has very basic fixtures for endpoints and is intended to run test suites that expect
response data structures from endpoints as described in the API docs. 

----------------------- ------------------------------------

**Please note:** the mock API is not intended to test the Xumm API itself, but your application. It's therefore 
extremely simple and will return whatever is in the fixtures. You will not be returned different payloads 
based on what you post, for instance, and there's no elaborate validation.

----------------------------------------------------------------

### Usage
To run:
`npm start`

The server will now be available at `http://localhost:3000`. Another port can be defined through a 
`.env` file. 

Available fixtures can be found [here](./fixtures/api.js).

### Responses
Status codes are loosely based on real API behavior. Examples:
- If you use any other API credentials than specified in the `.env` file or hardcoded in the 
fixtures, you'll receive a `403`.
- If you attempt to fetch by a UUID that's not present in the fixtures, you will receive a `404`. 
- A `400` will  be returned if the post
data doesn't contain at least `txblob` and `txjson`, and `txjson` must have a `TransactionType`.