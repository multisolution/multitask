<?php declare(strict_types=1);

namespace Multitask\User;

use Firebase\JWT\JWT;
use GraphQL\Error\UserError;
use Multitask\Context;

class SignIn
{
    public function __invoke($root, array $args, Context $context)
    {
        /** @var string|false $username */
        $username = filter_var($args['username'], FILTER_SANITIZE_STRING);
        /** @var string|false $password */
        $password = filter_var($args['password'], FILTER_SANITIZE_STRING);

        if ($username === false || empty($username)) {
            throw new UserError('Empty username');
        }

        if ($password === false || empty($password)) {
            throw new UserError('Empty password');
        }

        $user = $context->db->findUserByEmail($username);

        if ($user === null) {
            throw new UserError('User not found');
        }

        if (!password_verify($password, $user->password)) {
            throw new UserError('User not found');
        }

        $token = JWT::encode(['userId' => $user->id], $context->appKey);

        return ['token' => $token];
    }
}