<?php

require 'vendor/autoload.php';
require 'api/auth/auth.php';
require 'api/dialog/dialog.php';
require 'config.php';

$config = json_decode(file_get_contents('config.json'));

$app = new \Slim\App;

$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

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