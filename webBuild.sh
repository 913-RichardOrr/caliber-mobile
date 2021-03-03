npm install
expo build:web
#upload to s3, you must have the profile set up as caliber.
aws s3 --profile caliber sync web-build s3://calibermobile.revaturelabs.com