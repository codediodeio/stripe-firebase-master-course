# 8. Webhoooks

Stripe can send webhooks (HTTP requests) to your cloud functions when something important happens. There is a webhook for basically every event, but we are most converned when an invoice is successfully paid, or the payment fails. A failed payment means the customer has lapsed on their subscription and we need to update their data in Firestore. 

- Configure Stripe Webhooks
- Verify the Signing Secret in a Cloud Function

# 7. Subscriptions 

This is the most complex section of the course. It will show you how to create a subscription with recurring payment, retrieve the user's active subscriptions from the API, and cancel subscriptions. 

- Create Plans and Subscriptions
- Get the Plan Details
- Cancel a Plan
- Unit Test

# 6. Charges

The hard part is over and we're ready to get paid! In this section, we will charge a customer's credit card for a fixed amount and retrieve their charge history. 

- Create Charges
- Idempotency
- Retrieve a List of Charges
- Unit Tests


# 5. Payment Sources

Now that we are able to create Stripe customers, we need to collect [payment sources](https://stripe.com/docs/api/sources) (ie Credit/Debit Cards or Bank Accounts) then attach them to the customer.  A source has the flexibility to be charged multiple times and managed by the user. 

- Implement a credit card form with Stripe Elements.
- Tokenize the payment source.
- Attach the source to the customer.

# 4. Stripe Customers

In this section, we learn all about the Stripe [Customer](https://stripe.com/docs/api) API. 

- Validating Data & Error Handling
- Create a Stripe Customer
- Associate a Customer with a Firebase User
- Retrieve a Customer Account
- Unit Tests

# 3. Callable Functions

Callable functions make it possible to call HTTP cloud functions with the user's Firebase auth context. This can dramatically simplify our code because it means we no longer need to manually validate auth headers in our cloud functions.

In addition, we we also setup a basic frontend with vanilla HTML/JS to validate the integration of our code. 

```
firebase init hosting 

firebase deploy --only funtions

firebase serve
```

# 2. Testing with Jest

Now it's time to put some unit tests in place. While this step is optional I highly recommend testing your payment integration because (a) one failed commit could cause you lose out on potential payments, (b) it provides a great playground for rapid development, (c) it will help you better understand your code. 

1. Install [Jest](https://github.com/kulshekhar/ts-jest) and the [Firebase Functions Test](https://firebase.google.com/docs/functions/unit-testing) package.
1. Download your Firebase service account.
1. Setup the testing config.
1. Write your first tests.


```
npm i firebase firebase-functions-test
```

# 1. Initial Setup

In this section, we accomplish the following tasks

1. Create a new [Firebase Project](https://google.firebase.com) and make sure to enable billing. Your project will still be free on the Blaze plan.
2. Initialize Cloud Functions by running `firebase init functions`. This repo uses TypeScript, but feel free to use vanilla JS and omit the type annotations where applicable.
3. Signup for [Stripe](https://stripe.com/) and the API key to the functions environment.
4. Initialize Firebase Admin & the Stripe Node SDK

```
# add the secret key to the environment
firebase functions:config:set stripe.secret="sk_your_test_key"

cd functions
npm i stripe
npm i @types/stripe -D
```

# 0. Start Here

A blank project.
