# PhigrosApi.LocalSaveApi

All URIs are relative to */*

Method | HTTP request | Description
------------- | ------------- | -------------
[**phiApiLocalSaveDecryptNewPost**](LocalSaveApi.md#phiApiLocalSaveDecryptNewPost) | **POST** /phiApi/LocalSave/DecryptNew | 

<a name="phiApiLocalSaveDecryptNewPost"></a>
# **phiApiLocalSaveDecryptNewPost**
> &#x27;String&#x27; phiApiLocalSaveDecryptNewPost(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.LocalSaveApi();
let opts = { 
  'body': "body_example" // String | 
};
apiInstance.phiApiLocalSaveDecryptNewPost(opts, (error, data, response) => {
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
 **body** | [**String**](String.md)|  | [optional] 

### Return type

**&#x27;String&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: text/plain
 - **Accept**: text/plain, application/json, text/json

