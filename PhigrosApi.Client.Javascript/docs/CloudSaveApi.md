# CloudSaveApi

All URIs are relative to *http://localhost:5000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**phiApiCloudSaveGetDecryptedZipPost**](CloudSaveApi.md#phiapicloudsavegetdecryptedzippost) | **POST** /phiApi/CloudSave/GetDecryptedZip |  |
| [**phiApiCloudSaveGetRecordsPost**](CloudSaveApi.md#phiapicloudsavegetrecordspost) | **POST** /phiApi/CloudSave/GetRecords |  |
| [**phiApiCloudSaveGetSaveDataPost**](CloudSaveApi.md#phiapicloudsavegetsavedatapost) | **POST** /phiApi/CloudSave/GetSaveData |  |
| [**phiApiCloudSaveGetSaveIndexesPost**](CloudSaveApi.md#phiapicloudsavegetsaveindexespost) | **POST** /phiApi/CloudSave/GetSaveIndexes |  |



## phiApiCloudSaveGetDecryptedZipPost

> FileResult phiApiCloudSaveGetDecryptedZipPost(body, index, isInternational)



### Example

```ts
import {
  Configuration,
  CloudSaveApi,
} from '';
import type { PhiApiCloudSaveGetDecryptedZipPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CloudSaveApi();

  const body = {
    // string
    body: body_example,
    // PhiApiCloudSaveGetSaveDataPostIndexParameter (optional)
    index: 56,
    // boolean (optional)
    isInternational: true,
  } satisfies PhiApiCloudSaveGetDecryptedZipPostRequest;

  try {
    const data = await api.phiApiCloudSaveGetDecryptedZipPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **body** | `string` |  | |
| **index** | [](.md) |  | [Optional] [Defaults to `undefined`] |
| **isInternational** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**FileResult**](FileResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `text/plain`
- **Accept**: `application/zip`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## phiApiCloudSaveGetRecordsPost

> ResponseOfListOfCompleteScore phiApiCloudSaveGetRecordsPost(body, index, isInternational)



### Example

```ts
import {
  Configuration,
  CloudSaveApi,
} from '';
import type { PhiApiCloudSaveGetRecordsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CloudSaveApi();

  const body = {
    // string
    body: body_example,
    // PhiApiCloudSaveGetSaveDataPostIndexParameter (optional)
    index: 56,
    // boolean (optional)
    isInternational: true,
  } satisfies PhiApiCloudSaveGetRecordsPostRequest;

  try {
    const data = await api.phiApiCloudSaveGetRecordsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **body** | `string` |  | |
| **index** | [](.md) |  | [Optional] [Defaults to `undefined`] |
| **isInternational** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ResponseOfListOfCompleteScore**](ResponseOfListOfCompleteScore.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `text/plain`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## phiApiCloudSaveGetSaveDataPost

> ResponseOfSaveData phiApiCloudSaveGetSaveDataPost(body, index, isInternational)



### Example

```ts
import {
  Configuration,
  CloudSaveApi,
} from '';
import type { PhiApiCloudSaveGetSaveDataPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CloudSaveApi();

  const body = {
    // string
    body: body_example,
    // PhiApiCloudSaveGetSaveDataPostIndexParameter (optional)
    index: 56,
    // boolean (optional)
    isInternational: true,
  } satisfies PhiApiCloudSaveGetSaveDataPostRequest;

  try {
    const data = await api.phiApiCloudSaveGetSaveDataPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **body** | `string` |  | |
| **index** | [](.md) |  | [Optional] [Defaults to `undefined`] |
| **isInternational** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ResponseOfSaveData**](ResponseOfSaveData.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `text/plain`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## phiApiCloudSaveGetSaveIndexesPost

> ResponseOfListOfSaveTimeIndex phiApiCloudSaveGetSaveIndexesPost(body, isInternational)



### Example

```ts
import {
  Configuration,
  CloudSaveApi,
} from '';
import type { PhiApiCloudSaveGetSaveIndexesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CloudSaveApi();

  const body = {
    // string
    body: body_example,
    // boolean (optional)
    isInternational: true,
  } satisfies PhiApiCloudSaveGetSaveIndexesPostRequest;

  try {
    const data = await api.phiApiCloudSaveGetSaveIndexesPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **body** | `string` |  | |
| **isInternational** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ResponseOfListOfSaveTimeIndex**](ResponseOfListOfSaveTimeIndex.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `text/plain`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

