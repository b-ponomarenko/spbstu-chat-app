<?php

require 'vendor/autoload.php';
require 'api/auth/auth.php';
require 'api/dialog/dialog.php';

$app = new \Slim\App;

$app->post('/auth/sign-up', '\AuthController:signUp');

$app->post('/auth/login', '\AuthController:login');


$app->get('/dialogs/{id}', '\DialogController:dialog');
$app->get('/dialogs', '\DialogController:dialogs');

$app->run();