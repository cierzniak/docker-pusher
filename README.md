# 🐳 Docker Webhook

Docker Webhook allows to update container when new image is pushed to registry.

## Usage

cURL example:

```shell
$ curl --request POST \
  --url https://docker.zsl.gda.pl/webhook/services \
  --header 'Content-Type: application/json' \
  --header 'X-Api-Key: my-s3cret-key' \
  --data '{"repository": "username/repository",
    "project": "my-project",
    "images": ["ghcr.io/username/repository:latest"]}'
```
