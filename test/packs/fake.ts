import {FakePack} from '../test_utils';
import type { PackDefinition } from '../../types';
import {ValueType} from '../../schema';
import { createFakePack } from '../test_utils';
import {makeNumericFormula} from '../../api';
import {makeNumericParameter} from '../../api';
import {makeObjectSchema} from '../../schema';
import {makeStringFormula} from '../../api';
import {makeStringParameter} from '../../api';
import {makeSyncTable} from '../../api';
import {withQueryParams} from '../../helpers/url';

const fakePersonSchema = makeObjectSchema({
  type: ValueType.Object,
  primary: 'name',
  id: 'name',
  properties: {
    name: {type: ValueType.String},
  },
  identity: {packId: FakePack.id, name: 'Person'},
});

export const manifest: PackDefinition = createFakePack({
  formulaNamespace: 'Fake',
  formulas: [
    makeNumericFormula({
      name: 'Square',
      description: 'Square a number',
      examples: [],
      parameters: [makeNumericParameter('value', 'A value to square.')],
      execute: ([value]) => {
        return value ** 2;
      },
    }),
    makeStringFormula({
      name: 'Lookup',
      description: 'Lookup a value from a remote service',
      examples: [],
      parameters: [makeStringParameter('query', 'A query to look up.')],
      execute: async ([query], context) => {
        const url = withQueryParams('https://example.com/lookup', {query});
        const response = await context.fetcher.fetch({method: 'GET', url});
        return response.body.result;
      },
    }),
  ],
  syncTables: [
    makeSyncTable('Classes', fakePersonSchema, {
      name: 'Students',
      description: "Gets students in a teacher's class",
      execute: async ([teacher], context) => {
        const {continuation} = context.sync;
        const page = continuation?.page;
        switch (teacher) {
          case 'Smith':
            if (!page || page === 1) {
              return {
                result: [{name: 'Alice'}, {name: 'Bob'}],
                continuation: {page: 2},
              };
            }
            if (page === 2) {
              return {
                result: [{name: 'Chris'}, {name: 'Diana'}],
              };
            }
          case 'Brown':
            if (!page || page === 1) {
              return {
                result: [{name: 'Annie'}, {name: 'Bryan'}],
                continuation: {page: 2},
              };
            }
            if (page === 2) {
              return {
                result: [{name: 'Christina'}, {name: 'Donald'}],
              };
            }
          default:
            return {} as any;
        }
      },
      network: {hasSideEffect: false},
      parameters: [makeStringParameter('teacher', 'teacher name')],
      examples: [],
    }),
  ],
});