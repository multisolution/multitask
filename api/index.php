<?php declare(strict_types=1);

namespace Multitask;

use Throwable;
use function Siler\Encoder\Json\decode;
use function Siler\GraphQL\{execute, schema};
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
    try {
        $result = execute($schema, decode(raw()));
    } catch (Throwable $exception) {
        $result = ['error' => true, 'message' => 'internal error'];
    } finally {
        cors('*', 'content-type,authorization');
        json($result);
    }
};

http($handler, 8000)->start();
