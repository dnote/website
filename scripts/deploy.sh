#!/bin/bash
# Deploy the website.
# Env vars:
# * CLOUDFRONT_ID - CloudFront distribution ID
# * BUCKET_NAME - S3 bucket name
set -eux

dir=$(dirname "${BASH_SOURCE[0]}")
basePath="$dir/.."

if [ -z "${CLOUDFRONT_ID:-}" ]; then
  echo "Error: CLOUDFRONT_ID environment variable is not set"
  exit 1
fi

if [ -z "${BUCKET_NAME:-}" ]; then
  echo "Error: BUCKET_NAME environment variable is not set"
  exit 1
fi

# build
hugo --minify

# Add the installation script
echo "Fetching install script..."
curl -fsSL https://raw.githubusercontent.com/dnote/dnote/refs/heads/master/install.sh -o public/install

# upload
aws s3 sync public "$BUCKET_NAME" \
  --delete \
  --exclude "js/*" \
  --exclude "sass/*" \
  --exclude "fonts/*" \
  --acl=public-read

aws s3 sync public/js "$BUCKET_NAME/js" \
  --delete \
  --cache-control "max-age=31536000,public" \
  --acl=public-read
aws s3 sync public/sass "$BUCKET_NAME/sass" \
  --delete \
  --cache-control "max-age=31536000,public"  \
  --acl=public-read
aws s3 sync public/fonts "$BUCKET_NAME/fonts" \
  --delete \
  --cache-control "max-age=31536000,public" \
  --acl=public-read

# invalidate cdn cache
aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_ID" --paths "/*"
