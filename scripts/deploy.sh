#!/bin/bash

# Deployment script for Lerni Web App to S3
set -e

echo "🚀 Starting deployment process..."

# Check if required environment variables are set
if [ -z "$S3_BUCKET_NAME" ]; then
    echo "❌ Error: S3_BUCKET_NAME environment variable is not set"
    exit 1
fi

if [ -z "$AWS_REGION" ]; then
    echo "❌ Error: AWS_REGION environment variable is not set"
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci

echo "🔍 Running linter..."
npm run lint

echo "🏗️ Building application..."
export CI=false
export GENERATE_SOURCEMAP=false

# Check if REACT_APP_BASE_URL is set
if [ -z "$REACT_APP_BASE_URL" ]; then
    echo "⚠️ Warning: REACT_APP_BASE_URL environment variable is not set"
    echo "The application may not work correctly without the base URL"
else
    echo "🌐 Using base URL: $REACT_APP_BASE_URL"
    export REACT_APP_BASE_URL=$REACT_APP_BASE_URL
fi

npm run build

echo "📊 Build completed. Checking build directory..."
if [ ! -d "build" ]; then
    echo "❌ Error: Build directory not found"
    exit 1
fi

echo "📁 Build directory contents:"
ls -la build/

echo "☁️ Syncing files to S3 bucket: $S3_BUCKET_NAME"
aws s3 sync build/ s3://$S3_BUCKET_NAME \
    --delete \
    --cache-control max-age=31536000,public \
    --exclude "*.html" \
    --exclude "service-worker.js" \
    --exclude "manifest.json"

echo "🌐 Uploading HTML files with no-cache headers..."
aws s3 sync build/ s3://$S3_BUCKET_NAME \
    --delete \
    --cache-control no-cache,no-store,must-revalidate \
    --include "*.html" \
    --include "service-worker.js" \
    --include "manifest.json"

# Set proper content types
echo "📄 Setting content types..."
aws s3 cp s3://$S3_BUCKET_NAME s3://$S3_BUCKET_NAME \
    --recursive \
    --metadata-directive REPLACE \
    --cache-control max-age=31536000,public \
    --exclude "*.html" \
    --exclude "service-worker.js" \
    --exclude "manifest.json"

# Invalidate CloudFront if distribution ID is provided
if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront distribution: $CLOUDFRONT_DISTRIBUTION_ID"
    aws cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
        --paths "/*"
    echo "✅ CloudFront invalidation initiated"
else
    echo "ℹ️ No CloudFront distribution ID provided, skipping invalidation"
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo "📦 Files deployed to: s3://$S3_BUCKET_NAME"
echo "🌐 Application should be available at your domain"
echo "" 