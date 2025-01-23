<?php
header('Access-Control-Allow-Origin: *'); // Allow requests from any domain
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$host = 'localhost';
$db_name = 'goqii_users';
$username = 'root'; // Adjust as needed for your environment
$password = '';

$conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
            getUser($id);
        } else {
            getUsers();
        }
        break;
    case 'POST':
        addUser();
        break;
    case 'PUT':
        $id = intval($_GET['id']);
        updateUser($id);
        break;
    case 'DELETE':
        $id = intval($_GET['id']);
        deleteUser($id);
        break;
    default:
        echo json_encode(['message' => 'Invalid Request Method']);
        break;
}

function getUsers() {
    global $conn;
    $stmt = $conn->prepare('SELECT * FROM users');
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function getUser($id) {
    global $conn;
    $stmt = $conn->prepare('SELECT * FROM users WHERE id = :id');
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function addUser() {
    global $conn;
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare('INSERT INTO users (name, email, password, dob) VALUES (:name, :email, :password, :dob)');
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':password', password_hash($data['password'], PASSWORD_BCRYPT));
    $stmt->bindParam(':dob', $data['dob']);
    $stmt->execute();
    echo json_encode(['message' => 'User Added Successfully']);
}

function updateUser($id) {
    global $conn;
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare('UPDATE users SET name = :name, email = :email, password = :password, dob = :dob WHERE id = :id');
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':password', password_hash($data['password'], PASSWORD_BCRYPT));
    $stmt->bindParam(':dob', $data['dob']);
    $stmt->execute();
    echo json_encode(['message' => 'User Updated Successfully']);
}

function deleteUser($id) {
    global $conn;
    $stmt = $conn->prepare('DELETE FROM users WHERE id = :id');
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    echo json_encode(['message' => 'User Deleted Successfully']);
}
?>
