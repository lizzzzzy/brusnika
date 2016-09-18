<?php
if (isset($_REQUEST['data']))  {

  //Email information
  $admin_email = "lizapozdnyakova@gmail.com";
  $email_to = 'lizapozdnyakova@gmail.com';
  $post_data = $_REQUEST['data'];
  $phone = $post_data['phone'];
  $params = $post_data['params'];
  $area_flag = @$post_data['flag'];

  if (strlen($phone) > 18) {
    echo "NODATA";
    return;
  }

  if (!empty($area_flag)) {
    $data = "Заявка с генплана promo.zemaktiv.ru:\n\n".
    "Телефон — $phone, $params";
    // send email
    mail($email_to, 'Заявка с генплана', $data, "From: " . $admin_email . "\r\n"
    ."X-Mailer: PHP/" . phpversion());
  } else {
    $data = "Заявка на звонок с сайта promo.zemaktiv.ru:\n\n" .
    "Телефон — $phone, $params";
    // send email
    mail($email_to, 'Заявка с сайта', $data, "From: " . $admin_email . "\r\n"
    ."X-Mailer: PHP/" . phpversion());
  }

  //Email response
  echo "OK";

} else {
  echo "NODATA";
}
?>
