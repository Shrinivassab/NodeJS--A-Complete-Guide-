const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/HTML');
        res.write('<html>');
        res.write('<head><title>Res when url matched `/`</title></head>');
        res.write('<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // Non-Blocking -> Async concept
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/'); // (default, redirected locations);
                return res.end();
            });
        });

        // Blocking- > Wait till the message is written
        // return req.on('end', () => {
        //     const parsedBody = Buffer.concat(body).toString();
        //     const message = parsedBody.split('=')[1];
        //     fs.writeFileSync('message.txt', message);
        //     res.statusCode = 302;
        //     res.setHeader('Location', '/'); // (default, redirected locations);
        //     return res.end();
        // });

    }

    res.setHeader('Content-Type', 'text/HTML');
    res.write('<html>');
    res.write('<body><h1>My first res using Node</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};
