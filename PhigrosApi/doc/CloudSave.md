# POST /phiApi/CloudSave/GetSaveIndexes
## Requirements
### Query
isInternational=[true/false], depends on player save server location.
### Headers
Content-Type: text/plain
### Body
User's phigros token.
## Responses
### Success
```
< HTTP/1.1 200 OK
< Content-Type: application/json; charset=utf-8
< Date: Sat, 10 Aug 2024 13:22:37 GMT
< Server: Kestrel
< Transfer-Encoding: chunked
<
{
    "success": true,
    "data": [
        {
            "modificationTime": "2025-07-13T01:39:07.313Z",
            "index": 0
        },
        ...
    ]
}
```
### Failure
```
< HTTP/1.1 422 Unprocessable Entity
< Content-Type: application/json; charset=utf-8
< Date: Sat, 10 Aug 2024 03:32:58 GMT
< Server: Kestrel
< Transfer-Encoding: chunked
<
{
    "success": false,
    "data": {
        "code": [error code in int],
        "codeName": [error code name],
        "message": [error message]
    }
}
```
# POST /phiApi/CloudSave/GetSaveData
## Requirements
### Query
isInternational=[true/false], depends on player save server location. <br/>
index=[0..], this option is the index got from POST /api/CloudSave/GetSaveIndexes. 0 is always latest and the default value.
### Headers
Content-Type: text/plain
### Body
User's phigros token.
## Responses
### Success
```
< HTTP/1.1 200 OK
< Content-Type: application/json; charset=utf-8
< Date: Sat, 10 Aug 2024 13:31:55 GMT
< Server: Kestrel
< Transfer-Encoding: chunked
<
{
  "success": true,
  "data": {
    "progress": {
      "version": 4,
      "isFirstRun": true,
      "legacyChapterFinished": false,
      "alreadyShowCollectionTip": true,
      "alreadyShowAutoUnlockINTip": false,
      "completed": "",
      "songUpdateInfo": 4,
      "challengeModeRank": {
        "rank": 0,
        "level": 0,
        "done": false
      },
      "money": {
        "kiB": 0,
        "miB": 32,
        "giB": 0,
        "tiB": 0,
        "piB": 0
      },
      "unlockFlagOfSpasmodic": 0,
      "unlockFlagOfIgallta": 0,
      "unlockFlagOfRrharil": 0,
      "flagOfSongRecordKey": 0,
      "node2": {
        "randomVersionUnlocked": 0,
        "node3": {
          "chapter8UnlockBegin": false,
          "chapter8UnlockSecondPhase": false,
          "chapter8Passed": false,
          "chapter8SongUnlockFlag": 0,
          "node4": {
            "flagOfSongRecordKeyTakumi": 0
          }
        }
      }
    },
    "settings": {
      "version": 1,
      "chordSupport": true,
      "fcApIndicatorOn": false,
      "enableHitSound": true,
      "lowResolutionModeOn": false,
      "deviceName": "Galaxy S21 5G",
      "backgroundBrightness": 0.75,
      "musicVolume": 1,
      "effectVolume": 1,
      "hitSoundVolume": 1,
      "soundOffset": 0.09,
      "noteScale": 1
    },
    "gameUserInfo": {
      "version": 1,
      "showUserId": false,
      "intro": "There is a self-introduction, write something just like:\r\nTwitter: @Phigros_PGS\r\nYouTube: Pigeon Games\r\n\r\nHope you have fun in Phigros.\r\nBest regards,\r\nPigeon Games",
      "avatarId": "Introduction",
      "backgroundId": "Introduction"
    },
    "userInfo": {
      "nickName": "static_void3",
      "userName": "2qpwxg81m3uxku0q94tp9vzlo",
      "creationTime": "2025-07-13T01:28:09.067Z",
      "modificationTime": "2025-07-16T07:26:42.298Z"
    },
    "summary": {
      "saveVersion": 6,
      "gameVersion": 129,
      "challenge": {
        "rank": 0,
        "level": 0,
        "done": false
      },
      "avatar": "\u0000",
      "clears": [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    }
  }
}
```
### Failure
```
< HTTP/1.1 422 Unprocessable Entity
< Content-Type: application/json; charset=utf-8
< Date: Sat, 10 Aug 2024 03:32:58 GMT
< Server: Kestrel
< Transfer-Encoding: chunked
<
{
    "success": false,
    "data": {
        "code": [error code in int],
        "codeName": [error code name],
        "message": [error message]
    }
}
```
# POST /phiApi/CloudSave/GetRecords
## Requirements
### Query
isInternational=[true/false], depends on player save server location. <br/>
index=[0..], this option is the index got from POST /api/CloudSave/GetSaveIndexes. 0 is always latest and the default value.
### Headers
Content-Type: text/plain
### Body
User's phigros token.
## Responses
### Success
```
< HTTP/1.1 200 OK
< Content-Type: application/json; charset=utf-8
< Date: Sat, 10 Aug 2024 13:32:39 GMT
< Server: Kestrel
< Transfer-Encoding: chunked
<
{
  "success": true,
  "data": {
    "version": 1,
    "records": [
      {
        "score": 882009,
        "accuracy": 95.31896209716797,
        "chartConstant": 11.5,
        "id": "ENERGYSYNERGYMATRIX.Tanchiky",
        "difficulty": 1,
        "status": 5,
        "rks": 9.231908692749615
      },
      ...
    ],
    "summary": "BgAA1I6dPoEBAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAA=="
  }
}
```
### Failure
```
< HTTP/1.1 422 Unprocessable Entity
< Content-Type: application/json; charset=utf-8
< Date: Sat, 10 Aug 2024 03:32:58 GMT
< Server: Kestrel
< Transfer-Encoding: chunked
<
{
    "success": false,
    "data": {
        "code": [error code in int],
        "codeName": [error code name],
        "message": [error message]
    }
}
```
# POST /phiApi/CloudSave/GetDecryptedZip
## Requirements
### Query
isInternational=[true/false], depends on player save server location. <br/>
index=[0..], this option is the index got from POST /api/CloudSave/GetSaveIndexes. 0 is always latest and the default value.
### Headers
Content-Type: text/plain
### Body
User's phigros token.
## Responses
### Success
```
< HTTP/1.1 200 OK
< Content-Length: 10369
< Content-Type: application/zip
< Date: Sat, 10 Aug 2024 13:34:23 GMT
< Server: Kestrel
<
[Zip binary output]
```
The zip contains following files: user, settings, gameProgress, gameRecord, and gameKey.
### Failure
```
< HTTP/1.1 422 Unprocessable Entity
< Content-Type: application/json; charset=utf-8
< Date: Sat, 10 Aug 2024 03:32:58 GMT
< Server: Kestrel
< Transfer-Encoding: chunked
<
{
    "success": false,
    "data": {
        "code": [error code in int],
        "codeName": [error code name],
        "message": [error message]
    }
}
```