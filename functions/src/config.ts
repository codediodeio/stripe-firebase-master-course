// Initialize Firebase Admin
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// Initialize Cloud Firestore Database
export const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// ENV Variables
export const stripeSecret = functions.config().stripe.secret;

// Export Stripe
import * as Stripe from 'stripe'; 
export const stripe = new Stripe(stripeSecret);



