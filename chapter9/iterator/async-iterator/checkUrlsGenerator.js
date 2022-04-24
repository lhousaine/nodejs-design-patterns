import superagent from "superagent";

class CheckUrlsGenerator {
  constructor(urls) {
    this.urls = urls;
  }
  async *[Symbol.asyncIterator]() {
    for (const url of this.urls) {
      try {
        const checkResult = await superagent.head(url).redirects(2);
        yield `${url} is up, status: ${checkResult.status}`;
      } catch (err) {
        yield `${url} is down, error: ${err.message}`;
      }
    }
  }
}
const checkUrls = new CheckUrlsGenerator([
  "https://nodejsdesignpatterns.com",
  "https://example.com",
  "https://mustbedownforsurehopefully.com",
]);
for await (const status of checkUrls) {
  console.log(status);
}
