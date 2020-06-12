import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { parse } from "url";

let $: any = null;

function selectMetaTag(name: string): string {
  return (
    $(`meta[name=${name}]`).attr("content") ||
    $(`meta[name="og:${name}"]`).attr("content") ||
    $(`meta[name="twitter:${name}"]`).attr("content") ||
    $(`meta[property=${name}]`).attr("content") ||
    $(`meta[property="og:${name}"]`).attr("content") ||
    $(`meta[property="twitter:${name}"]`).attr("content") ||
    ""
  );
}

export default async function fetchMetaTag(url: string) {
  const fetchUrl = await fetch(url);
  const text = await fetchUrl.text();
  $ = cheerio.load(text);

  const { hostname } = parse(url);

  const metadata = {
    url: url,
    domain: String(hostname),
    title: selectMetaTag("title") || String($("h1").text()),
    image: selectMetaTag("image") || "no-image",
    description: selectMetaTag("description") || String($("p").text()),
  };
  return metadata
}
