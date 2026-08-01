
# Summary


## Properties

Name | Type
------------ | -------------
`saveVersion` | [ChallengeLevel](ChallengeLevel.md)
`gameVersion` | [PhiApiCloudSaveGetSaveDataPostIndexParameter](PhiApiCloudSaveGetSaveDataPostIndexParameter.md)
`rks` | [CompleteScoreChartConstant](CompleteScoreChartConstant.md)
`challenge` | [Challenge](Challenge.md)
`avatar` | string
`ezPlayRecord` | [PlayCountSummary](PlayCountSummary.md)
`hdPlayRecord` | [PlayCountSummary](PlayCountSummary.md)
`inPlayRecord` | [PlayCountSummary](PlayCountSummary.md)
`atPlayRecord` | [PlayCountSummary](PlayCountSummary.md)

## Example

```typescript
import type { Summary } from ''

// TODO: Update the object below with actual values
const example = {
  "saveVersion": null,
  "gameVersion": null,
  "rks": null,
  "challenge": null,
  "avatar": null,
  "ezPlayRecord": null,
  "hdPlayRecord": null,
  "inPlayRecord": null,
  "atPlayRecord": null,
} satisfies Summary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Summary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


