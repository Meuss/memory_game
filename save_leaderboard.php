<?php
$filetxt = 'leaderboard.json';
$formdata = array(
    'nickname'=> $_POST['nickname'],
    'finaltime'=> $_POST['finaltime']
);
$arr_data = array();  
$jsondata = file_get_contents($filetxt);
$arr_data = json_decode($jsondata, true);
$arr_data[] = $formdata;
$jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
file_put_contents('js/list.json', $jsondata);
$form_state['redirect'] = false;
?>