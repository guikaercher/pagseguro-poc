const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

checkPaymentData = (notificationCode) => {
	const email = 'SEU E-MAIL AQUI';
	const token = 'SEU TOKEN AQUI';
	axios.get('http://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/' + notificationCode + '?email=' + email + '&token=' + token)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
}


app.get('/', (req, res) => {
	console.log('bateu na API');
  res.send('hello world');
});

app.post('/notification', (req, res) => {
	res.send('payment data');
	console.log(req.body);
	const notificationCode = req.body.notificationCode;
	checkPaymentData(notificationCode);
  });

app.listen(8080);

/*
How it works
 we will listen to a notification that will have a notificationCode and with this property we will send a POST like above and
 then we will receive a XML containing payment/customer info

 https:/ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications
/notificationCode
?email=suporte@lojamodelo.com.br
&token=95112EE828D94278BD394E91C4388F20
*/