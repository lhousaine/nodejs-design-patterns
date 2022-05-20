import { totalSales as totalSalesRaw } from "./totalSales.js";

const runningRequests = new Map();

export function totalSales(product) { // a proxy function for the original totalSales
  if (runningRequests.has(product)) { // already have the request with product param ??
    console.log("Batching");
    return runningRequests.get(product);
  }
  const resultPromise = totalSalesRaw(product); // return a non resolved promise
  runningRequests.set(product, resultPromise);
  resultPromise.finally(() => {
    runningRequests.delete(product);
  });

  return resultPromise;
}
