const express = require('express');
const Emp = require('../model/dataEmpl');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try{
        if(await Emp.findOne({ email }))
            return res.status(400).send({ error: 'Employee already exists' });

        const emp = await Emp.create(req.body);

        return res.send({ emp });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.get('/employees', async (req, res) => {
    try {
        const emplist = await Emp.find(req.body);
    
        return res.send({ emplist });
    } catch (err) {
        return res.status(400).send({ error: 'No employees'});
    }
});

router.get('/employeeID', async (req, res) => {
    try{
        const emp = await Emp.findOne(req.body);

        return res.send({ emp });
    } catch (err) {
        return res.status(400).send({ error: 'Error in searching' });
    }        
});

router.delete('/deleteID', async (req, res) => {
    const { _id } = req.body;
    try{
        if(await Emp.findOne({ _id })){
            const del = await Emp.findByIdAndDelete(req.body);
            return res.status(200).send({ success: 'Employee deleted' });
        }
        return res.status(400).send({ error: 'Employee not found' });
    } catch (err) {
        return res.status(400).send({ error: 'Error while deleting' });
    }
});

router.delete('/deleteAll', async (req, res) => {
    try{
        const del = await Emp.remove(req.body);

        return res.status(200).send({ success: 'Employees deleted' });
    } catch (err) {
        return res.status(400).send({ error: 'Error while deleting' });
    }
});

module.exports = app => app.use('/auth', router);