<?php declare(strict_types=1);

namespace Multitask\User;

use Multitask\Context;

class SignOut
{
    public function __invoke($root, array $args, Context $context)
    {
        return $context->db->deleteToken($context->user->id);
    }
}