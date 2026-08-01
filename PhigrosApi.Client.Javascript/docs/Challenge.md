
# Challenge


## Properties

Name | Type
------------ | -------------
`rawCode` | [ChallengeRawCode](ChallengeRawCode.md)
`rank` | number
`level` | [ChallengeLevel](ChallengeLevel.md)
`hasEverDone` | boolean

## Example

```typescript
import type { Challenge } from ''

// TODO: Update the object below with actual values
const example = {
  "rawCode": null,
  "rank": null,
  "level": null,
  "hasEverDone": null,
} satisfies Challenge

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Challenge
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


