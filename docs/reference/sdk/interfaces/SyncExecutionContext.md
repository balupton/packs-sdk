# Interface: SyncExecutionContext

Sub-class of [ExecutionContext](ExecutionContext.md) that is passed to the `execute` function of every
sync formula invocation. The only different is that the presence of the `sync` property

## Hierarchy

- [`ExecutionContext`](ExecutionContext.md)

  ↳ **`SyncExecutionContext`**

## Properties

### endpoint

• `Optional` `Readonly` **endpoint**: `string`

The base endpoint URL for the user's account, only if applicable. See [requiresEndpointUrl](OAuth2Authentication.md#requiresendpointurl).

If the API URLs are variable based on the user account, you will need this endpoint
to construct URLs to use with the fetcher. Alternatively, you can use relative URLs
(e.g. "/api/entity") and Coda will include the endpoint for you automatically.

#### Inherited from

[ExecutionContext](ExecutionContext.md).[endpoint](ExecutionContext.md#endpoint)

#### Defined in

[api_types.ts:557](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L557)

___

### fetcher

• `Readonly` **fetcher**: [`Fetcher`](Fetcher.md)

The [Fetcher](Fetcher.md) used for making HTTP requests.

#### Inherited from

[ExecutionContext](ExecutionContext.md).[fetcher](ExecutionContext.md#fetcher)

#### Defined in

[api_types.ts:544](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L544)

___

### invocationLocation

• `Readonly` **invocationLocation**: `InvocationLocation`

Information about the Coda environment and doc this formula was invoked from.
This is mostly for Coda internal use and we do not recommend relying on it.

#### Inherited from

[ExecutionContext](ExecutionContext.md).[invocationLocation](ExecutionContext.md#invocationlocation)

#### Defined in

[api_types.ts:562](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L562)

___

### invocationToken

• `Readonly` **invocationToken**: `string`

A random token scoped to only this request invocation.
This is a unique identifier for the invocation, and in particular used with
{@link AuthenticationType.Custom} for naming template parameters that will be
replaced by the fetcher in secure way.

#### Inherited from

[ExecutionContext](ExecutionContext.md).[invocationToken](ExecutionContext.md#invocationtoken)

#### Defined in

[api_types.ts:573](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L573)

___

### sync

• `Readonly` **sync**: `Sync`

Information about state of the current sync.

#### Overrides

[ExecutionContext](ExecutionContext.md).[sync](ExecutionContext.md#sync)

#### Defined in

[api_types.ts:588](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L588)

___

### temporaryBlobStorage

• `Readonly` **temporaryBlobStorage**: [`TemporaryBlobStorage`](TemporaryBlobStorage.md)

A utility to fetch and store files and images that either require the pack user's authentication
or are too large to return inline. See [TemporaryBlobStorage](TemporaryBlobStorage.md).

#### Inherited from

[ExecutionContext](ExecutionContext.md).[temporaryBlobStorage](ExecutionContext.md#temporaryblobstorage)

#### Defined in

[api_types.ts:549](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L549)

___

### timezone

• `Readonly` **timezone**: `string`

The timezone of the doc from which this formula was invoked.

#### Inherited from

[ExecutionContext](ExecutionContext.md).[timezone](ExecutionContext.md#timezone)

#### Defined in

[api_types.ts:566](https://github.com/coda/packs-sdk/blob/main/api_types.ts#L566)