
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


var datos = `Acoso,"¿Ha vivido usted exposición de carteles, calendarios, fotos, pantallas de computadoras con imágenes de naturaleza sexual que te incomoden?",booleana ,,,,,,,,,,
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
Bullying ,¿Ha vivido usted robos o hurtos?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted agresiones con armas blancas.?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted agresiones con armas de fuego.?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted maltrato verbal.?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted maltrato social.?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted insultos?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted maltrato físico.?,booleana ,,,,,,,,,,
Bullying ,¿Ha vivido usted maltrato a través de los medios electrónicos de comunicación y redes sociales.?,booleana ,,,,,,,,,,
Bullying ,¿Conozco las normas de convivencia o disciplina de la escuela.?,booleana ,,,,,,,,,,
Bullying ,¿Las normas de convivencia o disciplina son conocidas por todos los estudiantes.?,booleana ,,,,,,,,,,
Bullying ,¿Las normas de convivencia o disciplina se aplican a todos por igual.?,booleana ,,,,,,,,,,
Bullying ,¿Se corrige y/o castiga a quien comete una falta.?,booleana ,,,,,,,,,,
Bullying ,¿Se cumplen las sanciones?,booleana ,,,,,,,,,,
Bullying ,¿Confío en mis profesores para pedir apoyo en caso de ser víctima de agresión.?,booleana ,,,,,,,,,,
Bullying ,¿Confío en el Director para  para pedir apoyo en caso de ser víctima de agresión.?,booleana ,,,,,,,,,,
Bullying ,¿Confío en el prefecto  para pedir apoyo en caso de ser víctima de agresión.?,booleana ,,,,,,,,,,
Bullying ,Se te explica ¿qué hacer en caso de bullying?,booleana ,,,,,,,,,,
Bullying ,En caso de haber solicitado apoyo por ser víctima de agresión en la escuela ¿has recibido ayuda de quien la solicitaste?,booleana ,,,,,,,,,,
Habitos alimenticios ,Marca las comidas que realizas al día,opcion multiple ,A: Desayuno,B: Colación matutina ,C: Comida,D: Colación a media tarde ,E: Cena,,,,,
Habitos alimenticios ,¿Desayunas en tu casa antes de ir a la escuela?,booleana,,,,,,,,,,
Habitos alimenticios ,"En caso de que tu respuesta sea afirmativa, ¿Qué desayunas?",opcion multiple ,A: Licuado,B: Jugo ,C: Fruta ,D: Huevo,E: Frijoles,F: Lácteos ,G: Pan y/o galletas,H: Tortillas ,I: Guiso,
Habitos alimenticios , ¿Cuánto tiempo pasa desde que te levantas hasta que consumes tu primer alimento?,opcion multiple ,A: Menos de 30 minutos ,B: De 30 minutos a 1 hora ,C: De 1 a 2 horas ,D: Más de 2 horas ,,,,,,
Habitos alimenticios ,¿Durante el receso qué tipo de alimentos consumes?,opcion multiple ,A: Frutas ,B: Verduras,"C: Snacks salados(papas fritas, sabritas, cacahuates).","D: Snack dulces(galletas,pan,chocolates,etc.)",E: Leche o yogurt,F: Bebodas o jugos azucarados ,G: Bebidas o jugos sin azúcar,H: Agua natural,"I: Sándwitch,torta,burritos,gorditas,tacos,guisado,hamburguesas,quesadillas.",J: Otro
Habitos alimenticios ,¿Cuentas con beca de alimentación?,booleana,,,,,,,,,,
Habitos alimenticios ,¿Cuántos vasos de agua tomas al día? ,libre,,,,,,,,,,
Habitos alimenticios , ¿Cuántos platos de verduras o ensaladas comes al día? ,libre,,,,,,,,,,
Habitos alimenticios ,"Después de tus clases, ¿cuántas comidas realizas en casa? ",libre,,,,,,,,,,
Habitos alimenticios ,¿Qué tipo de alimentos prefieres consumir en la tarde-noche?,opcion multiple ,A: Fritos ,B: Cocidos ,C: Al vapor ,D: A la plancha ,,,,,,
Habitos alimenticios ,¿Qué tipo de bebidas prefieres?,opcion multiple ,A: Agua natural ,B: Agua con saborizante artificial,C: Agua de frutas ,D: Té ,E: Refrescos u otra bebida envasada ,F: Café,G: Jugos de fruta natural.,,,
Habitos alimenticios ,Con qué frecuencia consumes refresco:,opcion multiple ,A: Nunca ,B: 1 a 2 veces por semana ,C: 3 a 5 veces por semana ,D: Diario,,,,,,
Habitos alimenticios ,¿Alguna vez te preocupó que los alimentos se acabaran en tu hogar?,booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez en tu hogar se quedaron sin alimentos? ,booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez en tu hogar dejaron de tener una alimentación saludable?          ,booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez tu o algún adulto en tu hogar tuvo una alimentación basada en poca variedad de alimentos?  ,booleana,,,,,,,,,,
Habitos alimenticios ,"¿Alguna vez tu o algún adulto en tu hogar dejó de desayunar, comer o cenar?   ",booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez tu o algún adulto en tu hogar comió menos de lo que debía comer?  ,booleana,,,,,,,,,,
Habitos alimenticios ,"¿Alguna vez tu o algún adulto en tu hogar sintió hambre, pero no comió? ",booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez tu o algún adulto en tu hogar solo comió una vez al día o dejó de comer durante todo un día?,booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez algún menor de 18 años en tu hogar dejó de tener una Alimentación saludable? ,booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez algún menor de 18 años en tu hogar tuvo una alimentación basada en poca variedad de alimentos?      ,booleana,,,,,,,,,,
Habitos alimenticios ,"¿Alguna vez algún menor de 18 años en tu hogar dejó de desayunar, almorzar o cenar? ",booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez algún menor de 18 años en tu hogar comió menos de lo que debía?,booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez tuvieron que disminuir la cantidad servida en las comidas a algún menor de 18 años en tu hogar? ,booleana,,,,,,,,,,
Habitos alimenticios , ¿Alguna vez algún menor de 18 años en tu hogar sintió hambre pero no comió? ,booleana,,,,,,,,,,
Habitos alimenticios ,¿Alguna vez algún menor de 18 años en tu hogar solo comió una vez al día o dejó de comer durante todo un día?,booleana,,,,,,,,,,
Construyo un proyecto de vida , ¿Qué harás cuando termines tus estudios de bachillerato?,opcion multiple,A: Estudiar ,B: Trabajar,C: Casarme ,D: Trabajar y estudiar ,E: Nada,,,,,
Construyo un proyecto de vida , ¿Tú que consideras que se debe tomar en cuenta para elegir carrera?,opcion multiple,A: El plan de estudios ,B: El lugar en que se ubica la universidad,C: La demanda laboral de la carrera a elegir,D: Los salarios que pueden percibir ,E: La opinión familiar ,F: La opinión de amigos (pareja),,,,
Construyo un proyecto de vida , De los siguientes conceptos ¿cuál te define?,opcion multiple,"A: Inteligente, atlético ",B: Emprendedor ,C: Agresivo,D: Sociable ,E: Tranquilo,F: Introvertido,G: Depresivo ,H: Alegre ,I: Amigable,
Construyo un proyecto de vida ,¿Cómo te visualizas en 10 años?,opcion multiple,A: Casado/soltero,B: Con hijos /sin hijos,C: Trabajando /sin trabajar/negocio propio,D: Estudiando un posgrado /sin estudiar,E: Viviendo con mis papás/ viviendo con mi pareja (e hijos)/viviendo solo,F:  Saludable/ con problemas de salud,G: Libertad /Estabilidad / Dificultad financiera,,,
Construyo un proyecto de vida ,¿Cuál sería tu trabajo ideal?,opcion multiple,A: En casa ,B: En oficina ,C: En fábrica ,D: Al aire libre ,,,,,,
Construyo un proyecto de vida ,¿Actualmente en que ocupas tu tiempo libre?,opcion multiple,A: En prepararme mejor para el futuro,B: En aprender un oficio,C: En cultivar algún tipo de exposición artística ,D: Otro,,,,,,
Construyo un proyecto de vida , ¿Qué perspectiva tienes del futuro?,opcion multiple,A: Visión pesimista ,B: Posrtura optimista ,,,,,,,,`

/*exports.nuevoArchivo = functions.storage.object().onFinalize(async (object) => {
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
});*/

function toJSON(content) {
  try {
    const filas = parse(content, {
      columns: false,
      skip_empty_lines: true,
    })
    // Extraccion de datos y
    // Estructurar JSON
    let jsonObject = {}
    for (let i = 0; i < filas.length; i++) {
      const columnas = filas[i];
      if (columnas[0].trim() in jsonObject) {
        // Si es de opcion multiple crear una lista de respuestas, si no, no guardar campo de respuestas
        if (columnas[2].trim() === 'opcion multiple') {
          // Crear nodo de pregunta con lista de respuestas
          let valorRespuestas = columnas[2].trim().split('|');
          let pregunta = {
            pregunta: columnas[1].trim(),
            tipoPregunta: columnas[2].trim(),
            respuestas: valorRespuestas
          };
          // agregar a la lista de preguntas
          jsonObject[columnas[0].trim()].push(pregunta);
        } else {
          // Crear nodo de pregunta sin lista de respuestas
          let pregunta = {
            pregunta: columnas[1].trim(),
            tipoPregunta: columnas[2].trim(),
          };
          // agregar a la lista de preguntas
          jsonObject[columnas[0].trim()].push(pregunta);
        }
      } else {
        // El tema aun no existe, crear nueva lista de preguntas
        jsonObject[columnas[0].trim()] = [];
        // Si es de opcion multiple crear una lista de respuestas, si no, no guardar campo de respuestas
        if (columnas[2].trim() === 'opcion multiple') {
          // Crear nodo de pregunta con lista de respuestas
          let valorRespuestas = columnas[2].trim().split('|');
          let pregunta = {
            pregunta: columnas[1].trim(),
            tipoPregunta: columnas[2].trim(),
            respuestas: valorRespuestas
          };
          // agregar a la lista de preguntas
          jsonObject[columnas[0].trim()].push(pregunta);
        } else {
          // Crear nodo de pregunta sin lista de respuestas
          let pregunta = {
            pregunta: columnas[1].trim(),
            tipoPregunta: columnas[2].trim(),
          };
          // agregar a la lista de preguntas
          jsonObject[columnas[0].trim()].push(pregunta);
        }
      }
    }
    console.log(jsonObject);
    // Guardar en base de datos
    toDB(jsonObject)
  } catch (error) {
    console.log('>>> Error', error)
  }
}

function toDB(jsn) {
  admin.database().ref("plantilla").set(jsn);
}


toJSON(datos)