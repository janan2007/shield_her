const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

// Twilio Credentials (replace with your Twilio credentials)
const accountSid = 'AC21f8237f7506cd54ecfe4fd0babee272';  // Replace with your Twilio Account SID
const authToken = '423dae0070a670d5163ff6ada5841121';    // Replace with your Twilio Auth Token
const client = new twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send-sms', (req, res) => {
    const { guardianNumber, message } = req.body;

    client.messages.create({
        body: message,
        from: '+18649774096', // Replace with your Twilio number
        to: guardianNumber
    })
    .then((message) => res.status(200).send('Message sent!'))
    .catch((error) => {
        console.error('Twilio Error:', error.message);
        res.status(500).send('Failed to send message: ' + error.message);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
