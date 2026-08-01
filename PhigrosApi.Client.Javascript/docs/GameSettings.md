
# GameSettings


## Properties

Name | Type
------------ | -------------
`version` | [ChallengeLevel](ChallengeLevel.md)
`chordSupport` | boolean
`fcApIndicatorOn` | boolean
`enableHitSound` | boolean
`lowResolutionModeOn` | boolean
`deviceName` | string
`backgroundBrightness` | [CompleteScoreChartConstant](CompleteScoreChartConstant.md)
`musicVolume` | [CompleteScoreChartConstant](CompleteScoreChartConstant.md)
`effectVolume` | [CompleteScoreChartConstant](CompleteScoreChartConstant.md)
`hitSoundVolume` | [CompleteScoreChartConstant](CompleteScoreChartConstant.md)
`soundOffset` | [CompleteScoreChartConstant](CompleteScoreChartConstant.md)
`noteScale` | [CompleteScoreChartConstant](CompleteScoreChartConstant.md)

## Example

```typescript
import type { GameSettings } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "chordSupport": null,
  "fcApIndicatorOn": null,
  "enableHitSound": null,
  "lowResolutionModeOn": null,
  "deviceName": null,
  "backgroundBrightness": null,
  "musicVolume": null,
  "effectVolume": null,
  "hitSoundVolume": null,
  "soundOffset": null,
  "noteScale": null,
} satisfies GameSettings

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GameSettings
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


