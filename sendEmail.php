<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

if(isset($_POST['body'])) {

  $data = [
    "personalizations" => [
      [
        'to' => [
          //@todo Change this line to add the email.
          ['email' => 'someemail@domain.com']
        ],
      ],
    ],
    'from' => ['email' => 'ystem@crimeometer.com'],
    'subject' => 'New sumbition',
    'content' => [
      [
        'type' => 'text/plain',
        'value' =>  $_POST['body']
      ]
    ]
  ];


  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, "https://api.sendgrid.com/v3/mail/send");
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Bearer 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'));

  $server_output = curl_exec($ch);

  curl_close($ch);
}



