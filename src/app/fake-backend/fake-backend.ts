import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function FakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions) {
      // admin token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhdmlkIENlcnZhbnRlcyIsImFkbWluIjp0cnVlfQ.-DFms3wpaFcO3b5-4Mut4d4TZoYd2z8rCA5ySmTGCxg';
      // not admin token
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhdmlkIENlcnZhbnRlcyIsImFkbWluIjpmYWxzZX0.UcblQ6sUrzAdSoyIQwtMjun0VBznX7EieqBlCMF60oY';


  backend.connections.subscribe((connection: MockConnection) => {
    // We are using the setTimeout() function to simulate an
    // asynchronous call to the server that takes 1 second.
    setTimeout(() => {

      // Fake implementation of /api/authenticate
      // this method checks the URL for the http post request for this endpoint
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        const body = JSON.parse(connection.request.getBody());

        // If client sends this response, with valid email and password, the token will sent.
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
  });

  return new Http(backend, options);
});
    }
// when you need to an inject an instance of an http class, then use this function that will create an instance of this http class to return a new http object, and angular these dependencicnes to call the function
export let FakeBackendProvider = {
    provide: Http,
    useFactory: FakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
