import { UrlBuilder } from './urlBuilder.js'
const url = new UrlBuilder()
.setProtocol('https')
.setAuthentication('user', 'pass')
.setHostname('example.com')
.build();

console.log(url.toString());

// example superagent: aims to simplify the creation of new requests to An API.