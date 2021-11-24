import express from "express";
import * as SimpleUsersController from "./controllers/simpleUsersController.js";
import * as NestedUsersController from "./controllers/nestedUsersController.js";

import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/test");

const app = express();
const port = 3033;

app.use(express.json());

// SIMPLE 
app.get("/simpleUsers", async (req, res) => {
  res.json({
    simpleUsers: await SimpleUsersController.getAllSimpleUsers(),
  });
});

app.post("/simpleUsers/create", async (req, res) => {
  const simpleUserObj = req.body;
  const result = await SimpleUsersController.createSimpleUser(simpleUserObj);
  res.json({
    result,
  });
});

app.patch("/simpleUsers/update/:id", async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;
  const result = await SimpleUsersController.updateSimpleUser(id, updateFields);
  res.json({
    result,
  });
});

app.delete("/simpleUsers/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await SimpleUsersController.deleteSimpleUser(id);
  res.json({
    result,
  });
});


// NESTED

app.get('/nestedUsers', async (req, res) => {
	res.json({
	    nestedUsers: await NestedUsersController.getAllNestedUsers()
	});
    });

    app.get('/nestedUsers/emails', async (req, res) => {
	res.json({
	    nestedUsers: await NestedUsersController.getAllNestedUsersEmails()
	});
    });
    
    app.get('/nestedUsers/accountHistory/:id', async (req, res) => {
	const id = req.params.id;
	console.log(id);
	res.json({
	    nestedUsers: await NestedUsersController.getAccountHistoryOfNestedUser(id)
	});
    });

    app.post('/nestedUsers/create', async (req, res) => {
	const nestedUserObj = req.body;
	await NestedUsersController.createNestedUser(nestedUserObj, (result) => {
	    res.json({
		result
	    });
	});
    });

    app.patch('/nestedUsers/update/:id', async (req, res) => {
	const id = req.params.id;
	const updateFields = req.body
	const result = await NestedUsersController.updateNestedUser(id, updateFields);
	res.json({
	    result
	});
    });

    app.post('/nestedUsers/delete/:id', async (req, res) => {
	const id = req.params.id;
	const result = await NestedUsersController.deleteNestedUser(id);
	res.json({
	    result
	});
    });

app.listen(port, () => {
  console.log(`API is now listening on port http://localhost:${port}`);
});
