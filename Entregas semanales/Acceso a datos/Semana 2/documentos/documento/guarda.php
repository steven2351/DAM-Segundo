<?php
    $myfile = fopen("../vault/users/steven/".$_POST['nombredocumento'].".html", "w") or die("Unable to open file!");
    $txt = $_POST['datos'];
    fwrite($myfile, $txt);
    fclose($myfile);
?>