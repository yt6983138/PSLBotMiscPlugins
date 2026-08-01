
# GameProgress


## Properties

Name | Type
------------ | -------------
`version` | [ChallengeLevel](ChallengeLevel.md)
`isFirstRun` | boolean
`legacyChapterFinished` | boolean
`alreadyShowCollectionTip` | boolean
`alreadyShowAutoUnlockINTip` | boolean
`gameCompleted` | string
`songUpdateInfo` | [PhiApiCloudSaveGetSaveDataPostIndexParameter](PhiApiCloudSaveGetSaveDataPostIndexParameter.md)
`challengeModeRank` | [Challenge](Challenge.md)
`money` | [Money](Money.md)
`unlockFlagOfSpasmodic` | number
`unlockFlagOfIgallta` | number
`unlockFlagOfRrharil` | number
`flagOfSongRecordKey` | number
`node2` | [GameProgressNodeVersion2](GameProgressNodeVersion2.md)

## Example

```typescript
import type { GameProgress } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "isFirstRun": null,
  "legacyChapterFinished": null,
  "alreadyShowCollectionTip": null,
  "alreadyShowAutoUnlockINTip": null,
  "gameCompleted": null,
  "songUpdateInfo": null,
  "challengeModeRank": null,
  "money": null,
  "unlockFlagOfSpasmodic": null,
  "unlockFlagOfIgallta": null,
  "unlockFlagOfRrharil": null,
  "flagOfSongRecordKey": null,
  "node2": null,
} satisfies GameProgress

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GameProgress
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


