# PhigrosApi.CloudSaveApi

All URIs are relative to */*

Method | HTTP request | Description
------------- | ------------- | -------------
[**phiApiCloudSaveGetDecryptedZipPost**](CloudSaveApi.md#phiApiCloudSaveGetDecryptedZipPost) | **POST** /phiApi/CloudSave/GetDecryptedZip | 
[**phiApiCloudSaveGetRecordsPost**](CloudSaveApi.md#phiApiCloudSaveGetRecordsPost) | **POST** /phiApi/CloudSave/GetRecords | 
[**phiApiCloudSaveGetSaveDataPost**](CloudSaveApi.md#phiApiCloudSaveGetSaveDataPost) | **POST** /phiApi/CloudSave/GetSaveData | 
[**phiApiCloudSaveGetSaveIndexesPost**](CloudSaveApi.md#phiApiCloudSaveGetSaveIndexesPost) | **POST** /phiApi/CloudSave/GetSaveIndexes | 

<a name="phiApiCloudSaveGetDecryptedZipPost"></a>
# **phiApiCloudSaveGetDecryptedZipPost**
> &#x27;Blob&#x27; phiApiCloudSaveGetDecryptedZipPost(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.CloudSaveApi();
let opts = { 
  'body': "body_example", // String | 
  'index': 56, // Number | 
  'isInternational': true // Boolean | 
};
apiInstance.phiApiCloudSaveGetDecryptedZipPost(opts, (error, data, response) => {
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
 **index** | **Number**|  | [optional] 
 **isInternational** | **Boolean**|  | [optional] 

### Return type

**&#x27;Blob&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: text/plain
 - **Accept**: application/zip

<a name="phiApiCloudSaveGetRecordsPost"></a>
# **phiApiCloudSaveGetRecordsPost**
> GameRecordResponse phiApiCloudSaveGetRecordsPost(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.CloudSaveApi();
let opts = { 
  'body': "body_example", // String | 
  'index': 56, // Number | 
  'isInternational': true // Boolean | 
};
apiInstance.phiApiCloudSaveGetRecordsPost(opts, (error, data, response) => {
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
 **index** | **Number**|  | [optional] 
 **isInternational** | **Boolean**|  | [optional] 

### Return type

[**GameRecordResponse**](GameRecordResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: text/plain
 - **Accept**: text/plain, application/json, text/json

<a name="phiApiCloudSaveGetSaveDataPost"></a>
# **phiApiCloudSaveGetSaveDataPost**
> SaveDataResponse phiApiCloudSaveGetSaveDataPost(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.CloudSaveApi();
let opts = { 
  'body': "body_example", // String | 
  'index': 56, // Number | 
  'isInternational': true // Boolean | 
};
apiInstance.phiApiCloudSaveGetSaveDataPost(opts, (error, data, response) => {
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
 **index** | **Number**|  | [optional] 
 **isInternational** | **Boolean**|  | [optional] 

### Return type

[**SaveDataResponse**](SaveDataResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: text/plain
 - **Accept**: text/plain, application/json, text/json

<a name="phiApiCloudSaveGetSaveIndexesPost"></a>
# **phiApiCloudSaveGetSaveIndexesPost**
> SaveTimeIndexListResponse phiApiCloudSaveGetSaveIndexesPost(opts)



### Example
```javascript
import {PhigrosApi} from 'phigros_api';

let apiInstance = new PhigrosApi.CloudSaveApi();
let opts = { 
  'body': "body_example", // String | 
  'isInternational': true // Boolean | 
};
apiInstance.phiApiCloudSaveGetSaveIndexesPost(opts, (error, data, response) => {
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
 **isInternational** | **Boolean**|  | [optional] 

### Return type

[**SaveTimeIndexListResponse**](SaveTimeIndexListResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: text/plain
 - **Accept**: text/plain, application/json, text/json

