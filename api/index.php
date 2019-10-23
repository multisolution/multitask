<?php declare(strict_types=1);

namespace Multitask;

use GraphQL\Error\Debug;
use Siler\Dotenv as Env;
use Throwable;
use function Siler\Encoder\Json\decode;
use function Siler\Functional\Monad\maybe;
use function Siler\GraphQL\{debug, execute, schema};
use function Siler\Swoole\{bearer, cors, http, json, raw};

$base_dir = __DIR__;
require_once "$base_dir/vendor/autoload.php";

Env\init($base_dir);

debug(Env\bool_val('APP_DEBUG') ? Debug::INCLUDE_TRACE | Debug::INCLUDE_DEBUG_MESSAGE : 0);

$context = new Context();
$context->db = new InMemoryDatabase();
$context->appKey = Env\env('APP_KEY');

$type_defs = file_get_contents("$base_dir/schema.graphql");

$resolvers = [
    'Query' => [
        'me' => new User\Me(),
    ],
    'Mutation' => [
        'signIn' => new User\SignIn(),
        'signOut' => new User\SignOut(),
        'createTask' => new Task\Create(),
    ]
];

$schema = schema($type_defs, $resolvers);

$root = new User();
$root->email = 'multi';
$root->password = password_hash('task', PASSWORD_DEFAULT);
$context->db->saveUser($root);

$handler = function () use ($schema, $context) {
    try {
        $context->user = maybe(bearer())
            ->bind(new User\ByToken($context))
            ->return();

        $result = execute($schema, decode(raw()), [], $context);
    } catch (Throwable $exception) {
        // TODO: Handle error
        $err_message = Env\bool_val('APP_DEBUG', false) ? $exception->getMessage() : 'Internal error';
        $result = ['error' => true, 'message' => $err_message];
        var_dump($exception);
    } finally {
        cors('*', 'content-type,authorization');
        json($result);
    }
};

http($handler, 8000)->start();

