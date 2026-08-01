
# SongScore


## Properties

Name | Type
------------ | -------------
`score` | [PhiApiCloudSaveGetSaveDataPostIndexParameter](PhiApiCloudSaveGetSaveDataPostIndexParameter.md)
`accuracy` | [CompleteScoreChartConstant](CompleteScoreChartConstant.md)
`id` | string
`difficulty` | number
`status` | number

## Example

```typescript
import type { SongScore } from ''

// TODO: Update the object below with actual values
const example = {
  "score": null,
  "accuracy": null,
  "id": null,
  "difficulty": null,
  "status": null,
} satisfies SongScore

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SongScore
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


