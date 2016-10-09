<?php

require 'vendor/autoload.php';
require 'api/auth/auth.php';
require 'api/dialog/dialog.php';
require 'config.php';

$app = new \Slim\App;

require __DIR__ . '/api/middleware.php';

$app->post('/auth/sign-up', '\AuthController:signUp');
$app->post('/auth/login', '\AuthController:login');

$app->get('/api/dialogs/{id}', '\DialogController:dialog');
$app->get('/api/dialogs', '\DialogController:dialogs');


$app->run();

require __DIR__ . '/ws/server.php';
