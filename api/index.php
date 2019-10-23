<?php declare(strict_types=1);

namespace Multitask;

use Siler\Dotenv as Env;
use Throwable;
use function Siler\Encoder\Json\decode;
use function Siler\Functional\Monad\maybe;
use function Siler\GraphQL\{execute, schema};
use function Siler\Swoole\{cors, http, json, raw, request};

$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";


$type_defs = file_get_contents("$base_dir/schema.graphql");

$resolvers = [
    'Query' => [
        'me' => function ($root, $args, $context) {
            return $context['user'];
        },
    ],
    'Mutation' => [
        'signIn' => function ($root, $args) {
            return [
                'token' => $args['username'] . $args['password'],
            ];
        },
        'signOut' => function () {
            return true;
        },
        'createTask' => new Task\Create(),
        
    ]
];



$schema = schema($type_defs, $resolvers);

$handler = function () use ($schema, $type_defs) {
    try {
        $header = maybe(request()->header['authorization'] ?? null);
        $token = $header(function (string $token): ?string {
            $token = substr($token, 7);
            return $token === false ? null : $token;
        });
        $user = $token(function (string $token): ?User {
            return (new User\ByToken())($token);
        });
        $context = ['user' => $user()];
        $result = execute($schema, decode(raw()), [], $context);
    } catch (Throwable $exception) {
        // TODO: Handle error
        $err_message = Env\bool_val('APP_DEBUG', true) ? $exception->getMessage() : 'Internal error';
        $result = ['error' => true, 'message' => $err_message];
        var_dump($exception);
    } finally {
        cors('*', 'content-type,authorization');
        json($result);
    }
};

http($handler, 8000)->start();

