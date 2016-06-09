<?php

date_default_timezone_set("Asia/Tokyo");

require __DIR__ . '/../vendor/autoload.php';

$env = new Dotenv\Dotenv(__DIR__ . '/../');
$env->load();

$app = new \Slim\Slim(array(
  'debug' => true,
  'view' => new \Slim\Views\Smarty(),
  'log.writer' => new \Slim\Logger\DateTimeFileWriter(array('path' => getenv('BASE_DIR').'/storage/logs')),
));

//$app->response->headers->set('X-FRAME-OPTIONS', 'DENY');
$view = $app->view();
$log = $app->log;
$view->setTemplatesDirectory(getenv('BASE_DIR') . '/app/templates');
$view->parserCompileDirectory = getenv('BASE_DIR') . '/storage/compiled';
$view->parserCacheDirectory = getenv('BASE_DIR') . '/storage/cache';
$view->parserExtensions = array(getenv('BASE_DIR') . '/vendor/slim/views/SmartyPlugins');
$smarty = $view->getInstance();
$smarty->assign('smarty', $smarty);
$smarty->default_modifiers = array('escape:"html"');
$smarty->left_delimiter = '{{';
$smarty->right_delimiter = '}}';

require_once getenv('BASE_DIR') . '/app/routes/routes.php';

session_start();

$app->run();
