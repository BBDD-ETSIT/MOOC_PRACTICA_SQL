/* eslint-disable no-invalid-this*/
/* eslint-disable no-undef*/
// IMPORTS
const path = require("path");
const Utils = require("../utils/testutils");
const USER_EMAIL = require('../../user.json').email;

const node_modules = path.resolve(path.join(__dirname, "../../", "node_modules"));
var sequelize;

const T_TEST = 2 * 60, R5S1 = 72136, R4S1 = 43624, R3S1 = 85939, R3SM = 97750; // Time between tests (seconds)

// CRITICAL ERRORS
let error_critical = null;

describe("P4_SQL_BBDDR", function () {

    this.timeout(T_TEST * 1000);

    before(async function() {
        const { Sequelize } = require('sequelize');
        sequelize = new Sequelize('employees', process.env.MYSQL_USER, process.env.MYSQL_PASS, {
          host: 'localhost',
          dialect: 'mysql',
          logging: false
        });
        try {
          await sequelize.authenticate();
          console.log('Connection has been established successfully.');
        } catch (error) {
          console.error('Unable to connect to the database.');
          error_critical = 'Unable to connect to the database. Está arrancada la BD? Has configurado las variables de entorno con el user y pass de MySQL? Has importado la base de datos employees?';
          if (!process.env.MYSQL_USER || !process.env.MYSQL_PASS) {
              console.error('Has configurado las variables de entorno con el user y pass de MySQL?');
          };
        }
    });

    it("(Precheck) Comprobando que las dependencias están instaladas...", async function () {
        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {


            this.msg_ok = `Encontrado el directorio '${node_modules}'`;
            this.msg_err = `No se encontró el directorio '${node_modules}'`;
            var fileexists;
            try {
                fileexists = await Utils.checkFileExists(node_modules);
                if (!fileexists) {
                    error_critical = this.msg_err;
                }            
            } catch (err) { error_critical = err;}

            fileexists.should.be.equal(true);
        }
    });


    it("(Precheck): Comprobando que la base de datos se ha importado correctamente...", async function () {
        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `La base de datos se ha importado correctamente`;
            this.msg_err = `La base de datos no se ha importado correctamente`;
            var res;
            try {
                res = await sequelize.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'employees' AND TABLE_NAME = 'departments'");
                if (!res[0][0]) {
                    error_critical = this.msg_err;
                    should.not.exist(error_critical);
                }
            } catch (err) { error_critical = err;}
            res[0][0].should.not.equal(undefined);
        }
    });

    it("(1): Comprobando que la tabla emails se ha creado correctamente...", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {

            this.msg_ok = `La tabla emails se ha creado correctamente`;
            this.msg_err = `La tabla emails no se ha creado correctamente`;
            var res;
            try {
                res = await sequelize.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'employees' AND TABLE_NAME = 'emails'");
            } catch (err) { error_critical = err;}

            if (!res[0][0])
                this.msg_err += '. Existe la tabla?'

            res[0][0].should.not.equal(undefined);
        }
    });

    it("(2): Comprobando que el email del alumno ha sido asociado al empleado correctamente...", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {

            this.msg_ok = `El email del alumno ha sido asociado al empleado correctamente`;
            this.msg_err = `El email del alumno no ha sido asociado al empleado correctamente`;
            var res;
            try {
                res = await sequelize.query("select emp_no, email from emails where emp_no='110085'");
           
            } catch (err) { error_critical = err;}
            
            if (!res[0][0])
                this.msg_err += '. Has introducido el nuevo elemento y asociado al empleado correcto?'
            res[0][0].should.not.equal(undefined);

            if (res[0][0].email !== USER_EMAIL)
                this.msg_err += '. Has introducido tu email correctamente?'
            res[0][0].email.should.be.equal(USER_EMAIL);

            var res1;
            try {
                res1 = await sequelize.query("select emp_no from employees limit 3000");
                var item = res1[0][Math.floor(Math.random() * res1[0].length)];
                await sequelize.query("insert into emails (emp_no, email) values (" + item.emp_no + ", 'test@alumnos.upm.es')");
                await sequelize.query("delete from employees where emp_no=" + item.emp_no);
                res2 = await sequelize.query("select * from emails where emp_no=" + item.emp_no);
            } catch (err) { error_critical = err;}

            if (res2[0][0])
                this.msg_err += '. Están correctamente definidas las restricciones de la tabla emails?'
            (res2[0][0] === undefined).should.be.true();

        }
    });

    it("(3): Comprobando que el número de Senior Engineer introducido es correcto...", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {

            this.msg_ok = `El número de Senior Engineer introducido es correcto.`;
            this.msg_err = `El número de Senior Engineer introducido no es correcto.`;
            var res;
            try {
                res = await sequelize.query("select salary from salaries where emp_no='18734'");
           
            } catch (err) { error_critical = err;}

            if (!res[0][0])
                this.msg_err += '. Has introducido el valor de salario para el empleado pedido?'
            res[0][0].should.not.equal(undefined);

            if (res[0][0].salary !== R3S1)
                this.msg_err += '. Has introducido el número de ingenieros correctamente?'

            if (res[0][0].salary == R3SM)
                this.msg_err += '. Has contado solo los actuales?'
            
            res[0][0].salary.should.be.equal(R3S1);

        }
    });

    it("(4): Comprobando que el salario del empleado del departamento de ventas con sueldo más alto es correcto...", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {

            this.msg_ok = `El salario del empleado del departamento de ventas con sueldo más alto es correcto.`;
            this.msg_err = `El salario del empleado del departamento de ventas con sueldo más alto no es correcto.`;
            var res;
            try {
                res = await sequelize.query("select salary from salaries where emp_no='18675'");
           
            } catch (err) { error_critical = err;}

            if (!res[0][0])
                this.msg_err += '. Has introducido el valor de salario para el empleado pedido?'
            res[0][0].should.not.equal(undefined);

            if (res[0][0].salary !== R4S1)
                this.msg_err += '. Has introducido el valor del salario correctamente?'
            
            res[0][0].salary.should.be.equal(R4S1);

        }
    });

    it("(5): Comprobando que el salario medio actual de los empleados nacidos en diciembre de 1964 es correcto...", async function () {
        this.score = 2;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {

            this.msg_ok = `El salario medio actual de los empleados nacidos en diciembre de 1964 es correcto.`;
            this.msg_err = `El salario medio actual de los empleados nacidos en diciembre de 1964 no es correcto.`;
            var res;
            try {
                res = await sequelize.query("select salary from salaries where emp_no='12068'");
           
            } catch (err) { error_critical = err;}

            if (!res[0][0])
                this.msg_err += '. Has introducido el valor de salario para el empleado pedido?'
            res[0][0].should.not.equal(undefined);

            if (res[0][0].salary !== R5S1)
                this.msg_err += '. Has introducido el valor del salario correctamente?'
            
            res[0][0].salary.should.be.equal(R5S1);

        }
    });

    after(async function() {
        sequelize.close();
    });


});