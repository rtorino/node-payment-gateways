# Node.js Payment Gateways

---

Supports the following payment gateways:

 * PayPal
 * Braintree

### Testing the API:
 (Note: I used Swagger UI plugin for Hapi [https://github.com/glennjones/hapi-swaggers] - this provides an interactive API documentation which enable testing of API endpoints without the need to create an API client.)

 1. Clone the repo: `git clone https://github.com/rtorino/node-payment-gateways.git`
 2. Run `cd node-payment-gateways && npm install`
 3. Data are persisted using MongoDB, run `sudo  mongod` and then `node server.js`
 4. Test the API: navigate to `http://localhost:5000/documentation` in your browser

### Run Tests:
 1. Run `npm test`

### To Do:
 - [ ] Improve test coverage
 - [ ] Save response from gateways - PayPal and Braintree have different response format, need to clarify on which common information to persist into the database.
