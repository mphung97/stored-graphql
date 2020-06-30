"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio = __importStar(require("cheerio"));
const url_1 = require("url");
let $ = null;
function selectMetaTag(name) {
    return ($(`meta[name=${name}]`).attr("content") ||
        $(`meta[name="og:${name}"]`).attr("content") ||
        $(`meta[name="twitter:${name}"]`).attr("content") ||
        $(`meta[property=${name}]`).attr("content") ||
        $(`meta[property="og:${name}"]`).attr("content") ||
        $(`meta[property="twitter:${name}"]`).attr("content") ||
        "");
}
function fetchMetaTag(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchUrl = yield node_fetch_1.default(url);
        const text = yield fetchUrl.text();
        $ = cheerio.load(text);
        const { hostname } = url_1.parse(url);
        const metadata = {
            url: url,
            domain: String(hostname),
            title: selectMetaTag("title") || String($("h1").text()),
            image: selectMetaTag("image") || "no-image",
            description: selectMetaTag("description") || String($("p").text()),
        };
        return metadata;
    });
}
exports.default = fetchMetaTag;
//# sourceMappingURL=fetchMetaTag.js.map