const { spawn } = require("child_process");
const axios = require("axios");


// Función para ejecutar un script
const executeScript = (scriptName, scriptArgs) => {
  const script = spawn("node", [scriptName, ...scriptArgs]);

  // Mostrar la salida estándar de cada proceso secundario
  script.stdout.on("data", (data) => {
    console.log(`Salida de ${scriptName}: ${data}`);
  });

  // Mostrar el error estándar de cada proceso secundario
  script.stderr.on("data", (data) => {
    const errorData = data.toString();
    console.error(`Error de ${scriptName}: ${errorData}`);
    
    // Evitar enviar el webhook si el error proviene de copiadeseguridad.js
   


    
  });

  // Mostrar el código de salida de cada proceso secundario
  script.on("close", (code) => {
    console.log(`${scriptName} terminó con el código ${code}`);
    // Volver a ejecutar el script si se detiene (código de salida no es 0)
    if (code !== 0) {
      console.log(`Reiniciando ${scriptName}...`);
      executeScript(scriptName, scriptArgs);
    }
  });
};

// Ejecutar los scripts
executeScript("index.js", []);
