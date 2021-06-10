"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPack = void 0;
const api_1 = require("./api");
const api_2 = require("./api");
const api_3 = require("./api");
/**
 * Creates a new skeleton pack definition that can be added to.
 *
 * @example
 * export const pack = newPack();
 * pack.addFormula({resultType: ValueType.String, name: 'MyFormula', ...});
 * pack.addSyncTable('MyTable', ...);
 * pack.setUserAuthentication({type: AuthenticationType.HeaderBearerToken});
 */
function newPack(definition) {
    return new PackDefinitionBuilder(definition);
}
exports.newPack = newPack;
class PackDefinitionBuilder {
    constructor(definition) {
        const { formulas, formats, syncTables, networkDomains, defaultAuthentication, systemConnectionAuthentication, formulaNamespace, } = definition || {};
        this.formulas = Array.isArray(formulas) ? formulas : [];
        this.formats = formats || [];
        this.syncTables = syncTables || [];
        this.networkDomains = networkDomains || [];
        this.defaultAuthentication = defaultAuthentication;
        this.systemConnectionAuthentication = systemConnectionAuthentication;
        this.formulaNamespace = formulaNamespace || 'Deprecated';
    }
    addFormula(definition) {
        const formula = api_2.makeFormula(definition);
        this.formulas.push(formula); // WTF
        return this;
    }
    addSyncTable(name, schema, formula, connection, dynamicOptions = {}) {
        const syncTable = api_3.makeSyncTable(name, schema, formula, connection, dynamicOptions);
        this.syncTables.push(syncTable);
        return this;
    }
    addDynamicSyncTable(definition) {
        const dynamicSyncTable = api_1.makeDynamicSyncTable(definition);
        this.syncTables.push(dynamicSyncTable);
        return this;
    }
    addColumnFormat(format) {
        this.formats.push(format);
        return this;
    }
    setUserAuthentication(authentication) {
        this.defaultAuthentication = authentication;
        return this;
    }
    setSystemAuthentication(systemAuthentication) {
        this.systemConnectionAuthentication = systemAuthentication;
        return this;
    }
    addNetworkDomain(...domain) {
        this.networkDomains.push(...domain);
        return this;
    }
}
