
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


var datos = `
Acoso,"¿Ha vivido usted exposición de carteles, calendarios, fotos, pantallas de computadoras con imágenes de naturaleza sexual que te incomoden?",booleana ,,,,,,,,,,
Acoso ,¿Ha vivido usted piropos o comentarios no deseados acerca de tu apariencia.?,booleana ,,,,,,,,,,
Acoso ,¿Ha vivido usted  usted miradas morbosas o gestos sugestivos que te incomoden.?,booleana ,,,,,,,,,,
Acoso ,"Ha vivido usted burlas,bromas, comentarios o preguntas incómodas sobre tu vida sexual o amorosa.?",booleana ,,,,,,,,,,
Acoso ,¿Ha vivido usted presión para aceptar invitaciones a encuentros o citas no deseados fuera de la escuela.?,booleana ,,,,,,,,,,
Acoso ,"¿Ha vivido usted cartas, llamadas telefónicas o mensajes de naturaleza sexual no deseadas.?",booleana ,,,,,,,,,,
Acoso ,¿Ha vivido usted amenazas que afecten negativamente tu situación en la escuela si no aceptas las invitaciones o propuestas sexuales.?,booleana ,,,,,,,,,,
Acoso ,"¿Ha vivido usted castigos, mal trato,  asignación de actividades que no competen a tus actividades como alumno(a) u otras medidas disciplinarias al rechazar las proposiciones sexuales.?",booleana ,,,,,,,,,,
Acoso ,¿Ha vivido usted contacto físico no deseado.?,booleana ,,,,,,,,,,
Acoso ,¿Ha vivido usted presión para tener relaciones sexuales.?,booleana ,,,,,,,,,,
Acoso ,¿Ha vivido usted intento de violación.?,booleana ,,,,,,,,,,
Acoso ,¿Ha vivido usted violación?,booleana ,,,,,,,,,,
Acoso ,¿Ha sufrido usted  acoso a través de redes sociales.?,booleana ,,,,,,,,,,
Acoso ,¿Ha sufrido usted presión y acoso por parte de algún docente o personal de la escuela.?,booleana ,,,,,,,,,,
Acoso ,¿Algún docente o personal de la escuela te hostiga a tener conductas contrarias a tus principios.?,booleana ,,,,,,,,,,
Acoso ,¿Sientes temor a sufrir represalias por denunciar el acoso.?,booleana ,,,,,,,,,,
Acoso ,Ante una situación de este tipo ¿sabes dónde y con quién pedir ayuda?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted insultos?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted burlas?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted peleas?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted rumores mal intencionados?,booleana ,,,,,,,,,,
Bullying ,"¿Ha vivido usted amenazas,hostigamiento?",booleana ,,,,,,,,,,
Bullying ,¿Has presenciado agresiones a alguno(s) de tus compañeros?,booleana ,,,,,,,,,,
Bullying ,¿Tomas acciones para prevenir el bullying?,booleana ,,,,,,,,,,
Bullying ,¿Intervengo cuando soy testigo de bullying?,booleana ,,,,,,,,,,
`

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


toJSON(datos)