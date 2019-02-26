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
