"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePublish = void 0;
const logging_1 = require("../helpers/logging");
const build_1 = require("./build");
const cli_1 = require("../helpers/cli");
const helpers_1 = require("./helpers");
const helpers_2 = require("./helpers");
const helpers_3 = require("./helpers");
const helpers_4 = require("./helpers");
const helpers_5 = require("../testing/helpers");
const helpers_6 = require("../testing/helpers");
const create_1 = require("./create");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const validate_1 = require("./validate");
async function handlePublish({ manifestFile, codaApiEndpoint }) {
    const formattedEndpoint = helpers_2.formatEndpoint(codaApiEndpoint);
    const logger = new logging_1.ConsoleLogger();
    const { manifest } = await Promise.resolve().then(() => __importStar(require(manifestFile)));
    logger.info('Building Pack bundle...');
    const bundleFilename = await build_1.build(manifestFile);
    // Since package.json isn't in dist, we grab it from the root directory instead.
    const packageJson = await Promise.resolve().then(() => __importStar(require(helpers_4.isTestCommand() ? '../package.json' : '../../package.json')));
    const codaPacksSDKVersion = packageJson.version;
    codaPacksSDKVersion;
    const apiKey = helpers_3.getApiKey();
    if (!apiKey) {
        helpers_5.printAndExit('Missing API key. Please run `coda register <apiKey>` to register one.');
    }
    const client = helpers_1.createCodaClient(apiKey, formattedEndpoint);
    const packs = create_1.readPacksFile();
    const packId = packs && packs[manifest.name];
    if (!packId) {
        helpers_5.printAndExit(`Could not find a Pack id registered to Pack "${manifest.name}"`);
    }
    const packVersion = manifest.version;
    if (!packVersion) {
        helpers_5.printAndExit(`No Pack version found for your Pack "${manifest.name}"`);
    }
    //  TODO(alan): error testing
    try {
        logger.info('Registering new Pack version...');
        const { uploadUrl } = await client.registerPackVersion(packId, packVersion);
        // TODO(alan): only grab metadata from manifest.
        logger.info('Validating Pack metadata...');
        await validate_1.validateMetadata(manifest);
        logger.info('Uploading Pack...');
        const metadata = cli_1.compilePackMetadata(manifest);
        await uploadPackToSignedUrl(bundleFilename, metadata, uploadUrl);
        logger.info('Validating upload...');
        await client.packVersionUploadComplete(packId, packVersion);
    }
    catch (err) {
        helpers_5.printAndExit(`Error: ${err}`);
    }
    logger.info('Done!');
}
exports.handlePublish = handlePublish;
async function uploadPackToSignedUrl(bundleFilename, metadata, uploadUrl) {
    const bundle = helpers_6.readFile(bundleFilename);
    if (!bundle) {
        helpers_5.printAndExit(`Could not find bundle file at path ${bundleFilename}`);
    }
    const upload = {
        metadata,
        bundle: bundle.toString(),
    };
    try {
        await request_promise_native_1.default.put(uploadUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            json: upload,
        });
    }
    catch (err) {
        helpers_5.printAndExit(`Error in uploading Pack to signed url: ${err}`);
    }
}
