---
title: "withIdentity"
---
# Function: withIdentity

[core](../modules/core.md).withIdentity

▸ **withIdentity**(`schema`, `identityName`): `GenericObjectSchema`

Convenience for defining the result schema for an action. The identity enables Coda to
update the corresponding sync table row, if it exists.
You could add the identity directly, but that would make the schema less re-usable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `GenericObjectSchema` |
| `identityName` | `string` |

#### Returns

`GenericObjectSchema`
