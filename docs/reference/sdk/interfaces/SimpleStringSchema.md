# Interface: SimpleStringSchema<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SimpleStringHintTypes``SimpleStringHintTypes` |

## Hierarchy

- `BaseStringSchema`<`T`\>

  ↳ **`SimpleStringSchema`**

## Properties

### codaType

• `Optional` **codaType**: `T`

An optional type hint instructing Coda about how to interpret or render this value.

#### Inherited from

BaseStringSchema.codaType

#### Defined in

[schema.ts:495](https://github.com/coda/packs-sdk/blob/main/schema.ts#L495)

___

### description

• `Optional` **description**: `string`

A explanation of this object schema property shown to the user in the UI.

If your pack has an object schema with many properties, it may be useful to
explain the purpose or contents of any property that is not self-evident.

#### Inherited from

BaseStringSchema.description

#### Defined in

[schema.ts:192](https://github.com/coda/packs-sdk/blob/main/schema.ts#L192)

___

### type

• **type**: [`String`](../enums/ValueType.md#string)

Identifies this schema as a string.

#### Inherited from

BaseStringSchema.type

#### Defined in

[schema.ts:493](https://github.com/coda/packs-sdk/blob/main/schema.ts#L493)