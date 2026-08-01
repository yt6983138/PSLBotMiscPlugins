# LoginQrCodeApi

All URIs are relative to *http://localhost:5000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**phiApiLoginQrCodeCheckQRCodePost**](LoginQrCodeApi.md#phiapiloginqrcodecheckqrcodepost) | **POST** /phiApi/LoginQrCode/CheckQRCode |  |
| [**phiApiLoginQrCodeGetNewQRCodeGet**](LoginQrCodeApi.md#phiapiloginqrcodegetnewqrcodeget) | **GET** /phiApi/LoginQrCode/GetNewQRCode |  |
| [**phiApiLoginQrCodeGetPhigrosTokenPost**](LoginQrCodeApi.md#phiapiloginqrcodegetphigrostokenpost) | **POST** /phiApi/LoginQrCode/GetPhigrosToken |  |
| [**phiApiLoginQrCodeGetTapTapProfilePost**](LoginQrCodeApi.md#phiapiloginqrcodegettaptapprofilepost) | **POST** /phiApi/LoginQrCode/GetTapTapProfile |  |



## phiApiLoginQrCodeCheckQRCodePost

> ResponseOfTapTapTokenData phiApiLoginQrCodeCheckQRCodePost(noReadOfCompleteQRCodeData, useChinaEndpoint)



### Example

```ts
import {
  Configuration,
  LoginQrCodeApi,
} from '';
import type { PhiApiLoginQrCodeCheckQRCodePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LoginQrCodeApi();

  const body = {
    // NoReadOfCompleteQRCodeData
    noReadOfCompleteQRCodeData: ...,
    // boolean (optional)
    useChinaEndpoint: true,
  } satisfies PhiApiLoginQrCodeCheckQRCodePostRequest;

  try {
    const data = await api.phiApiLoginQrCodeCheckQRCodePost(body);
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
| **noReadOfCompleteQRCodeData** | [NoReadOfCompleteQRCodeData](NoReadOfCompleteQRCodeData.md) |  | |
| **useChinaEndpoint** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ResponseOfTapTapTokenData**](ResponseOfTapTapTokenData.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## phiApiLoginQrCodeGetNewQRCodeGet

> ResponseOfCompleteQRCodeData phiApiLoginQrCodeGetNewQRCodeGet(useChinaEndpoint)



### Example

```ts
import {
  Configuration,
  LoginQrCodeApi,
} from '';
import type { PhiApiLoginQrCodeGetNewQRCodeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LoginQrCodeApi();

  const body = {
    // boolean (optional)
    useChinaEndpoint: true,
  } satisfies PhiApiLoginQrCodeGetNewQRCodeGetRequest;

  try {
    const data = await api.phiApiLoginQrCodeGetNewQRCodeGet(body);
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
| **useChinaEndpoint** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ResponseOfCompleteQRCodeData**](ResponseOfCompleteQRCodeData.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## phiApiLoginQrCodeGetPhigrosTokenPost

> ResponseOfstring phiApiLoginQrCodeGetPhigrosTokenPost(noReadOfTapTapTokenData, useChinaEndpoint)



### Example

```ts
import {
  Configuration,
  LoginQrCodeApi,
} from '';
import type { PhiApiLoginQrCodeGetPhigrosTokenPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LoginQrCodeApi();

  const body = {
    // NoReadOfTapTapTokenData
    noReadOfTapTapTokenData: ...,
    // boolean (optional)
    useChinaEndpoint: true,
  } satisfies PhiApiLoginQrCodeGetPhigrosTokenPostRequest;

  try {
    const data = await api.phiApiLoginQrCodeGetPhigrosTokenPost(body);
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
| **noReadOfTapTapTokenData** | [NoReadOfTapTapTokenData](NoReadOfTapTapTokenData.md) |  | |
| **useChinaEndpoint** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ResponseOfstring**](ResponseOfstring.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## phiApiLoginQrCodeGetTapTapProfilePost

> ResponseOfTapTapProfileData phiApiLoginQrCodeGetTapTapProfilePost(noReadOfTapTapTokenData, useChinaEndpoint)



### Example

```ts
import {
  Configuration,
  LoginQrCodeApi,
} from '';
import type { PhiApiLoginQrCodeGetTapTapProfilePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LoginQrCodeApi();

  const body = {
    // NoReadOfTapTapTokenData
    noReadOfTapTapTokenData: ...,
    // boolean (optional)
    useChinaEndpoint: true,
  } satisfies PhiApiLoginQrCodeGetTapTapProfilePostRequest;

  try {
    const data = await api.phiApiLoginQrCodeGetTapTapProfilePost(body);
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
| **noReadOfTapTapTokenData** | [NoReadOfTapTapTokenData](NoReadOfTapTapTokenData.md) |  | |
| **useChinaEndpoint** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ResponseOfTapTapProfileData**](ResponseOfTapTapProfileData.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

