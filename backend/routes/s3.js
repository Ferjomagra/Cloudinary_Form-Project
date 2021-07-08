require('dotenv').config();
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS
const setLoad = process.env.AWS_SDK_LOAD_CONFIG

const s3 = new AWS.S3({
	bucketRegion,
	accessKey,
	secretAccessKey
})

function generateUploadURL(){
	const imageName= "random image name"

	const params =({
		Bucket: bucketName,
		Key: imageName
	})

	const uploadURL = s3.getSignedUrlPromise('putObject', params)
	return uploadURL
}

module.exports = generateUploadURL()