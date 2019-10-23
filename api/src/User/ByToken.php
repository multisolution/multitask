<?php declare(strict_types=1);

namespace Multitask\User;

use Firebase\JWT\JWT;
use Multitask\Context;
use Multitask\User;

class ByToken
{
    /** @var Context */
    private $context;

    public function __construct(Context $context)
    {
        $this->context = $context;
    }

    public function __invoke(string $token): ?User
    {
        $token = JWT::decode($token, $this->context->appKey, ['HS256']);
        return $this->context->db->getUserById($token->userId);
    }
}