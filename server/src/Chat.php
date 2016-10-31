<?php
namespace SPBSTU;

use Firebase\JWT\JWT;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class Chat implements MessageComponentInterface
{
  protected $clients;

  public function __construct()
  {
    $this->clients = new \SplObjectStorage;
  }

  public function onOpen(ConnectionInterface $conn)
  {
    // Store the new connection to send messages to later
    $this->clients->attach($conn);

    echo "New connection! ({$conn->resourceId})\n";
  }

  public function onMessage(ConnectionInterface $from, $msg)
  {
    $data = json_decode($msg);
    $decodedToken = JWT::decode($data->token, JWT_SECRET_KEY, [ENCODE_ALGORITHM]);
    print_r($decodedToken);

    foreach ($this->clients as $client) {
      // The sender is not the receiver, send to each client connected
      $client->send($msg);
    }
  }

  public function onClose(ConnectionInterface $conn)
  {
    // The connection is closed, remove it, as we can no longer send it messages
    $this->clients->detach($conn);

    echo "Connection {$conn->resourceId} has disconnected\n";
  }

  public function onError(ConnectionInterface $conn, \Exception $e)
  {
    echo "An error has occurred: {$e->getMessage()}\n";

    $conn->close();
  }
}