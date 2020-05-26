# Braille-Translator 
### API Endpoints
```
Request
GET  /languages

POST /translate
[
  {
    "text": "Go to department B",
    "dest": "hi",
  }
]
Response:
{
  "result": {
    "dest": "hi",
    "src": "en",
    "text": "Go to department B",
    "translated": "विभाग बी पर जाएं"
  }
}
```
