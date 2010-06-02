
/**
 * Module dependencies.
 */

var connect = require('connect'),
    helpers = require('./helpers'),
    assert = require('assert'),
    http = require('http');

/**
 * Path to ./test/fixtures/
 */

var fixturesPath = __dirname + '/fixtures';

module.exports = {
    'test valid file': function(){
        var server = helpers.run([
            { provider: 'static', root: fixturesPath }
        ]);
        var req = server.request('GET', '/user.json');
        req.buffer = true;
        req.addListener('response', function(res){
            res.addListener('end', function(){
                var headers = res.headers,
                    body = '{\n    "name": "tj",\n    "email": "tj@extjs.com"\n}';
                assert.equal(200, res.statusCode, 'Test static with valid file status code');
                assert.equal(body, res.body, 'Test static with valid file response body');
                assert.equal('application/json', headers['content-type'], 'Test static with valid file Content-Type');
                assert.equal(body.length, headers['content-length'], 'Test static with valid file Content-Length');
                assert.ok(headers['last-modified'], 'Test static with valid file Last-Modified');
                assert.ok(headers['cache-control'], 'Test static with valid file Cache-Control');
            });
        });
        req.end();
    }
}