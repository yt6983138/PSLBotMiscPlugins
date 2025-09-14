# PhigrosApi.LoginQrCodeApi

All URIs are relative to */*

Method | HTTP request | Description
------------- | ------------- | -------------
[**phiApiLoginQrCodeCheckQRCodePost**](LoginQrCodeApi.md#phiApiLoginQrCodeCheckQRCodePost) | **POST** /phiApi/LoginQrCode/CheckQRCode | 
[**phiApiLoginQrCodeGetNewQRCodeGet**](LoginQrCodeApi.md#phiApiLoginQrCodeGetNewQRCodeGet) | **GET** /phiApi/LoginQrCode/GetNewQRCode | 
[**phiApiLoginQrCodeGetPhigrosTokenPost**](LoginQrCodeApi.md#phiApiLoginQrCodeGetPhigrosTokenPost) | **POST** /phiApi/LoginQrCode/GetPhigrosToken | 
[**phiApiLoginQrCodeGetTapTapProfilePost**](LoginQrCodeApi.md#phiApiLoginQrCodeGetTapTapProfilePost) | **POST** /phiApi/LoginQrCode/GetTapTapProfile | 

<a name="phiApiLoginQrCodeCheckQRCodePost"></a>
# **phiApiLoginQrCodeCheckQRCodePost**
> TapTapTokenDataResponse phiApiLoginQrCodeCheckQRCodePost(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.LoginQrCodeApi();
let opts = { 
  'body': new PhigrosApi.CompleteQRCodeData(), // CompleteQRCodeData | 
  'useChinaEndpoint': true // Boolean | 
};
apiInstance.phiApiLoginQrCodeCheckQRCodePost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**CompleteQRCodeData**](CompleteQRCodeData.md)|  | [optional] 
 **useChinaEndpoint** | **Boolean**|  | [optional] 

### Return type

[**TapTapTokenDataResponse**](TapTapTokenDataResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="phiApiLoginQrCodeGetNewQRCodeGet"></a>
# **phiApiLoginQrCodeGetNewQRCodeGet**
> CompleteQRCodeDataResponse phiApiLoginQrCodeGetNewQRCodeGet(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.LoginQrCodeApi();
let opts = { 
  'useChinaEndpoint': true // Boolean | 
};
apiInstance.phiApiLoginQrCodeGetNewQRCodeGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **useChinaEndpoint** | **Boolean**|  | [optional] 

### Return type

[**CompleteQRCodeDataResponse**](CompleteQRCodeDataResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json

<a name="phiApiLoginQrCodeGetPhigrosTokenPost"></a>
# **phiApiLoginQrCodeGetPhigrosTokenPost**
> StringResponse phiApiLoginQrCodeGetPhigrosTokenPost(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.LoginQrCodeApi();
let opts = { 
  'body': new PhigrosApi.TapTapTokenData(), // TapTapTokenData | 
  'useChinaEndpoint': true // Boolean | 
};
apiInstance.phiApiLoginQrCodeGetPhigrosTokenPost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**TapTapTokenData**](TapTapTokenData.md)|  | [optional] 
 **useChinaEndpoint** | **Boolean**|  | [optional] 

### Return type

[**StringResponse**](StringResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

<a name="phiApiLoginQrCodeGetTapTapProfilePost"></a>
# **phiApiLoginQrCodeGetTapTapProfilePost**
> TapTapProfileDataResponse phiApiLoginQrCodeGetTapTapProfilePost(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.LoginQrCodeApi();
let opts = { 
  'body': new PhigrosApi.TapTapTokenData(), // TapTapTokenData | 
  'useChinaEndpoint': true // Boolean | 
};
apiInstance.phiApiLoginQrCodeGetTapTapProfilePost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**TapTapTokenData**](TapTapTokenData.md)|  | [optional] 
 **useChinaEndpoint** | **Boolean**|  | [optional] 

### Return type

[**TapTapProfileDataResponse**](TapTapProfileDataResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/_*+json
 - **Accept**: text/plain, application/json, text/json

