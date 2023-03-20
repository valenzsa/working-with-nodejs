const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}


const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1, // grab the last employee id and add 1
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    // Making sure firstname and lastname are sent
    // If not we are sending a response status of 400 with a message
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({
            "message": "First and last names are required."
        });
    }

    // Updating the employee data with the new employee added at the end of the array.
    data.setEmployees([...data.employees, newEmployee]);

    // Sending a status of 201 indicating the data has been updated
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    // Grabs an employee with the matching requested id
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    // if an id requested doesn't match any employee,
    // A response of status 400 is received with a message of Employee ID is not found.
    if (!employee) {
        return res.status(400).json({
            "message": `Employee ID ${req.body.id} not found`
        })
    }

    // Grabs the first name of matching employee
    if (req.body.firstname) {
        employee.firstname = req.body.firstname;
    }

    // Grabs the last name of matching employee
    if (req.body.lastname) {
        employee.lastname = req.body.lastname;
    }

    // Returns an array of employees that are not matching the requested id
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));

    // Returns an array containing the updated employee at the end.
    const unsortedArray = [...filteredArray, employee];

    // Sorts the unsortedArray and sets it back to the data object
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    // Sends the response in json format
    res.json(data.employees);
}

// Find the employee if didn't get id, we send a 400 error
const deleteEmployee = (req, res) => {

    // Grabs the employee that matches the requested id
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    // If the requested id doesn't match any from the data
    // Sends a response of status 400 with a message of Employee ID not found
    if (!employee) {
        return res.status(400).json({
            "message": `Employee ID ${req.body.id} not found`
        });
    }

    // Returns an array of employees that are not matching the requested id
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));

    // Sets new employee data
    data.setEmployees([...filteredArray]);

    // Sends the response in json format
    res.json(data.employees);
}

const getEmployee = (req, res) => {

    // Grabs the employee that matches the requested id
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));

    // If requested employee doesn't match
    // Sends a 400 status response with a message
    if (!employee) {
        return res.status(400).json({
            "message": `Employee ID ${req.params.id} not found`
        });
    }

    // return that specific employee
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}