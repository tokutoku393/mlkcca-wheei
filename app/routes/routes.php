<?php

$app->get('/', function () use ($app) {
  $app->render('main-pc.html');
});

$app->get('/controller', function () use ($app) {
  $app->render('main-sp.html');
});

$app->get('/test', function () use ($app) {
  $app->render('index.html');
});
