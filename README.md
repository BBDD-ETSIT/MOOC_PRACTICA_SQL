
<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="60" style="float: right;" src="http://www.dit.upm.es/figures/logos/ditupm-big.gif">

<br/><br/><br/>

# P4_SQL_BBDDR
Versión: 5 de mayo de 2020

## Objetivos

 * Familiarizarse con el uso del lenguaje SQL.
 * Familiarizarse con la gestión de sistemas de Bases de Datos relacionales, en concreto con MySQL

## Descripción de la práctica

Esta práctica consiste en el uso del lenguaje SQL a través del SGBD MySQL para examinar una base de datos, determinar su estructura y realizar una serie de consultas y modificaciones. 

Para la realización de esta práctica es necesario tener instalado MySQL así como el software necesario para la utilización de la herramienta autocorector (git, nodejs y el paquete autocorector), ya utilizada previamente en otras prácticas de la asignatura. 

## Configuración previa e importación de la base de datos

El proyecto debe clonarse en el ordenador desde el que se está trabajando:

```
$ git clone https://github.com/BBDD-ETSIT/P4_SQL_BBDDR
```
A continuación deben instalarse las dependencias necesarias para ejecutar el autocorector: 

```
$ cd P4_SQL_BBDDR
$ npm install
```
A continuación deben configurarse los datos de acceso a MySQL mediante las variables de entorno.

### MacOS / Unix

```
$ export MYSQL_USER="<username>";
$ export MYSQL_PASS="<password>";
```

### Windows

```
$ set MYSQL_USER=<username>;
$ set MYSQL_PASS=<password>;
```

En Windows también es posible configurar las variables de entorno mediante la interfaz gráfica, buscando el menú de edición de variables de entorno en el buscador del sistema operativo e introduciendo los valores indicados arriba (en la sección de variables de entorno del sistema). 



A continuación se debe acceder desde un terminal al directorio donde se encuentra el dump de la base de datos (descargado de Moodle) sobre la que se va a trabajar para proceder a su importación ejecutando las siguientes órdenes (teniendo MySQL arrancado):

### MacOS / Unix

```
$ cd dump
$ /usr/local/mysql/bin/mysql -u <nombre_usuario_mysql> -p -t < employees.sql

```

### Windows

```
> cd dump
> Get-Content employees.sql | & 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u <nombre_usuario_mysql> -p -t
```


Una vez importados los datos conectarse a mysql y comprobar que se ha creado una nueva base de datos llamada "employees".

*Nota: es importante que el fichero de dump descargado de Moodle no se almacene en el mismo directorio P4_SQL_BBDDR de la práctica

## Tareas a desarrollar

0. Examinar la base de datos importada y dibujar un diagrama con las diferentes tablas y las relaciones entre ellas (no evaluable). 

1. Crear una nueva tabla llamada *emails* en la que se almacenen las direcciones de correo electrónico de los empleados. Cada empleado puede tener una o más direcciones de correo electrónico asociadas. La columna *emp_no* almacenará el número de empleado y la columna *email* el correo. Tener en cuenta las restricciones que debe tener la tabla, razonando qué debe ocurrir con los correos electrónicos de un empleado si este es eliminado de la BD. (2 ptos)

2. Añadir la dirección de correo del alumno (acabada en @alumnos.upm.es) como dirección de correo del empleado que fue manager del departamento de Finanzas hasta el 1989-12-17. (2 ptos)

3. Contar el número de Senior Engineer que tiene actualmente la empresa (tener en cuenta que en esta BD cuando un periodo de tiempo no se ha terminado, su fecha de fin se marca como 9999-01-01). Modificar el valor del sueldo del empleado con emp_no=18734 para que sea el valor obtenido. (2 ptos)

4. Buscar el empleado del departamento de ventas con sueldo más alto. Guardar el identificador de dicho empleado como valor de sueldo del empleado con emp_no=18675. Nota: para limitar el número de resultados mostrados al hacer una consulta puede añadirse al final de la query el comando *limit <num_de_resultados>*; (2 ptos)

5. Calcular el sueldo medio ACTUAL de los empleados nacidos en diciembre de 1964. Modificar el valor del sueldo del empleado con emp_no=12068 para que sea el valor obtenido (su parte entera). (2 ptos)

## Prueba de la práctica 

Para ayudar al desarrollo, se provee una herramienta de autocorrección que prueba las distintas funcionalidades que se piden en el enunciado. Para utilizar esta herramienta debes tener node.js (y npm) ([https://nodejs.org/es/](https://nodejs.org/es/)) y Git instalados. 

Para instalar y hacer uso de la [herramienta de autocorrección](https://www.npmjs.com/package/autocorector) en el ordenador local, ejecuta los siguientes comandos en el directorio del proyecto:

```
$ npm install -g autocorector     ## Instala el programa de test
$ autocorector                    ## Pasa los tests al fichero a entregar
............................      ## en el directorio de trabajo
... (resultado de los tests)
```
También se puede instalar como paquete local, en el caso de que no se dispongas de permisos en el ordenador desde el que estás trabajando:
```
$ npm install autocorector     ## Instala el programa de test
$ npx autocorector             ## Pasa los tests al fichero a entregar
............................   ## en el directorio de trabajo
... (resultado de los tests)
```

Se puede pasar la herramienta de autocorrección tantas veces como se desee sin ninguna repercusión en la calificación.

## Instrucciones para la Entrega y Evaluación.

Una vez satisfecho con su calificación, el alumno puede subir su entrega a Moodle con el siguiente comando:
```
$ autocorector --upload
```
o, si se ha instalado como paquete local:
```
$ npx autocorector --upload
```

La herramienta de autocorrección preguntará por el correo del alumno y el token de Moodle. En el enlace [https://www.npmjs.com/package/autocorector](https://www.npmjs.com/package/autocorector) se proveen instrucciones para encontrar dicho token.

