<?php

$app->get('/', function () use ($app) {
  $app->render('main-pc.html');
});

$app->get('/congrat', function () use ($app) {
  $app->render('main-sp.html');
});
