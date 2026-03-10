import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';

function createMockResponse() {
  const headers = new Map<string, string>();
  let statusCode = 200;
  let body: unknown;

  const res = {
    setHeader(name: string, value: string) {
      headers.set(name, value);
      return res;
    },
    status(code: number) {
      statusCode = code;
      return res;
    },
    json(payload: unknown) {
      body = payload;
      return res;
    },
    end() {
      return res;
    },
    send(payload: unknown) {
      body = payload;
      return res;
    },
  } as unknown as VercelResponse;

  return {
    res,
    getStatusCode: () => statusCode,
    getBody: () => body,
    getHeader: (name: string) => headers.get(name),
  };
}

function createReq(overrides: Partial<VercelRequest> = {}): VercelRequest {
  return {
    method: 'GET',
    headers: { origin: 'http://localhost:3000' },
    socket: { remoteAddress: '127.0.0.1' },
    ...overrides,
  } as unknown as VercelRequest;
}

describe('billing routes baseline guards', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, NODE_ENV: 'test' };
    delete process.env.VITE_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('create-checkout rejects non-POST methods', async () => {
    const { default: createCheckout } = await import('./create-checkout');
    const { res, getStatusCode, getBody } = createMockResponse();

    await createCheckout(createReq({ method: 'GET' }), res);

    expect(getStatusCode()).toBe(405);
    expect(getBody()).toEqual({ error: 'Method not allowed' });
  });

  it('create-checkout requires authentication', async () => {
    const { default: createCheckout } = await import('./create-checkout');
    const { res, getStatusCode, getBody } = createMockResponse();

    await createCheckout(createReq({ method: 'POST', headers: { origin: 'http://localhost:3000' } }), res);

    expect(getStatusCode()).toBe(401);
    expect(getBody()).toEqual({ error: 'Authentication required' });
  });

  it('create-checkout fails when auth service is not configured', async () => {
    const { default: createCheckout } = await import('./create-checkout');
    const { res, getStatusCode, getBody } = createMockResponse();

    await createCheckout(
      createReq({ method: 'POST', headers: { origin: 'http://localhost:3000', authorization: 'Bearer fake-token' } }),
      res,
    );

    expect(getStatusCode()).toBe(500);
    expect(getBody()).toEqual({ error: 'Auth service not configured' });
  });

  it('customer-portal rejects non-POST methods', async () => {
    const { default: customerPortal } = await import('./customer-portal');
    const { res, getStatusCode, getBody } = createMockResponse();

    await customerPortal(createReq({ method: 'GET' }), res);

    expect(getStatusCode()).toBe(405);
    expect(getBody()).toEqual({ error: 'Method not allowed' });
  });

  it('customer-portal requires authentication', async () => {
    const { default: customerPortal } = await import('./customer-portal');
    const { res, getStatusCode, getBody } = createMockResponse();

    await customerPortal(createReq({ method: 'POST', headers: { origin: 'http://localhost:3000' } }), res);

    expect(getStatusCode()).toBe(401);
    expect(getBody()).toEqual({ error: 'Authentication required' });
  });

  it('customer-portal fails when auth service is not configured', async () => {
    const { default: customerPortal } = await import('./customer-portal');
    const { res, getStatusCode, getBody } = createMockResponse();

    await customerPortal(
      createReq({ method: 'POST', headers: { origin: 'http://localhost:3000', authorization: 'Bearer fake-token' } }),
      res,
    );

    expect(getStatusCode()).toBe(500);
    expect(getBody()).toEqual({ error: 'Auth service not configured' });
  });

  it('subscription-status rejects non-GET methods', async () => {
    const { default: subscriptionStatus } = await import('./subscription-status');
    const { res, getStatusCode, getBody } = createMockResponse();

    await subscriptionStatus(createReq({ method: 'POST' }), res);

    expect(getStatusCode()).toBe(405);
    expect(getBody()).toEqual({ error: 'Method not allowed' });
  });

  it('subscription-status requires authentication', async () => {
    const { default: subscriptionStatus } = await import('./subscription-status');
    const { res, getStatusCode, getBody } = createMockResponse();

    await subscriptionStatus(createReq({ method: 'GET', headers: { origin: 'http://localhost:3000' } }), res);

    expect(getStatusCode()).toBe(401);
    expect(getBody()).toEqual({ error: 'Authentication required' });
  });

  it('subscription-status fails when auth service is not configured', async () => {
    const { default: subscriptionStatus } = await import('./subscription-status');
    const { res, getStatusCode, getBody } = createMockResponse();

    await subscriptionStatus(
      createReq({ method: 'GET', headers: { origin: 'http://localhost:3000', authorization: 'Bearer fake-token' } }),
      res,
    );

    expect(getStatusCode()).toBe(500);
    expect(getBody()).toEqual({ error: 'Auth service not configured' });
  });
});
