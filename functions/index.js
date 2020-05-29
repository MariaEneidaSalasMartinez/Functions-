
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const parse = require('csv-parse/lib/sync')

exports.nuevoArchivo = functions.storage.object().onFinalize(async (object) => {
  console.log(">>>>>>INICIO")
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  console.log(filePath)
  // [END eventAttributes]
  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  //if (!contentType.startsWith('text/csv')) {
  //  return console.log('Esto no es csv.');
  // }
  // [START thumbnailGeneration]
  // Download file from bucket.
  
  const bucket = admin.storage().bucket(fileBucket);
  const filename = path.basename(object.name);
  console.log(">>>>>> ",  filename)

  bucket.file(filename).download((err, contents) => {
    if (err) {
      console.log('error', err);
      return null
    }
      console.log(">>>>>> ", contents);

      toJSON(contents.toString());
  });
});

function toJSON(content) {
  const input = `
  "key_1","key_2"
  "value 1","value 2"
  `
  console.log(content)
  try {
    const records = parse(content, {
      columns: false,
      skip_empty_lines: true,
     
    })
    console.log('>>>>>>>>>>>>>>. ',records)
    toDB(records)
  } catch (error) {
    console.log('>>> Error', error)
  }
}

function toDB(jsn) {
admin.database().ref("plantilla").set(jsn);
  // Here you can add you firestore/ realtime database or merge the JSON if you want to batch write.
  console.log(jsn)
}

