const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/add", (request, response) => {
    console.log(request);
    const user_name = request.body["user_name"];
    const add_date = request.body["add_date"];
    const doc_id = request.body["doc_id"];
    const doc_name = request.body["doc_name"];
    var flag = 0;
    
    if ( /^[a-zA-Z]*$/.test(user_name) && user_name.length >= 3 && `/a-zA-Z0-9!@#$%^&*)(+=._-/`.test(doc_name) && doc_name.length >= 3 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[0-9]*$/.test(doc_id) && doc_id.length == 6 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if (flag != 0) {
        response.status(400).send({
            message: 'Please Re-Enter Correct Information!'
        });
    }
})

app.listen(4000, () => console.log("Server on port 4000"));