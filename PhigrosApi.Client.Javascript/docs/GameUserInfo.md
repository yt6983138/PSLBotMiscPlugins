
# GameUserInfo


## Properties

Name | Type
------------ | -------------
`version` | [ChallengeLevel](ChallengeLevel.md)
`showUserId` | boolean
`intro` | string
`avatarId` | string
`backgroundId` | string

## Example

```typescript
import type { GameUserInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "showUserId": null,
  "intro": null,
  "avatarId": null,
  "backgroundId": null,
} satisfies GameUserInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GameUserInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


