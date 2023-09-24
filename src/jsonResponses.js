const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// Success
const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>This is a successful response</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'This is a successful response',
  };
  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

// Bad Request
const badRequest = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.valid || params.valid !== 'true') {
      responseXML += '<message>Missing valid query parameter set to true</message>';
      responseXML += '<id>badRequest</id></response>';
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    responseXML += '<message>This request has the required parameters</message></response>';
    return respond(request, response, 200, responseXML, 'application/json');
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respond(request, response, 400, JSON.stringify(responseJSON), 'application/json');
  }
  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

// Unauthorized
const unauthorized = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.loggedIn || params.loggedIn !== 'true') {
      responseXML += '<message>Missing loggedIn query parameter set to true</message>';
      responseXML += '<id>unauthorized</id></response>';
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    responseXML += '<message>This request has the required parameters</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };
  if (!params.loggedIn || params.loggedIn !== 'true') {
    responseJSON.message = 'Missing loggedIn query parameter set to true';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 401, JSON.stringify(responseJSON), 'application/json');
  }
  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

// Forbidden
const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>You do not have access to this content.</message></response>';
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'You do not have access to this content.',
  };
  return respond(request, response, 403, JSON.stringify(responseJSON), 'application/json');
};

// Internal
const internal = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>Internal Server Error. Something went wrong.</message></response>';
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
  };
  return respond(request, response, 500, JSON.stringify(responseJSON), 'application/json');
};

// Not Implemented
const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message></response>';
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  };
  return respond(request, response, 501, JSON.stringify(responseJSON), 'application/json');
};

// Not Found
const notFound = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respond(request, response, 404, JSON.stringify(responseJSON), 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
