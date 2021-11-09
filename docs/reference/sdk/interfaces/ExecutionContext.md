# Interface: ExecutionContext

An object passed to the `execute` function of every formula invocation
with information and utilities for handling the invocation. In particular,
this contains the [Fetcher](Fetcher.md), which is used for making HTTP requests.

## Hierarchy

- **`ExecutionContext`**

  ↳ [`SyncExecutionContext`](SyncExecutionContext.md)

## Properties

### endpoint

• `Optional` `Readonly` **endpoint**: `string`

The base endpoint URL for the user's account, only if applicable. See [requiresEndpointUrl](OAuth2Authentication.md#requiresendpointurl).

If the API URLs are variable based on the user account, you will need this endpoint
to construct URLs to use with the fetcher. Alternatively, you can use relative URLs
(e.g. "/api/entity") and Coda will include the endpoint for you automatically.

#### Defined in

[api_types.ts:557](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L557)

___

### fetcher

• `Readonly` **fetcher**: [`Fetcher`](Fetcher.md)

The [Fetcher](Fetcher.md) used for making HTTP requests.

#### Defined in

[api_types.ts:544](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L544)

___

### invocationLocation

• `Readonly` **invocationLocation**: `InvocationLocation`

Information about the Coda environment and doc this formula was invoked from.
This is mostly for Coda internal use and we do not recommend relying on it.

#### Defined in

[api_types.ts:562](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L562)

___

### invocationToken

• `Readonly` **invocationToken**: `string`

A random token scoped to only this request invocation.
This is a unique identifier for the invocation, and in particular used with
{@link AuthenticationType.Custom} for naming template parameters that will be
replaced by the fetcher in secure way.

#### Defined in

[api_types.ts:573](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L573)

___

### sync

• `Optional` `Readonly` **sync**: `Sync`

Information about state of the current sync. Only populated if this is a sync table formula.

#### Defined in

[api_types.ts:577](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L577)

___

### temporaryBlobStorage

• `Readonly` **temporaryBlobStorage**: [`TemporaryBlobStorage`](TemporaryBlobStorage.md)

A utility to fetch and store files and images that either require the pack user's authentication
or are too large to return inline. See [TemporaryBlobStorage](TemporaryBlobStorage.md).

#### Defined in

[api_types.ts:549](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L549)

___

### timezone

• `Readonly` **timezone**: `string`

The timezone of the doc from which this formula was invoked.

#### Defined in

[api_types.ts:566](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L566)