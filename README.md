# TFG Pádel Frontend

Este Trabajo Fin de Grado consiste en el desarrollo de una aplicación web para la gestión de torneos deportivos, inicialmente para torneos de pádel. Se ha llevado a cabo la parte de interacción con el usuario de la aplicación, el frontend.

A través de la plataforma implementada, los usuarios pueden registrarse, apuntarse a torneos, crearlos, ver la clasificación del torneo así como subir resultados de los partidos, entre otras muchas funcionalidades.

Para desarrollar este proyecto, se ha utilizado React como librería de JavaScript. Además, se ha empleado la librería Redux para obtener una arquitectura escalable y para tener un máximo control del flujo de los datos y del estado de la aplicación.

Asimismo, se ha utilizado tanto el framework React-Bootstrap como Bootstrap para el diseño de la aplicación web, de tal manera que el usuario es capaz de utilizar el sistema de una forma intuitiva y sencilla. Para la persistencia de los datos se envían peticiones a un servidor REST desarrollado de forma paralela como parte de otro TFG.



## Requisitos previos a la instalación
El requerimiento principal para el correcto funcionamiento del sistema es haber instalado y desplegado el back-end desarrollado por Jorge García Pérez, se recomienda mirar las instrucciones dadas en su proyecto. También se aconseja utilizar la versión disponible en el siguiente repositorio, ya que contiene algunos cambios y mejoras implementadas como parte de este TFG, que hacen que sea compatible con el frontend desarrollado. Asimismo, en el repositorio se encuentran las instrucciones para su instalación. Habrá que acceder a la siguiente página y descargar el fichero zip con el código fuente o bien desde el terminal poner la siguiente línea de código.
 
    a) https://github.com/beablancob/padel
  
    b) $ git clone https://github.com/beablancob/padel
  
Además, el API desarrollado en el proyecto del back-end se encuentra documentado en la plataforma Apiary, se explica detalladamente en el siguiente enlace:

    https://tfg2.docs.apiary.io/#
    

## Instalación 

Lo primero que se debe instalar es NodeJS y npm para el correcto funcionamiento del sistema. En caso de desplegar el sistema en Ubuntu, se ejecutará en el terminal lo siguiente:


    $ sudo apt-get install nodejs

    $ sudo apt-get install npm

En caso de utilizar Windows o Mac para el desarrollo de la aplicación web, la instalación se llevará a cabo una vez se descargue NodeJS desde su página web oficial: https://nodejs.org/es/
Ahora se procede a clonar la aplicación web del repositorio de github indicado a continuación:

  
    $ git clone https://github.com/beablancob/padelweb


Una vez descargado el proyecto, dentro de la carpeta que lo contiene se instalan las dependencias
necesarias para que pueda funcionar correctamente, mediante el siguiente comando:

    $ npm install
    
Por último, solo queda correr la aplicación web. Para ello, mientras está corriendo el back-end, se pone a correr el frontend mediante el siguiente comando:

    $ npm start
