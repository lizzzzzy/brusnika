<?php
if (isset($_REQUEST['data']))  {

  //Email information
  $admin_email = "obmen@brusnika.ru";
  $email_to = ' gaurikh@brusnika.ru, fedorov@brusnika.ru.';
  $phone = $_REQUEST['data'];

  if (strlen($phone) > 18) {
    echo "NODATA";
    return;
  }

  $data = "Клиент ждёт звонка по номеру:\n\n".
    "$phone";

  // send email
  mail($email_to, 'Консультация по обмену Тюмень', $data, "From: " . $admin_email . "\r\n"
  ."X-Mailer: PHP/" . phpversion());

  //Email response
  echo "OK";

} else {
  echo "NODATA";
}
?>