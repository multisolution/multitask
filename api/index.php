<?php declare(strict_types=1);

namespace Multitask;

use Throwable;
use function Siler\Encoder\Json\decode;
use function Siler\GraphQL\execute;
use function Siler\GraphQL\schema;
use function Siler\Http\Request\method_is;
use function Siler\Swoole\{cors, http, json, raw};

$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";

$type_defs = file_get_contents("$base_dir/schema.graphql");

$resolvers = [
    'Query' => [
        'me' => [
            'id' => 8
        ],
    ],
];

$schema = schema($type_defs, $resolvers);

$handler = function () use ($schema, $type_defs) {
    cors('*', 'content-type,authorization');

    if (method_is('options')) {
        return;
    }

    try {
        json(execute($schema, decode(raw())));
    } catch (Throwable $exception) {
        json(['error' => true, 'message' => 'internal error'], 500);
    }
};

http($handler, 8000)->start();
