import { db, stripe } from './config';
import * as functions from 'firebase-functions';

export const stripeWebhookSignature = functions.config().stripe.webhook_signature;

export const webhookHandler = async (data: any) => {
  const customerId = data.customer;
  const subId = data.subscription; 
  const customer = await stripe.customers.retrieve(customerId);
  const uid = customer.metadata.firebaseUID;

  const subscription = await stripe.subscriptions.retrieve(subId);

  const isActive = subscription.status === 'active';

  const docData = {
    [subscription.plan.id]: isActive,
    [subscription.id]: subscription.status,
  }

  return await db.doc(`users/${uid}`).set(docData, { merge: true });
};

export const invoiceWebhookEndpoint = functions.https.onRequest(
  async (req, res) => {
    try {
      const sig = req.headers['stripe-signature'];
      const event = stripe.webhooks.constructEvent(
        (req as any).rawBody,
        sig,
        stripeWebhookSignature
      );
      const data = event.data.object;

      await webhookHandler(data);

      res.sendStatus(200);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);
