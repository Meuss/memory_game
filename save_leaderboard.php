<?php

    if (isset($_POST['nickname']) && isset($_POST['finaltime']) && isset($_POST['finaltimeformatted'])) {
        $params = array('nickname' => $_POST['nickname'], 'finaltime' => $_POST['finaltime'], 'finaltimeformatted' => $_POST['finaltimeformatted']);

        $jsonObject = json_encode($params);
        $json = file_get_contents('leaderboard.json');
        if(empty($json)){
            $jsonObject = json_encode(array('username' => [$jsonObject]));
            file_put_contents('leaderboard.json', $jsonObject);
        }else{
            $json = json_decode($json, true);
            $newJson = $json['nickname'][0] . "," . $jsonObject;
            $jsonObject = json_encode(array('nickname' => [$newJson]));
            file_put_contents('leaderboard.json', $jsonObject);
        }
    }
    else {
        echo "Noooooooob";
    }

?>