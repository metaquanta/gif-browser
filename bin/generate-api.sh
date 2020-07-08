#!/usr/bin/bash

SWAGGER_URI=https://api.apis.guru/v2/specs/giphy.com/1.0/swagger.json
SWAGGER_FILE=lib/giphy.com-swagger.json
GENERATED=src/generated/giphy

curl "${SWAGGER_URI}" | jq '.definitions.Gif.properties.images.properties=(.definitions.Gif.properties.images.properties | map_values(.allOf[0]))' > $SWAGGER_FILE
openapi-generator generate -i $SWAGGER_FILE -g typescript-fetch -o $GENERATED --additional-properties=typescriptThreePlus=true
