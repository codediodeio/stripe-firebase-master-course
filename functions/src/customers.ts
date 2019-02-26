import { assert } from './helpers';
import { db, stripe } from './config'; 

/**
Read the user document from Firestore
*/
export const getUser = async(uid: string) => {
    return await db.collection('users').doc(uid).get().then(doc => doc.data());
}

/**
Gets a customer from Stripe
*/
export const getCustomer = async(uid: string) => {
    const user = await getUser(uid);
    return assert(user, 'stripeCustomerId');
}

/**
Updates the user document non-destructively
*/
export const updateUser = async(uid: string, data: Object) => {
    return await db.collection('users').doc(uid).set(data, { merge: true })
}

/**
Takes a Firebase user and creates a Stripe customer account
*/
export const createCustomer = async(uid: any) => {
    const customer = await stripe.customers.create({
        metadata: { firebaseUID: uid }
    })

    await updateUser(uid, { stripeCustomerId: customer.id })

    return customer;
}



/**
Read the stripe customer ID from firestore, or create a new one if missing
*/
export const getOrCreateCustomer = async(uid: string) => {
    
    const user = await getUser(uid);
    const customerId = user && user.stripeCustomerId;

    // If missing customerID, create it
    if (!customerId) {
        return createCustomer(uid);
    } else {
        return stripe.customers.retrieve(customerId);
    }

}