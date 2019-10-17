<?php declare(strict_types=1);

namespace Multitask;

use function Siler\Swoole\{emit, http};

$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";

$handler = function () {
    emit('multiTASK');
};

http($handler, 8000)->start();