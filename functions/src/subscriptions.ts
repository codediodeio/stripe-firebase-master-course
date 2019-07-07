import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from './helpers';
import { stripe, db } from './config'; 
import { getOrCreateCustomer } from './customers';
import { attachSource } from './sources';


/**
Gets a user's subscriptions
*/
export const getSubscriptions = async(uid: string) => {
    const customer = await getCustomer(uid);
    return stripe.subscriptions.list({ customer });
}

/**
Creates and charges user for a new subscription
*/
export const createSubscription = async(uid:string, source:string, plan: string, coupon?: string) => {
 
    const customer = await getOrCreateCustomer(uid);

    await attachSource(uid, source);

    const subscription = await stripe.subscriptions.create({
        customer,
        coupon,
        items: [
            {
              plan,
            },
        ],
    });

    // Add the plan to existing subscriptions
    const docData = {
        [plan]: true,
        [subscription.id]: 'active',
    }

    await db.doc(`users/${uid}`).set(docData, { merge: true });

    return subscription;
}

/**
Cancels a subscription and stops all recurring payments
*/
export async function cancelSubscription(uid: string, subId: string): Promise<any> {

    const subscription  = await stripe.subscriptions.del(subId);

    const docData = {
        [subscription.plan.id]: false,
        [subscription.id]: 'canceled'
    }

    await db.doc(`users/${uid}`).set(docData, { merge: true });

    return subscription;
}

/////// DEPLOYABLE FUNCTIONS ////////

export const stripeCreateSubscription = functions.https.onCall( async (data, context) => {
    const uid = assertUID(context);
    console.log(1, data)
    const source = assert(data, 'source');
    const plan = assert(data, 'plan');
    return catchErrors( createSubscription(uid, source, plan, data.coupon) );
});

export const stripeCancelSubscription = functions.https.onCall( async (data, context) => {
    const uid = assertUID(context);
    const plan = assert(data, 'plan');
    return catchErrors( cancelSubscription(uid, plan) );
});

export const stripeGetSubscriptions = functions.https.onCall( async (data, context) => {
    const uid = assertUID(context);
    return catchErrors( getSubscriptions(uid) );
});
