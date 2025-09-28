describe('Reservations E2E', () => {
  let jwt: string;
  beforeAll(async () => {
    const user = {
      email: 'dkavaliou.epam@gmail.com',
      password: 'randomStrong!2',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    jwt = await response.text();
    console.log('JWT', jwt);

  });

  test('Create', async () => {
    const reservationData = {
      "startDate": "12/20/2022",
      "endDate": "12/25/2022",
      "placeId": "12345",
      "invoiceId": "493",
      "charge": {
        "amount": 12
      }
    };
    const createResponse = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({
        ...reservationData,
      }),
    });

    console.log('createResponse', createResponse);
    expect(createResponse.ok).toBeTruthy();
    const createdReservation = await createResponse.json();
    console.log('Reservation', createdReservation);
    
    const getResponse = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
      }
    );

    console.log('getResponse', getResponse);
    expect(getResponse.ok).toBeTruthy();
    const fetchedReservation = await getResponse.json();
    expect(fetchedReservation).toEqual(createdReservation);
  });
});