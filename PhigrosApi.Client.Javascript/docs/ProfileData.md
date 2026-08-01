
# ProfileData


## Properties

Name | Type
------------ | -------------
`openid` | string
`unionid` | string
`name` | string
`gender` | string
`avatar` | string

## Example

```typescript
import type { ProfileData } from ''

// TODO: Update the object below with actual values
const example = {
  "openid": null,
  "unionid": null,
  "name": null,
  "gender": null,
  "avatar": null,
} satisfies ProfileData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProfileData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


