<?php
if (isset($_REQUEST['data']))  {

  //Email information
  $admin_email = "lizapozdnyakova@gmail.com";
  $email_to = 'lizapozdnyakova@gmail.com';
  $phone = $_REQUEST['data'];

  if (strlen($phone) > 18) {
    echo "NODATA";
    return;
  }

  $data = "Заявка на обмен квартиры" .
    "Телефон — $phone";

  // send email
  mail($email_to, 'Заявка с сайта', $data, "From: " . $admin_email . "\r\n"
  ."X-Mailer: PHP/" . phpversion());

  //Email response
  echo "OK";

} else {
  echo "NODATA";
}
?>