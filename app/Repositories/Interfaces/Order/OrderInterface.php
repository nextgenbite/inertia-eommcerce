<?php

namespace App\Repositories\Interfaces\Order;


use App\Models\Order;

interface OrderInterface
{
/**
     * Retrieve a expense by its ID.
     */
    public function get(int $id): ?Order;

    /**
     * Store a new expense.
     */
    public function store($request): Order;

    /**
     * Update an existing expense.
     */
    public function update(Order $expense, $request): bool;

    /**
     * Delete a expense.
     */
    public function delete(Order $expense): bool;



}
