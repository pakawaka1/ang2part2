import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function FakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions) {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';

  backend.connections.subscribe((connection: MockConnection) => {
    // We are using the setTimeout() function to simulate an
    // asynchronous call to the server that takes 1 second.
    setTimeout(() => {

      // Fake implementation of /api/authenticate
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        const body = JSON.parse(connection.request.getBody());

        if (body.email === 'david@gmail.com' && body.password === '1234') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200 })
          ));
        }
      }



       //
       // Fake implementation of /api/orders
       //
       if (connection.request.url.endsWith('/api/orders') &&
           connection.request.method === RequestMethod.Get) {
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [1, 2, 3] })
         ));
       } else {
           connection.mockRespond(new Response(
             new ResponseOptions({ status: 401 })
           ));
       }
    }



    }, 1000);
  });

  return new Http(backend, options);
}

export let FakeBackendProvider = {
    provide: Http,
    useFactory: FakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};