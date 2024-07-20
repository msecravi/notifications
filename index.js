const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require('sequelize');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

var sequelize = new Sequelize('notification','root','',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3307,
  })

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to notification" });
});

app.get('/cron', async (req, res) => {
    try {
        const jobs = await Cronjobs.findAll({
            where: {
              status: {
                [Op.ne]: 'Sent',
              },
            },
          });
        jobs.forEach(e => {
            if(e.typeId==1){
                try{
                    const update_job = Cronjobs.update([{status:'Sent'}],{where:{id:e.id}});
                }catch(e){
                    const update_job = Cronjobs.update([{status:'Failed'}],{where:{id:e.id}});
                }
            }else if(e.typeId==2){
                try{
                    const update_job = Cronjobs.update([{status:'Sent'}],{where:{id:e.id}});
                }catch(e){
                    const update_job = Cronjobs.update([{status:'Failed'}],{where:{id:e.id}});
                }
            }
        });
        res.send(jobs);
    } catch (err) {
        res.send(err);
    }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
const Types = sequelize.define('types', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
const Cronjobs = sequelize.define('cronjobs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    typeId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});