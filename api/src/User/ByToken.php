<?php declare(strict_types=1);

namespace Multitask\User;

use Firebase\JWT\JWT;
use Multitask\Context;
use Multitask\User;

class ByToken
{
    public function __invoke(Context $context, string $token): ?User
    {
        $token = JWT::decode($token, $context->appKey, ['HS256']);
        return $context->db->getUserById($token->userId);
    }
}