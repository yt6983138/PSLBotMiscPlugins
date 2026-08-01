
# SaveData


## Properties

Name | Type
------------ | -------------
`progress` | [GameProgress](GameProgress.md)
`settings` | [GameSettings](GameSettings.md)
`gameUserInfo` | [GameUserInfo](GameUserInfo.md)
`playerInfo` | [PlayerInfo](PlayerInfo.md)
`summary` | [Summary](Summary.md)

## Example

```typescript
import type { SaveData } from ''

// TODO: Update the object below with actual values
const example = {
  "progress": null,
  "settings": null,
  "gameUserInfo": null,
  "playerInfo": null,
  "summary": null,
} satisfies SaveData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SaveData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


