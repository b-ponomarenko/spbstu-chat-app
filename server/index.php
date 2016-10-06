<?php

require 'vendor/autoload.php';
require 'api/auth/auth.php';
require 'api/dialog/dialog.php';
require 'config.php';

$config = json_decode(file_get_contents('config.json'));

$app = new \Slim\App;

$container = $app->getContainer();

$app->add(new \Slim\Middleware\JwtAuthentication([
  "secret" => JWT_SECRET_KEY,
  "path" => '/api',
  "header" => "Authorization",
  "error" => function ($request, $response) {
    return $response -> withJson([
      'title' => 'Authentication error',
      'message' => 'You are not authorized '
    ], 401);
  }
]));


$app->post('/auth/sign-up', '\AuthController:signUp');

$app->post('/auth/login', '\AuthController:login');


$app->get('/api/dialogs/{id}', '\DialogController:dialog');
$app->get('/api/dialogs', '\DialogController:dialogs');

$app->run();