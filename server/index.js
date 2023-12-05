import { readFile } from 'fs/promises';
import * as http from 'http';
import * as url from 'url';


// ... (Your existing imports and setup)


// A basic server function to implement a simple RESTful API.
async function basicServer(request, response) {
  const parsedUrl = url.parse(request.url, true);
  const pathname = parsedUrl.pathname;
  const method = request.method;

  if (pathname === '/api/genres' && method === 'GET') {
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e88a0805d4mshe025932791973e2p131fcbjsn2e209adf7d6b',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };
    try {
        const responseFromAPI = await fetch(url, options);
        const genres = await responseFromAPI.json();
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(genres)); // Return genres to the client as JSON
      } catch (error) {
        console.error(error);
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    // Rest of your code to fetch genres from the Movies Database API and send response
    // ...
  } else {
    // This part handles the static files. If we do not match any of the routes
    // above, we assume it is a static file and serve it from the 'client'
    // directory.
    try {
      // Determine the content type of the requested file (if it is a file).
      let type = '';
      if (pathname.endsWith('.css')) {
        type = 'text/css';
      } else if (pathname.endsWith('.js')) {
        type = 'text/javascript';
      } else if (pathname.endsWith('.json')) {
        type = 'application/json';
      } else if (pathname.endsWith('.html')) {
        type = 'text/html';
      } else if (pathname.endsWith('/')) {
        type = 'text/html';
      } else {
        type = 'text/plain';
      }
      // The client files are found in the client directory, so we must prepend
      // the client path to the file requested. We also recognize the meaning of
      // a '/' to refer to the index.html file.
      const file = pathname === '/' ? 'src/index.html' : pathname.substring(1);
      console.log(file.toString());
      const data = await readFile(file, 'utf8');
      response.writeHead(200, { 'Content-Type': type });
      response.write(data);
    } catch (err) {
      response.statusCode = 404;
      response.write('Not found');
    }
    response.end();
  }
}



  // ... (Your existing server creation and listen logic)
  
http.createServer(basicServer).listen(3000, () => {
    console.log('Server started on port 3000');
  });