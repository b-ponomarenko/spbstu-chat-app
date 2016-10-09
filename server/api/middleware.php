<?php

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