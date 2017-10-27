<?php

require('mail/sendmail.php');
date_default_timezone_set("America/Chicago");
$curl = curl_init();
$ini_array = parse_ini_file("keys.ini");

$name = $_POST["name"];
$meeting_datetime = new DateTime($_POST["meeting_time"]);
$meeting_description = $_POST["meeting_description"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$address = $_POST["address"];
$apikey = $ini_array["key"];

$postFields = 'name-or-org-name='.$name.'&email='.$email.'&phone='.$phone.'&meeting-datetime='.$meeting_datetime->format('DD/MM/YY hh:mm').'&address='.$address.'&product-description='.$meeting_description;
$postFields = str_replace(' ', '%20', $postFields);
$postFields = str_replace('+', '%2B', $postFields);
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://mrwcreations-472e.restdb.io/rest/meeting-details",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $postFields,
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/x-www-form-urlencoded",
    "postman-token: 00ef02ec-e7ef-628c-77c4-755dcf2d4f0b",
    "x-apikey: ".$apikey
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

error_log($response);
curl_close($curl);

$meeting_time = $meeting_datetime->format('h:ma');
$meeting_date = $meeting_datetime->format('m/d/y');

$ini_array = parse_ini_file('app.email.configuration.ini');
$username=$ini_array['username'];
$password=$ini_array['password'];


$email_body = file_get_contents("../mailer/meeting/content.html");
$subject = "Thank you ".$name."! Your meeting is set up!";
$email_body = str_replace("{NAME}", $name, $email_body);
$email_body = str_replace("{DATE}", $meeting_date, $email_body);
$email_body = str_replace("{TIME}", $meeting_time, $email_body);


if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo sendEmail($email, $username, $email_body, $subject, $username, $password, true);
}