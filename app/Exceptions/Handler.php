<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);
        $status = $response->status();

        if (!app()->environment(['local', 'testing'])) {
            return Inertia::render('Error', [
                'code' => $status,
                'message' => match ($status) {
                    404 => 'Page not found.',
                    500, 503 => 'Server error. Please try again later.',
                    403 => 'You do not have permission to access this page.',
                    401 => 'Unauthorized. Please log in to continue.',
                    419 => 'The page expired. Please try again.',
                    default => 'An unexpected error occurred.',
                },
            ])->toResponse($request)->setStatusCode($status);
        }

        return $response;
    }
}
