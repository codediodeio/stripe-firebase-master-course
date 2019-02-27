import * as functions from 'firebase-functions';

// A simple callable function for a sanity check
export const testFunction = functions.https.onCall( async (data, context) => {
    const uid  = context.auth && context.auth.uid;
    const message = data.message;

    return `${uid} sent a message of ${message}`
});


export { 
    stripeAttachSource 
} from './sources';

export { 
    stripeCreateCharge, 
    stripeGetCharges 
} from './charges';

export { 
    stripeCreateSubscription, 
    stripeGetSubscriptions, 
    stripeCancelSubscription 
} from './subscriptions';

export { 
    invoiceWebhookEndpoint
} from './webhooks';