# LocalSaveApi

All URIs are relative to *http://localhost:5000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**phiApiLocalSaveDecryptNewPost**](LocalSaveApi.md#phiapilocalsavedecryptnewpost) | **POST** /phiApi/LocalSave/DecryptNew |  |



## phiApiLocalSaveDecryptNewPost

> ResponseOfstring phiApiLocalSaveDecryptNewPost(body)



### Example

```ts
import {
  Configuration,
  LocalSaveApi,
} from '';
import type { PhiApiLocalSaveDecryptNewPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LocalSaveApi();

  const body = {
    // string
    body: body_example,
  } satisfies PhiApiLocalSaveDecryptNewPostRequest;

  try {
    const data = await api.phiApiLocalSaveDecryptNewPost(body);
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

### Return type

[**ResponseOfstring**](ResponseOfstring.md)

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

