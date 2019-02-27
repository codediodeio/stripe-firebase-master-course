import * as functions from 'firebase-functions';

export const testFunction = functions.https.onCall( async (data, context) => {
    const uid  = context.auth && context.auth.uid;
    const message = data.message;

    return `${uid} sent a message of ${message}`
});


export { stripeAttachSource } from './sources';

export { stripeCreateCharge, stripeGetCharges } from './charges';