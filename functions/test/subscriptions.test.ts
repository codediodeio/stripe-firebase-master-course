import { fun } from './test-config';
fun.cleanup;

import { mockUser, getMockSource } from './mocks';
import { createCustomer } from '../src/customers';
import { createSubscription } from '../src/subscriptions';

let user: any;

beforeAll( async () => {
  user = await mockUser();
  await createCustomer(user.uid);
});

test('createCharge creates a charge', async () => {
  const plan = 'plan_DELd0Jgt7IVwF7';

  const mockSource = await getMockSource();
  const sub = await createSubscription(user.uid, mockSource.id, plan);

  expect(sub.id).toContain('sub_')
  expect(sub.status).toBe('active');
});