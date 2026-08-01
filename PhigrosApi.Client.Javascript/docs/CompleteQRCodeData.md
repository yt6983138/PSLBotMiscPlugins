
# CompleteQRCodeData


## Properties

Name | Type
------------ | -------------
`deviceID` | string
`deviceCode` | string
`expiresInSeconds` | [PhiApiCloudSaveGetSaveDataPostIndexParameter](PhiApiCloudSaveGetSaveDataPostIndexParameter.md)
`url` | string
`interval` | [PhiApiCloudSaveGetSaveDataPostIndexParameter](PhiApiCloudSaveGetSaveDataPostIndexParameter.md)

## Example

```typescript
import type { CompleteQRCodeData } from ''

// TODO: Update the object below with actual values
const example = {
  "deviceID": null,
  "deviceCode": null,
  "expiresInSeconds": null,
  "url": null,
  "interval": null,
} satisfies CompleteQRCodeData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CompleteQRCodeData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


