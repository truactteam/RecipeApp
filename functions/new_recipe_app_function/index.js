const express = require('express');
const catalystSDK = require('zcatalyst-sdk-node');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});

app.get('/all', async (req, res) => {                    //API creation("URL PART")
  try {
    const { catalyst } = res.locals;
    const zcql = catalyst.zcql();
    const myData = await zcql.executeZCQLQuery(`SELECT ROWID, Name, Recipe FROM Recipes`);
    const recipes = myData.map(row => ({
      id: row.Recipes.ROWID,
      name: row.Recipes.Name,
      recipe: row.Recipes.Recipe
    }));
    res.status(200).send({
      status: 'success',
      data: {
        recipes
		// myData
      }
    });
  } catch (err) {
    console.log("function error");
    console.log(err);
    res.status(500).send({
      status: 'failure',
      message: "We're unable to process the request."
    });
  }
});

app.post('/add', async (req, res) => {
  try {
    const { name, recipe } = req.body;
    if (!name || !recipe) {
      return res.status(400).send({
        status: 'failure',
        message: "Name and recipe are required."
      });
    }
    const { catalyst } = res.locals;
    const table = catalyst.datastore().table('Recipes');
    const { ROWID: id } = await table.insertRow({
      Name: name,
      Recipe: recipe
    });
    res.status(200).send({
      status: 'success',
      data: {
        id,
        name,
        recipe
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'failure',
      message: "We're unable to process the request."
    });
  }
});

module.exports = app;
