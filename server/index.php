<?php

require 'vendor/autoload.php';
require 'api/auth/auth.php';

$app = new \Slim\App;

$app->post('/api/sign-up', '\AuthController:signUp');

$app->post('/api/login', '\AuthController:login');

$app->run();