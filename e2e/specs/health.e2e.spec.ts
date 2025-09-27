import { ping } from "tcp-ping";

describe('Health Check', () => {
  test('Reservations should return 200 OK', async () => {
    const response = await fetch('http://reservations:3000');

    expect(response.ok).toBeTruthy();
  });

  test('Auth should return 200 OK', async () => {
    const response = await fetch('http://auth:3001');

    expect(response.ok).toBeTruthy();
  });

  test('Payments should be pingable', (done) => {
    ping({
      address: 'payments',
      port: 3003,
    }, (err: any) => {
      if (err) {
        fail();
      } 
      done();
    })
  });

  test('Notifications should be pingable', (done) => {
    ping({
      address: 'notifications',
      port: 3004,
    }, (err: any) => {
      if (err) {
        fail();
      } 
      done();
    })
  });
});