
# TokenData


## Properties

Name | Type
------------ | -------------
`kid` | string
`accessToken` | string
`tokenType` | string
`macKey` | string
`macAlgorithm` | string
`scope` | string

## Example

```typescript
import type { TokenData } from ''

// TODO: Update the object below with actual values
const example = {
  "kid": null,
  "accessToken": null,
  "tokenType": null,
  "macKey": null,
  "macAlgorithm": null,
  "scope": null,
} satisfies TokenData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TokenData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


