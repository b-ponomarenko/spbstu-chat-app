<?php

namespace Shared;

class Config {
//  const DB_CONNECTION_STRING = 'mysql:dbname=cm34648_chat;host=localhost';
//  const DB_USER = 'cm34648_chat';
//  const DB_PASSWORD = 'chat';
  const DB_CONNECTION_STRING = 'mysql:dbname=spbstu-chat;host=localhost:8889';
  const DB_USER = 'root';
  const DB_PASSWORD = 'root';
  const JWT_SECRET_KEY = 'spbstu-chat-app';
  const ENCODE_ALGORITHM = 'HS256';

  const ADMIN_ROLE = 1;
  const USER_ROLE = 2;

  const IMAGE_PLACEHOLDER = 'http://placehold.it/200X200';
}